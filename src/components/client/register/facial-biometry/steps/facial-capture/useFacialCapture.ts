
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
  const [validationFailCount, setValidationFailCount] = useState(0);
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

  // Validação menos rigorosa - apenas para falhas consecutivas críticas
  useEffect(() => {
    if (!isCapturing) return;

    const validation = validateCaptureConditions();
    
    if (!validation.isValid) {
      setValidationFailCount(prev => prev + 1);
      
      // Apenas resetar após múltiplas falhas consecutivas
      if (validationFailCount >= 3) {
        console.log("🚨 MÚLTIPLAS FALHAS - RESETANDO CAPTURA");
        resetProgress();
        resetStability();
        setValidationFailCount(0);
      }
    } else {
      setValidationFailCount(0); // Reset contador de falhas
    }
  }, [faceDetected, faceProximity, isCapturing, validateCaptureConditions, resetProgress, resetStability, validationFailCount]);

  // Iniciar captura quando condições são atendidas
  useEffect(() => {
    if (isProcessing || isCapturing || !cameraActive) return;

    if (shouldStartCapture()) {
      console.log("🟢 INICIANDO CAPTURA - Condições atendidas");
      startCapture();
      setValidationFailCount(0);
      
      toast({
        title: "Captura Iniciada",
        description: "Mantenha o rosto estável até completar",
        duration: 2000,
      });
    }
  }, [faceDetected, faceProximity, isProcessing, cameraActive, isCapturing, shouldStartCapture, startCapture, toast]);

  // Sistema de captura contínua mais permissivo
  useEffect(() => {
    if (!isCapturing) return;

    const validationInterval = setInterval(() => {
      checkStability(); // Atualizar estabilidade
      
      // Validação mais permissiva: apenas rosto detectado e proximidade ideal
      const isValidFrame = validateForCapture() && isCapturing;
      
      if (isValidFrame) {
        console.log(`✅ Frame válido ${consecutiveValidFrames + 1}/${CAPTURE_CONFIG.REQUIRED_CONSECUTIVE_FRAMES} - Progresso: ${((consecutiveValidFrames + 1) * CAPTURE_CONFIG.PROGRESS_INCREMENT).toFixed(1)}%`);
        incrementProgress();
        setValidationFailCount(0); // Reset contador de falhas
      } else {
        setValidationFailCount(prev => prev + 1);
        
        // Apenas resetar após múltiplas falhas
        if (validationFailCount >= 5) {
          console.log("❌ MÚLTIPLAS FALHAS NA VALIDAÇÃO - Resetando");
          clearInterval(validationInterval);
          resetProgress();
          resetStability();
          setValidationFailCount(0);
        }
      }
    }, CAPTURE_CONFIG.VALIDATION_INTERVAL);

    return () => clearInterval(validationInterval);
  }, [isCapturing, faceDetected, faceProximity, validateForCapture, checkStability, incrementProgress, resetProgress, resetStability, consecutiveValidFrames, validationFailCount]);

  // Processar captura quando atingir 100%
  useEffect(() => {
    if (isComplete && isCapturing && !isProcessing) {
      console.log("🎯 CAPTURA COMPLETA - Processando imagem...");
      handleSecureCapture();
    }
  }, [isComplete, isCapturing, isProcessing]);

  async function handleSecureCapture() {
    if (isProcessing || !webcamRef.current) return;
    
    console.log("📸 Iniciando captura final...");
    
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
      console.log("💾 Enviando imagem para upload...");
      await uploadFacialImage(imageSrc);
      
      toast({
        title: "Captura Concluída",
        description: "Selfie capturada com sucesso!",
      });
      
      // Reset completo
      resetProgress();
      resetStability();
      setValidationFailCount(0);
      
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
      setValidationFailCount(0);
    } finally {
      setIsProcessing(false);
    }
  }

  const toggleCamera = useCallback(() => {
    setCameraActive(prev => !prev);
    resetProgress();
    resetStability();
    setValidationFailCount(0);
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
