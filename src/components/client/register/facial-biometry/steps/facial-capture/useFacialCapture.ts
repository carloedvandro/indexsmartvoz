
import { useState, RefObject, useEffect, useCallback } from "react";
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
  const { toast } = useToast();

  // Reset progress when face is lost or not ideal
  useEffect(() => {
    if (!faceDetected || faceProximity !== "ideal") {
      if (captureProgress > 0) {
        setCaptureProgress(prev => Math.max(0, prev - 2)); // Gradually decrease progress
      }
      setIdealPositionTime(0);
    }
  }, [faceDetected, faceProximity, captureProgress]);

  // Auto-increment progress when face is detected and in ideal position
  useEffect(() => {
    let progressInterval: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    
    if (faceDetected && faceProximity === "ideal" && !isProcessing && cameraActive) {
      // Start incrementing the ideal position time counter
      timeoutId = setTimeout(() => {
        setIdealPositionTime(prev => prev + 1);
      }, 100);
      
      // Only start incrementing progress after face has been in ideal position for a short time
      if (idealPositionTime > 2) { // Reduced from 3 to 2 for even faster response
        // Increment progress steadily
        progressInterval = setInterval(() => {
          setCaptureProgress(prev => {
            const newProgress = prev + 2.5; // Increased to 2.5 for faster completion
            // We'll let the separate effect handle the capture trigger
            return newProgress > 100 ? 100 : newProgress;
          });
        }, 30); // ~1.2 seconds to complete full circle (100 * 30ms / 2.5)
      }
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [faceDetected, faceProximity, isProcessing, cameraActive, idealPositionTime]);

  // Separate effect to trigger capture when progress reaches 100
  useEffect(() => {
    if (captureProgress >= 100 && !isProcessing) {
      handleAutomaticCapture();
    }
  }, [captureProgress, isProcessing]);

  // Define handleAutomaticCapture outside useCallback to avoid hook ordering issues
  async function handleAutomaticCapture() {
    if (isProcessing || !webcamRef.current || faceProximity !== "ideal") return;
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    
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
        setIsProcessing(false);
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

  const toggleCamera = useCallback(() => {
    setCameraActive(prev => !prev);
    setCaptureProgress(0);
    setIdealPositionTime(0);
  }, []);

  return {
    isProcessing,
    cameraActive,
    captureProgress,
    toggleCamera
  };
};
