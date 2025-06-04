
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

  // VALIDAÇÃO CRÍTICA CONTÍNUA - Para imediatamente se condições forem perdidas
  useEffect(() => {
    if (!isCapturing) return;

    // VERIFICAÇÃO RIGOROSA IMEDIATA - se perdeu face ou posição, RESET
    if (!faceDetected || faceProximity !== "ideal") {
      console.log("🚨 CONDIÇÕES PERDIDAS - RESETANDO CAPTURA IMEDIATAMENTE");
      console.log("Face detectada:", faceDetected, "Proximidade:", faceProximity);
      
      resetProgress();
      
      toast({
        title: "Captura Interrompida",
        description: !faceDetected 
          ? "Rosto não detectado - Centralize novamente" 
          : "Rosto fora da posição - Volte para o oval",
        variant: "destructive",
        duration: 2000,
      });
    }
  }, [faceDetected, faceProximity, isCapturing, resetProgress, toast]);

  // Iniciar captura apenas quando condições ideais
  useEffect(() => {
    // Se já está processando, capturando ou câmera inativa, não iniciar
    if (isProcessing || isCapturing || !cameraActive) return;

    // Condições RIGOROSAS para iniciar
    if (shouldStartCapture()) {
      console.log("🟢 INICIANDO CAPTURA - Todas as condições atendidas");
      startCapture();
      
      toast({
        title: "Captura Iniciada",
        description: "Mantenha o rosto centralizado até 100%",
        duration: 2000,
      });
    }
  }, [faceDetected, faceProximity, isProcessing, cameraActive, isCapturing, shouldStartCapture, startCapture, toast]);

  // Sistema de validação contínua durante captura - MAIS RIGOROSO
  useEffect(() => {
    if (!isCapturing) return;

    const validationInterval = setInterval(() => {
      // VALIDAÇÃO TRIPLA OBRIGATÓRIA: detectado + ideal + capturando
      const isValidFrame = faceDetected && faceProximity === "ideal" && isCapturing;
      
      if (isValidFrame) {
        console.log("✅ Frame válido - incrementando progresso");
        incrementProgress();
      } else {
        // RESET IMEDIATO e FORÇADO se perdeu condições
        console.log("❌ FRAME INVÁLIDO - Parando captura IMEDIATAMENTE");
        console.log("Detalhes de falha:", { 
          faceDetected, 
          faceProximity, 
          isCapturing,
          timestamp: Date.now()
        });
        
        // Parar interval e resetar
        clearInterval(validationInterval);
        resetProgress();
        
        const reason = !faceDetected 
          ? "Rosto saiu do enquadramento" 
          : faceProximity !== "ideal" 
            ? "Rosto saiu da posição ideal"
            : "Captura interrompida";
            
        toast({
          title: "Captura Resetada",
          description: reason,
          variant: "destructive",
        });
      }
    }, CAPTURE_CONFIG.VALIDATION_INTERVAL);

    return () => clearInterval(validationInterval);
  }, [isCapturing, faceDetected, faceProximity, incrementProgress, resetProgress, toast]);

  // Processar captura quando atingir 100% - COM VALIDAÇÃO FINAL
  useEffect(() => {
    if (isComplete && isCapturing && !isProcessing) {
      console.log("🎯 CAPTURA 100% - Validando condições finais...");
      
      // VALIDAÇÃO FINAL CRÍTICA antes de processar
      if (faceDetected && faceProximity === "ideal") {
        console.log("✅ VALIDAÇÃO FINAL APROVADA! Processando...");
        handleSecureCapture();
      } else {
        console.log("❌ VALIDAÇÃO FINAL FALHOU - Resetando");
        resetProgress();
        toast({
          title: "Erro na Captura",
          description: "Validação final falhou - Mantenha o rosto na posição",
          variant: "destructive",
        });
      }
    }
  }, [isComplete, isCapturing, isProcessing, faceDetected, faceProximity]);

  async function handleSecureCapture() {
    if (isProcessing || !webcamRef.current) return;
    
    console.log("📸 Iniciando captura final segura...");
    
    // VALIDAÇÃO FINAL TRIPLA antes de processar
    if (!faceDetected || faceProximity !== "ideal" || !isCapturing) {
      console.log("❌ VALIDAÇÃO FINAL FALHOU - Não processando");
      resetProgress();
      toast({
        title: "Erro na Captura",
        description: "Validação final falhou - Tente novamente",
        variant: "destructive",
      });
      return;
    }
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      console.error("❌ Erro ao capturar screenshot");
      resetProgress();
      toast({
        title: "Erro na Captura",
        description: "Erro ao capturar imagem - Tente novamente",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      await uploadFacialImage(imageSrc);
      
      toast({
        title: "Captura Concluída",
        description: "Rosto capturado e validado com sucesso!",
      });
      
      // Reset completo
      resetProgress();
      
      // Delay para melhor UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete(imageSrc);
    } catch (error) {
      console.error('❌ Erro durante upload:', error);
      toast({
        title: "Erro no Upload",
        description: "Erro ao salvar imagem - Tente novamente",
        variant: "destructive",
      });
      resetProgress();
    } finally {
      setIsProcessing(false);
    }
  }

  const toggleCamera = useCallback(() => {
    setCameraActive(prev => !prev);
    resetProgress(); // Reset ao alternar câmera
    toast({
      title: "Câmera",
      description: cameraActive ? "Câmera desativada" : "Câmera ativada",
    });
  }, [resetProgress, toast, cameraActive]);

  return {
    isProcessing,
    cameraActive,
    captureProgress,
    isCapturing,
    toggleCamera
  };
};
