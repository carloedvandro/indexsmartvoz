
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
  const [isCapturing, setIsCapturing] = useState(false);
  const [consecutiveValidFrames, setConsecutiveValidFrames] = useState(0);
  const { toast } = useToast();

  // Configurações de segurança para a captura
  const REQUIRED_CONSECUTIVE_FRAMES = 30; // Mínimo de frames consecutivos válidos
  const PROGRESS_INCREMENT = 100 / REQUIRED_CONSECUTIVE_FRAMES; // Incremento por frame válido
  const VALIDATION_INTERVAL = 100; // Intervalo de validação em ms

  // Reset completo quando face não está detectada ou não está na posição ideal
  useEffect(() => {
    if (!faceDetected || faceProximity !== "ideal") {
      if (isCapturing) {
        console.log("Face saiu da posição ideal, resetando captura...");
        setIsCapturing(false);
        setCaptureProgress(0);
        setConsecutiveValidFrames(0);
        
        // Mostrar feedback ao usuário
        if (faceDetected && faceProximity !== "ideal") {
          toast({
            title: "Posição incorreta",
            description: "Mantenha o rosto na posição ideal durante toda a captura",
            variant: "destructive",
          });
        }
      }
    }
  }, [faceDetected, faceProximity, isCapturing, toast]);

  // Lógica de validação contínua durante a captura
  useEffect(() => {
    let validationInterval: NodeJS.Timeout | null = null;
    
    if (faceDetected && faceProximity === "ideal" && !isProcessing && cameraActive) {
      if (!isCapturing) {
        console.log("Iniciando processo de captura...");
        setIsCapturing(true);
        setConsecutiveValidFrames(0);
        setCaptureProgress(0);
      }
      
      // Validação contínua durante a captura
      if (isCapturing) {
        validationInterval = setInterval(() => {
          // Verificar novamente se as condições ainda são válidas
          if (faceDetected && faceProximity === "ideal") {
            setConsecutiveValidFrames(prev => {
              const newCount = prev + 1;
              const newProgress = Math.min(newCount * PROGRESS_INCREMENT, 100);
              setCaptureProgress(newProgress);
              
              console.log(`Frame válido ${newCount}/${REQUIRED_CONSECUTIVE_FRAMES} - Progresso: ${newProgress.toFixed(1)}%`);
              
              return newCount;
            });
          } else {
            // Se a face não está mais válida, parar o intervalo
            console.log("Face não válida durante captura, parando...");
            clearInterval(validationInterval!);
          }
        }, VALIDATION_INTERVAL);
      }
    }
    
    return () => {
      if (validationInterval) {
        clearInterval(validationInterval);
      }
    };
  }, [faceDetected, faceProximity, isProcessing, cameraActive, isCapturing]);

  // Trigger de captura quando atingir o número necessário de frames válidos
  useEffect(() => {
    if (consecutiveValidFrames >= REQUIRED_CONSECUTIVE_FRAMES && !isProcessing && isCapturing) {
      console.log("Captura validada com sucesso! Processando...");
      handleSecureCapture();
    }
  }, [consecutiveValidFrames, isProcessing, isCapturing]);

  async function handleSecureCapture() {
    if (isProcessing || !webcamRef.current) return;
    
    console.log("Iniciando captura segura...");
    
    // Validação final antes da captura
    if (!faceDetected || faceProximity !== "ideal") {
      console.log("Validação final falhou, cancelando captura");
      setIsCapturing(false);
      setCaptureProgress(0);
      setConsecutiveValidFrames(0);
      toast({
        title: "Captura cancelada",
        description: "Mantenha o rosto na posição ideal durante toda a captura",
        variant: "destructive",
      });
      return;
    }
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      console.error("Não foi possível capturar a imagem");
      setIsCapturing(false);
      setCaptureProgress(0);
      setConsecutiveValidFrames(0);
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
        setIsCapturing(false);
        setCaptureProgress(0);
        setConsecutiveValidFrames(0);
        return;
      }
      
      console.log("Capturando imagem facial validada para usuário:", sessionData.session.user.id);
      
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
      
      console.log("Imagem facial validada enviada com sucesso");
      
      toast({
        title: "Captura Concluída",
        description: "Seu rosto foi capturado e validado com sucesso!",
      });
      
      // Reset dos estados
      setIsCapturing(false);
      setCaptureProgress(0);
      setConsecutiveValidFrames(0);
      
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
      setIsCapturing(false);
      setCaptureProgress(0);
      setConsecutiveValidFrames(0);
    } finally {
      setIsProcessing(false);
    }
  }

  const toggleCamera = useCallback(() => {
    setCameraActive(prev => !prev);
    setIsCapturing(false);
    setCaptureProgress(0);
    setConsecutiveValidFrames(0);
  }, []);

  return {
    isProcessing,
    cameraActive,
    captureProgress,
    isCapturing,
    toggleCamera
  };
};
