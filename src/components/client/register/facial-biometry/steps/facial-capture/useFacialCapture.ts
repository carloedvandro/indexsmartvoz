
import { useState, RefObject, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { useToast } from "@/hooks/use-toast";
import { useCaptureValidation } from "./hooks/useCaptureValidation";
import { useCaptureProgress } from "./hooks/useCaptureProgress";
import { useFaceStability } from "./hooks/useFaceStability";
import { uploadFacialImage } from "./utils/imageUpload";
import { CAPTURE_CONFIG } from "./config/captureConfig";

interface UseFacialCaptureProps {
  webcamRef: RefObject<Webcam>;
  faceDetected: boolean;
  faceProximity: "ideal" | "too-close" | "too-far" | "not-detected";
  facePosition: { x: number; y: number; size: number };
  onComplete: (imageSrc: string) => void;
}

export const useFacialCapture = ({ 
  webcamRef, 
  faceDetected,
  faceProximity,
  facePosition,
  onComplete 
}: UseFacialCaptureProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);
  const [lastValidationTime, setLastValidationTime] = useState(0);
  const { toast } = useToast();

  const {
    captureProgress,
    isCapturing,
    consecutiveValidFrames,
    captureStartTime,
    isComplete,
    startCapture,
    resetProgress,
    incrementProgress
  } = useCaptureProgress();

  const {
    validateCaptureConditions,
    shouldStartCapture,
    validateForCapture
  } = useCaptureValidation({
    faceDetected,
    faceProximity,
    isCapturing,
    captureStartTime,
    facePosition
  });

  const {
    isStable,
    checkStability,
    resetStability
  } = useFaceStability({
    facePosition,
    faceDetected,
    faceProximity
  });

  // VALIDAÇÃO CRÍTICA CONTÍNUA - Para imediatamente se condições forem perdidas
  useEffect(() => {
    if (!isCapturing) return;

    const now = Date.now();
    // Throttle validações para evitar spam
    if (now - lastValidationTime < 50) return;
    setLastValidationTime(now);

    // VERIFICAÇÃO RIGOROSA TRIPLA
    const validation = validateCaptureConditions();
    
    if (!validation.isValid) {
      console.log("🚨 CONDIÇÕES PERDIDAS - RESETANDO CAPTURA IMEDIATAMENTE");
      console.log("Detalhes:", { 
        faceDetected, 
        faceProximity, 
        facePosition,
        reason: validation.reason 
      });
      
      resetProgress();
      resetStability();
    }
  }, [faceDetected, faceProximity, facePosition, isCapturing, validateCaptureConditions, resetProgress, resetStability, lastValidationTime]);

  // Iniciar captura apenas quando condições ideais E estáveis
  useEffect(() => {
    // Se já está processando, capturando ou câmera inativa, não iniciar
    if (isProcessing || isCapturing || !cameraActive) return;

    // Verificar estabilidade primeiro
    const stableNow = checkStability();

    // Condições RIGOROSAS para iniciar: detectado + ideal + estável
    if (shouldStartCapture() && stableNow) {
      console.log("🟢 INICIANDO CAPTURA - Todas as condições atendidas e estáveis");
      startCapture();
      
      toast({
        title: "Captura Iniciada",
        description: "Mantenha o rosto na posição até 100%",
        duration: 2000,
      });
    }
  }, [faceDetected, faceProximity, facePosition, isProcessing, cameraActive, isCapturing, shouldStartCapture, checkStability, startCapture, toast]);

  // Sistema de validação contínua durante captura - MAIS RIGOROSO E LENTO
  useEffect(() => {
    if (!isCapturing) return;

    const validationInterval = setInterval(() => {
      // VALIDAÇÃO QUÁDRUPLA OBRIGATÓRIA: detectado + ideal + capturando + estável
      const isValidFrame = validateForCapture() && isCapturing && checkStability();
      
      if (isValidFrame) {
        console.log(`✅ Frame válido e estável ${consecutiveValidFrames + 1}/${CAPTURE_CONFIG.REQUIRED_CONSECUTIVE_FRAMES} - Progresso: ${((consecutiveValidFrames + 1) * CAPTURE_CONFIG.PROGRESS_INCREMENT).toFixed(1)}%`);
        incrementProgress();
      } else {
        // RESET IMEDIATO e FORÇADO se perdeu condições
        console.log("❌ FRAME INVÁLIDO OU INSTÁVEL - Parando captura IMEDIATAMENTE");
        console.log("Detalhes de falha:", { 
          faceDetected, 
          faceProximity, 
          facePosition,
          isStable,
          isCapturing,
          timestamp: Date.now()
        });
        
        // Parar interval e resetar
        clearInterval(validationInterval);
        resetProgress();
        resetStability();
      }
    }, CAPTURE_CONFIG.VALIDATION_INTERVAL);

    return () => clearInterval(validationInterval);
  }, [isCapturing, faceDetected, faceProximity, facePosition, isStable, validateForCapture, checkStability, incrementProgress, resetProgress, resetStability, consecutiveValidFrames]);

  // Processar captura quando atingir 100% - COM VALIDAÇÃO FINAL TRIPLA
  useEffect(() => {
    if (isComplete && isCapturing && !isProcessing) {
      console.log("🎯 CAPTURA 100% - Executando validação final rigorosa...");
      
      // VALIDAÇÃO FINAL CRÍTICA E TRIPLA antes de processar
      if (validateForCapture() && isStable) {
        console.log("✅ VALIDAÇÃO FINAL TRIPLA APROVADA! Processando imagem...");
        handleSecureCapture();
      } else {
        console.log("❌ VALIDAÇÃO FINAL FALHOU - Resetando captura");
        resetProgress();
        resetStability();
        toast({
          title: "Erro na Captura",
          description: "Validação final falhou - Mantenha o rosto estável",
          variant: "destructive",
        });
      }
    }
  }, [isComplete, isCapturing, isProcessing, validateForCapture, isStable]);

  async function handleSecureCapture() {
    if (isProcessing || !webcamRef.current) return;
    
    console.log("📸 Iniciando captura final segura e validada...");
    
    // VALIDAÇÃO FINAL QUÁDRUPLA antes de processar
    if (!validateForCapture() || !isStable || !isCapturing) {
      console.log("❌ VALIDAÇÃO PRÉ-CAPTURA FALHOU - Não processando");
      resetProgress();
      resetStability();
      toast({
        title: "Erro na Captura",
        description: "Condições perdidas no momento final",
        variant: "destructive",
      });
      return;
    }
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      console.error("❌ Erro ao capturar screenshot da webcam");
      resetProgress();
      resetStability();
      toast({
        title: "Erro na Captura",
        description: "Erro ao capturar imagem da câmera",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      console.log("💾 Enviando imagem validada para upload...");
      await uploadFacialImage(imageSrc);
      
      toast({
        title: "Captura Concluída",
        description: "Rosto capturado e validado com máxima segurança!",
      });
      
      // Reset completo
      resetProgress();
      resetStability();
      
      // Delay para melhor UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      onComplete(imageSrc);
    } catch (error) {
      console.error('❌ Erro durante upload da imagem:', error);
      toast({
        title: "Erro no Upload",
        description: "Erro ao salvar imagem - Tente novamente",
        variant: "destructive",
      });
      resetProgress();
      resetStability();
    } finally {
      setIsProcessing(false);
    }
  }

  const toggleCamera = useCallback(() => {
    setCameraActive(prev => !prev);
    resetProgress();
    resetStability();
    toast({
      title: "Câmera",
      description: cameraActive ? "Câmera desativada" : "Câmera ativada",
    });
  }, [resetProgress, resetStability, toast, cameraActive]);

  return {
    isProcessing,
    cameraActive,
    captureProgress,
    isCapturing,
    isStable,
    toggleCamera
  };
};
