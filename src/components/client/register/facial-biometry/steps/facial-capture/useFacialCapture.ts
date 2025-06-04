
import { useState, RefObject, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { useToast } from "@/hooks/use-toast";
import { useCaptureValidation } from "./hooks/useCaptureValidation";
import { useCaptureProgress } from "./hooks/useCaptureProgress";
import { uploadFacialImage } from "./utils/imageUpload";
import { CAPTURE_CONFIG } from "./config/captureConfig";

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
    resetCapture
  } = useCaptureValidation({
    faceDetected,
    faceProximity,
    isCapturing,
    captureStartTime
  });

  // RIGOROUS monitoring of face conditions
  useEffect(() => {
    if (!isCapturing) return;

    const validation = validateCaptureConditions();
    if (!validation.isValid) {
      resetProgress();
    }
  }, [faceDetected, faceProximity, isCapturing, validateCaptureConditions, resetProgress]);

  // Capture start logic
  useEffect(() => {
    // If already processing or capturing, don't start new capture
    if (isProcessing || isCapturing) return;
    
    // If no active camera, don't start capture
    if (!cameraActive) return;

    // RIGOROUS CONDITIONS to start capture
    if (shouldStartCapture()) {
      startCapture();
      
      toast({
        title: "Captura Iniciada",
        description: "Mantenha o rosto na posição até 100%",
        duration: 2000,
      });
    }
  }, [faceDetected, faceProximity, isProcessing, cameraActive, isCapturing, shouldStartCapture, startCapture, toast]);

  // Continuous validation system during capture
  useEffect(() => {
    if (!isCapturing) return;

    const validationInterval = setInterval(() => {
      // DOUBLE CHECK: Face detected AND in ideal position
      if (faceDetected && faceProximity === "ideal") {
        incrementProgress();
      } else {
        // If lost conditions during capture, reset IMMEDIATELY
        console.log("❌ Condições perdidas durante captura - resetando...");
        clearInterval(validationInterval);
        const reason = !faceDetected 
          ? "Rosto não detectado durante a captura" 
          : "Rosto saiu da posição durante a captura";
        resetProgress();
        toast({
          title: "Captura Resetada",
          description: reason,
          variant: "destructive",
        });
      }
    }, CAPTURE_CONFIG.VALIDATION_INTERVAL);

    return () => clearInterval(validationInterval);
  }, [isCapturing, faceDetected, faceProximity, incrementProgress, resetProgress, toast]);

  // Trigger for final capture when reaching 100%
  useEffect(() => {
    if (isComplete && isCapturing && !isProcessing) {
      console.log("🎉 CAPTURA VALIDADA COMPLETAMENTE! Processando...");
      handleSecureCapture();
    }
  }, [isComplete, isCapturing, isProcessing]);

  async function handleSecureCapture() {
    if (isProcessing || !webcamRef.current) return;
    
    console.log("📸 Iniciando captura segura...");
    
    // TRIPLE FINAL VALIDATION before capture
    if (!faceDetected || faceProximity !== "ideal" || !isCapturing) {
      console.log("❌ Validação final falhou");
      resetProgress();
      toast({
        title: "Erro na Captura",
        description: "Validação final falhou",
        variant: "destructive",
      });
      return;
    }
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      console.error("❌ Não foi possível capturar a imagem");
      resetProgress();
      toast({
        title: "Erro na Captura",
        description: "Erro ao capturar imagem",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      await uploadFacialImage(imageSrc);
      
      toast({
        title: "Captura Concluída com Sucesso",
        description: "Seu rosto foi capturado e validado!",
      });
      
      // Complete reset of states
      resetProgress();
      
      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete(imageSrc);
    } catch (error) {
      console.error('❌ Erro durante captura facial:', error);
      toast({
        title: "Erro na Captura",
        description: "Ocorreu um erro ao processar a imagem. Tente novamente.",
        variant: "destructive",
      });
      resetProgress();
    } finally {
      setIsProcessing(false);
    }
  }

  const toggleCamera = useCallback(() => {
    setCameraActive(prev => !prev);
    resetProgress();
    toast({
      title: "Câmera",
      description: "Câmera desativada",
    });
  }, [resetProgress, toast]);

  return {
    isProcessing,
    cameraActive,
    captureProgress,
    isCapturing,
    toggleCamera
  };
};
