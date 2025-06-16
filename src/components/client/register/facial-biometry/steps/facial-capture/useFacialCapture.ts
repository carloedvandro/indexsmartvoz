
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

  // Validação contínua durante captura
  useEffect(() => {
    if (!isCapturing) return;

    const validation = validateCaptureConditions();
    
    if (!validation.isValid && validation.shouldReset) {
      console.log("🚨 RESETANDO CAPTURA:", validation.reason);
      resetProgress();
      resetStability();
    }
  }, [isCapturing, validateCaptureConditions, resetProgress, resetStability]);

  // Iniciar captura APENAS quando rosto detectado na posição ideal
  useEffect(() => {
    if (isProcessing || isCapturing || !cameraActive) return;

    if (shouldStartCapture()) {
      console.log("🟢 INICIANDO CAPTURA - Rosto detectado na posição ideal");
      startCapture();
      
      toast({
        title: "Captura Iniciada",
        description: "Mantenha o rosto na posição - não se mova",
        duration: 2000,
      });
    }
  }, [faceDetected, faceProximity, isProcessing, cameraActive, isCapturing, shouldStartCapture, startCapture, toast]);

  // Sistema de captura rigoroso
  useEffect(() => {
    if (!isCapturing) return;

    console.log("🔄 Captura ativa, validando frames rigorosamente...");

    const validationInterval = setInterval(() => {
      checkStability();
      
      // Validação rigorosa: rosto detectado E na posição ideal E estável
      const isValidFrame = validateForCapture() && isStable;
      
      if (isValidFrame) {
        console.log(`✅ Frame válido ${consecutiveValidFrames + 1}/${CAPTURE_CONFIG.REQUIRED_CONSECUTIVE_FRAMES} - Estável: ${isStable}`);
        incrementProgress();
      } else {
        console.log("❌ Frame inválido - Rosto fora do oval ou instável");
        // Não resetar imediatamente, mas não incrementar progresso
      }
    }, CAPTURE_CONFIG.VALIDATION_INTERVAL);

    return () => {
      console.log("🛑 Limpando interval de validação");
      clearInterval(validationInterval);
    };
  }, [isCapturing, validateForCapture, isStable, checkStability, incrementProgress, consecutiveValidFrames]);

  // Processar captura quando atingir 100%
  useEffect(() => {
    if (isComplete && isCapturing && !isProcessing) {
      console.log("🎯 CAPTURA COMPLETA - Processando imagem do rosto...");
      handleSecureCapture();
    }
  }, [isComplete, isCapturing, isProcessing]);

  async function handleSecureCapture() {
    if (isProcessing || !webcamRef.current) {
      console.log("⚠️ Captura já em processamento ou webcam não disponível");
      return;
    }
    
    console.log("📸 Iniciando captura final do rosto...");
    
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
      console.log("💾 Enviando imagem do rosto para upload...");
      await uploadFacialImage(imageSrc);
      
      toast({
        title: "Captura Concluída",
        description: "Selfie do rosto capturada com sucesso!",
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
