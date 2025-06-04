
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
  const [stableDetectionTime, setStableDetectionTime] = useState(0);
  const { toast } = useToast();

  // Reset progress quando face não está detectada ou não está na posição ideal
  useEffect(() => {
    if (!faceDetected || faceProximity !== "ideal") {
      if (captureProgress > 0) {
        setCaptureProgress(prev => Math.max(0, prev - 2));
      }
      if (!faceDetected) {
        setStableDetectionTime(0);
      }
    }
  }, [faceDetected, faceProximity, captureProgress]);

  // Incremento automático do progresso quando face está detectada e na posição ideal
  useEffect(() => {
    let progressInterval: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    
    if (faceDetected && faceProximity === "ideal" && !isProcessing && cameraActive) {
      console.log("Starting capture progress - face detected and ideal"); // Debug
      
      // Incrementar contador de tempo de detecção estável
      timeoutId = setTimeout(() => {
        setStableDetectionTime(prev => prev + 1);
      }, 30);
      
      // Começar incremento de progresso quase imediatamente
      if (stableDetectionTime >= 0) {
        progressInterval = setInterval(() => {
          setCaptureProgress(prev => {
            const newProgress = prev + 4; // Incremento mais rápido
            console.log("Progress:", newProgress); // Debug
            return newProgress > 100 ? 100 : newProgress;
          });
        }, 30); // Intervalo menor para captura mais rápida
      }
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [faceDetected, faceProximity, isProcessing, cameraActive, stableDetectionTime]);

  // Trigger de captura quando progresso atinge 100
  useEffect(() => {
    if (captureProgress >= 100 && !isProcessing) {
      console.log("Progress reached 100%, triggering capture"); // Debug
      handleAutomaticCapture();
    }
  }, [captureProgress, isProcessing]);

  async function handleAutomaticCapture() {
    if (isProcessing || !webcamRef.current) return;
    
    console.log("Iniciando captura automática...");
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      console.error("Não foi possível capturar a imagem");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Verificar autenticação
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
      
      console.log("Capturando imagem facial para usuário:", sessionData.session.user.id);
      
      // Salvar imagem no Supabase Storage
      const userId = sessionData.session.user.id;
      const blob = await fetch(imageSrc).then(res => res.blob());
      const file = new File([blob], `facial-${Date.now()}.jpg`, { type: 'image/jpeg' });
      const filePath = `${userId}/facial/${Date.now()}.jpg`;
      
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);
        
      if (uploadError) {
        console.error('Erro ao fazer upload da imagem facial:', uploadError);
        throw uploadError;
      }
      
      console.log("Imagem facial enviada com sucesso");
      
      toast({
        title: "Captura Concluída",
        description: "Seu rosto foi capturado com sucesso!",
      });
      
      // Pequeno delay para melhor UX
      await new Promise(resolve => setTimeout(resolve, 500));
      onComplete(imageSrc);
    } catch (error) {
      console.error('Erro durante captura facial:', error);
      toast({
        title: "Erro na Captura",
        description: "Ocorreu um erro ao processar a imagem. Por favor, tente novamente.",
        variant: "destructive",
      });
      setCaptureProgress(0);
      setStableDetectionTime(0);
    } finally {
      setIsProcessing(false);
    }
  }

  const toggleCamera = useCallback(() => {
    setCameraActive(prev => !prev);
    setCaptureProgress(0);
    setStableDetectionTime(0);
  }, []);

  return {
    isProcessing,
    cameraActive,
    captureProgress,
    toggleCamera
  };
};
