
import { useState, RefObject, useEffect } from "react";
import Webcam from "react-webcam";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UseFacialCaptureProps {
  webcamRef: RefObject<Webcam>;
  faceDetected: boolean;
  faceProximity: "ideal" | "too-close" | "too-far" | "not-detected";
  onComplete: (imageSrc: string) => void;
}

export const useFacialCapture = ({ 
  webcamRef, 
  faceDetected,
  faceProximity,
  onComplete 
}: UseFacialCaptureProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);
  const [captureProgress, setCaptureProgress] = useState(0);
  const [idealPositionTime, setIdealPositionTime] = useState(0);
  const [captureTimer, setCaptureTimer] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Reset progress when face is lost or not ideal
  useEffect(() => {
    if (!faceDetected || faceProximity !== "ideal") {
      if (captureProgress > 0) {
        setCaptureProgress(prev => Math.max(0, prev - 2)); // Gradually decrease progress
      }
      setIdealPositionTime(0);
      if (captureTimer) {
        clearTimeout(captureTimer);
        setCaptureTimer(null);
      }
    }
  }, [faceDetected, faceProximity, captureTimer]);

  // Auto-increment progress when face is detected and in ideal position
  useEffect(() => {
    if (faceDetected && faceProximity === "ideal" && !isProcessing && cameraActive) {
      // Increment the ideal position time counter
      setIdealPositionTime(prev => prev + 1);
      
      // Only start incrementing progress after face has been in ideal position for a short time
      if (idealPositionTime > 5) {
        // Increment progress steadily
        const interval = setInterval(() => {
          setCaptureProgress(prev => {
            const newProgress = prev + 1.5; // Faster progress
            if (newProgress >= 100) {
              clearInterval(interval);
              handleAutomaticCapture();
              return 100;
            }
            return newProgress;
          });
        }, 30); // ~2 seconds to complete full circle (100 * 30ms / 1.5)
        
        return () => clearInterval(interval);
      }
    }
  }, [faceDetected, faceProximity, isProcessing, cameraActive, idealPositionTime]);

  const handleAutomaticCapture = async () => {
    if (isProcessing) return;
    
    if (webcamRef.current && faceProximity === "ideal") {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setIsProcessing(true);
        try {
          // Check if user is authenticated before proceeding
          const { data: sessionData } = await supabase.auth.getSession();
          if (!sessionData.session?.user) {
            toast({
              title: "Erro de Autenticação",
              description: "Usuário não está autenticado. Por favor, faça login novamente.",
              variant: "destructive",
            });
            return;
          }
          
          console.log("Capturing facial image for user:", sessionData.session.user.id);
          
          // Save the facial image to Supabase Storage
          const userId = sessionData.session.user.id;
          const blob = await fetch(imageSrc).then(res => res.blob());
          const file = new File([blob], `facial-${Date.now()}.jpg`, { type: 'image/jpeg' });
          const filePath = `${userId}/facial/${Date.now()}.jpg`;
          
          const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, file);
            
          if (uploadError) {
            console.error('Error uploading facial image:', uploadError);
            throw uploadError;
          }
          
          console.log("Facial image uploaded successfully");
          
          // Success notification
          toast({
            title: "Captura Concluída",
            description: "Seu rosto foi capturado com sucesso!",
          });
          
          // Add a small delay for better UX
          await new Promise(resolve => setTimeout(resolve, 1000));
          onComplete(imageSrc);
        } catch (error) {
          console.error('Error during facial capture:', error);
          toast({
            title: "Erro na Captura",
            description: "Ocorreu um erro ao processar a imagem. Por favor, tente novamente.",
            variant: "destructive",
          });
          setCaptureProgress(0);
        } finally {
          setIsProcessing(false);
        }
      }
    }
  };

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
    setCaptureProgress(0);
    setIdealPositionTime(0);
  };

  return {
    isProcessing,
    cameraActive,
    captureProgress,
    toggleCamera
  };
};
