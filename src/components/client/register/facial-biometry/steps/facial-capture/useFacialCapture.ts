
import { useState, RefObject } from "react";
import Webcam from "react-webcam";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UseFacialCaptureProps {
  webcamRef: RefObject<Webcam>;
  faceDetected: boolean;
  onComplete: (imageSrc: string) => void;
}

export const useFacialCapture = ({ 
  webcamRef, 
  faceDetected, 
  onComplete 
}: UseFacialCaptureProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);
  const { toast } = useToast();

  const handleFacialCapture = async () => {
    if (!faceDetected) {
      toast({
        title: "Rosto não detectado",
        description: "Por favor, posicione seu rosto dentro do oval",
        variant: "destructive",
      });
      return;
    }

    if (webcamRef.current) {
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
        } finally {
          setIsProcessing(false);
        }
      }
    }
  };

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
  };

  return {
    isProcessing,
    cameraActive,
    handleFacialCapture,
    toggleCamera
  };
};
