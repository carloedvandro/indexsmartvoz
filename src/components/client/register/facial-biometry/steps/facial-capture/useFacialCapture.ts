
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
  const [captureStartTime, setCaptureStartTime] = useState<number | null>(null);
  const { toast } = useToast();

  // Configurações de segurança MAIS RIGOROSAS para a captura
  const REQUIRED_CONSECUTIVE_FRAMES = 50; // Aumentado para 50 frames (5 segundos)
  const PROGRESS_INCREMENT = 100 / REQUIRED_CONSECUTIVE_FRAMES;
  const VALIDATION_INTERVAL = 100; // Validação a cada 100ms
  const MAX_CAPTURE_TIME = 15000; // Timeout máximo de 15 segundos

  // RESET IMEDIATO quando condições não são atendidas
  const resetCapture = useCallback((reason?: string) => {
    console.log("🔴 RESETANDO CAPTURA:", reason || "Condições não atendidas");
    setIsCapturing(false);
    setCaptureProgress(0);
    setConsecutiveValidFrames(0);
    setCaptureStartTime(null);
    
    if (reason) {
      toast({
        title: "Captura Resetada",
        description: reason,
        variant: "destructive",
      });
    }
  }, [toast]);

  // Monitoramento RIGOROSO das condições do rosto
  useEffect(() => {
    // Se não está capturando, não faz nada
    if (!isCapturing) return;

    // VALIDAÇÃO IMEDIATA: Se perdeu o rosto ou saiu da posição ideal, PARA TUDO
    if (!faceDetected || faceProximity !== "ideal") {
      const reason = !faceDetected 
        ? "Rosto não detectado durante a captura" 
        : "Rosto fora da posição ideal";
      resetCapture(reason);
      return;
    }

    // Verificar timeout da captura
    if (captureStartTime && Date.now() - captureStartTime > MAX_CAPTURE_TIME) {
      resetCapture("Tempo limite da captura excedido");
      return;
    }

  }, [faceDetected, faceProximity, isCapturing, resetCapture, captureStartTime]);

  // Lógica de início da captura
  useEffect(() => {
    // Se já está processando ou capturando, não inicia nova captura
    if (isProcessing || isCapturing) return;
    
    // Se não tem câmera ativa, não inicia captura
    if (!cameraActive) return;

    // CONDIÇÕES RIGOROSAS para iniciar captura
    if (faceDetected && faceProximity === "ideal") {
      console.log("🟢 INICIANDO CAPTURA - Condições atendidas");
      setIsCapturing(true);
      setCaptureProgress(0);
      setConsecutiveValidFrames(0);
      setCaptureStartTime(Date.now());
      
      toast({
        title: "Captura Iniciada",
        description: "Mantenha o rosto na posição até 100%",
        duration: 2000,
      });
    }
  }, [faceDetected, faceProximity, isProcessing, cameraActive, isCapturing, toast]);

  // Sistema de validação contínua durante a captura
  useEffect(() => {
    if (!isCapturing) return;

    const validationInterval = setInterval(() => {
      // VERIFICAÇÃO DUPLA: Rosto detectado E na posição ideal
      if (faceDetected && faceProximity === "ideal") {
        setConsecutiveValidFrames(prev => {
          const newCount = prev + 1;
          const newProgress = Math.min(newCount * PROGRESS_INCREMENT, 100);
          setCaptureProgress(newProgress);
          
          console.log(`✅ Frame válido ${newCount}/${REQUIRED_CONSECUTIVE_FRAMES} - Progresso: ${newProgress.toFixed(1)}%`);
          
          return newCount;
        });
      } else {
        // Se perdeu as condições durante a captura, resetar IMEDIATAMENTE
        console.log("❌ Condições perdidas durante captura - resetando...");
        clearInterval(validationInterval);
        resetCapture("Rosto saiu da posição durante a captura");
      }
    }, VALIDATION_INTERVAL);

    return () => clearInterval(validationInterval);
  }, [isCapturing, faceDetected, faceProximity, resetCapture]);

  // Trigger para captura final quando atinge 100%
  useEffect(() => {
    if (consecutiveValidFrames >= REQUIRED_CONSECUTIVE_FRAMES && isCapturing && !isProcessing) {
      console.log("🎉 CAPTURA VALIDADA COMPLETAMENTE! Processando...");
      handleSecureCapture();
    }
  }, [consecutiveValidFrames, isCapturing, isProcessing]);

  async function handleSecureCapture() {
    if (isProcessing || !webcamRef.current) return;
    
    console.log("📸 Iniciando captura segura...");
    
    // VALIDAÇÃO FINAL TRIPLA antes da captura
    if (!faceDetected || faceProximity !== "ideal" || !isCapturing) {
      console.log("❌ Validação final falhou");
      resetCapture("Validação final falhou");
      return;
    }
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      console.error("❌ Não foi possível capturar a imagem");
      resetCapture("Erro ao capturar imagem");
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
        resetCapture();
        return;
      }
      
      console.log("💾 Salvando imagem facial validada para usuário:", sessionData.session.user.id);
      
      // Salvar imagem no Supabase Storage
      const userId = sessionData.session.user.id;
      const blob = await fetch(imageSrc).then(res => res.blob());
      const file = new File([blob], `facial-${Date.now()}.jpg`, { type: 'image/jpeg' });
      const filePath = `${userId}/facial/${Date.now()}.jpg`;
      
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);
        
      if (uploadError) {
        console.error('❌ Erro ao fazer upload da imagem facial:', uploadError);
        throw uploadError;
      }
      
      console.log("✅ Imagem facial validada enviada com sucesso");
      
      toast({
        title: "Captura Concluída com Sucesso",
        description: "Seu rosto foi capturado e validado!",
      });
      
      // Reset completo dos estados
      setIsCapturing(false);
      setCaptureProgress(0);
      setConsecutiveValidFrames(0);
      setCaptureStartTime(null);
      
      // Pequeno delay para melhor UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete(imageSrc);
    } catch (error) {
      console.error('❌ Erro durante captura facial:', error);
      toast({
        title: "Erro na Captura",
        description: "Ocorreu um erro ao processar a imagem. Tente novamente.",
        variant: "destructive",
      });
      resetCapture();
    } finally {
      setIsProcessing(false);
    }
  }

  const toggleCamera = useCallback(() => {
    setCameraActive(prev => !prev);
    resetCapture("Câmera desativada");
  }, [resetCapture]);

  return {
    isProcessing,
    cameraActive,
    captureProgress,
    isCapturing,
    toggleCamera
  };
};
