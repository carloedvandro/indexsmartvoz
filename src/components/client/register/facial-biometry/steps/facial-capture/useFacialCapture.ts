
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

  // Função para limpar recursos da câmera
  const cleanupCamera = useCallback(() => {
    console.log("🧹 Limpando recursos da câmera...");
    
    if (webcamRef.current?.video) {
      const video = webcamRef.current.video;
      
      // Parar o stream se existir
      if (video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => {
          console.log(`🛑 Parando track: ${track.kind} - ${track.label}`);
          track.stop();
        });
        video.srcObject = null;
      }
    }
    
    // Parar todos os streams de mídia ativos
    navigator.mediaDevices.getUserMedia({ video: false, audio: false }).catch(() => {
      // Ignorar erros ao tentar parar streams inexistentes
    });
    
    console.log("✅ Recursos da câmera liberados");
  }, [webcamRef]);

  // Iniciar captura quando condições ideais forem atendidas
  useEffect(() => {
    if (isProcessing || isCapturing || !cameraActive) return;

    if (shouldStartCapture()) {
      console.log("🟢 INICIANDO CAPTURA - Rosto detectado na posição ideal");
      startCapture();
      
      toast({
        title: "Captura Iniciada",
        description: "Mantenha o rosto no oval até 100%",
        duration: 2000,
      });
    }
  }, [faceDetected, faceProximity, isProcessing, cameraActive, isCapturing, shouldStartCapture, startCapture, toast]);

  // Sistema de captura contínua mais direto
  useEffect(() => {
    if (!isCapturing) return;

    console.log("🔄 Sistema de captura ativo");

    const captureInterval = setInterval(() => {
      // Verificar se ainda tem rosto detectado
      if (!faceDetected) {
        console.log("❌ Rosto perdido - resetando captura");
        resetProgress();
        resetStability();
        return;
      }

      // Se rosto detectado, incrementar progresso
      console.log(`✅ Rosto detectado - Incrementando progresso (${consecutiveValidFrames + 1}/${CAPTURE_CONFIG.REQUIRED_CONSECUTIVE_FRAMES})`);
      incrementProgress();
      
    }, CAPTURE_CONFIG.VALIDATION_INTERVAL);

    return () => {
      console.log("🛑 Limpando interval de captura");
      clearInterval(captureInterval);
    };
  }, [isCapturing, faceDetected, incrementProgress, consecutiveValidFrames, resetProgress, resetStability]);

  // Processar captura quando atingir 100%
  useEffect(() => {
    if (isComplete && isCapturing && !isProcessing) {
      console.log("🎯 CAPTURA COMPLETA - Processando imagem...");
      handleSecureCapture();
    }
  }, [isComplete, isCapturing, isProcessing]);

  async function handleSecureCapture() {
    if (isProcessing || !webcamRef.current) {
      console.log("⚠️ Captura já em processamento ou webcam não disponível");
      return;
    }
    
    console.log("📸 Capturando screenshot da webcam...");
    
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
      console.log("💾 Fazendo upload da imagem...");
      await uploadFacialImage(imageSrc);
      
      // Salvar imagem no localStorage
      console.log("💾 Salvando imagem no localStorage...");
      localStorage.setItem('selfieBase64', imageSrc);
      
      toast({
        title: "Captura Concluída", 
        description: "Selfie capturada com sucesso!",
      });
      
      // Reset completo
      resetProgress();
      resetStability();
      
      // IMPORTANTE: Limpar recursos da câmera antes de redirecionar
      console.log("🧹 Limpando câmera antes do redirecionamento...");
      cleanupCamera();
      
      // Delay para garantir que a câmera seja liberada
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirecionar para próxima etapa automaticamente
      console.log("🔄 Redirecionando para verificação de documento...");
      window.location.href = '/client/document-verification';
      
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
    if (cameraActive) {
      cleanupCamera();
    }
    setCameraActive(prev => !prev);
    resetProgress();
    resetStability();
    toast({
      title: "Câmera",
      description: cameraActive ? "Câmera desativada" : "Câmera ativada",
    });
  }, [resetProgress, resetStability, toast, cameraActive, cleanupCamera]);

  // Cleanup ao desmontar o componente
  useEffect(() => {
    return () => {
      console.log("🧹 Componente desmontado - limpando câmera");
      cleanupCamera();
    };
  }, [cleanupCamera]);

  return {
    isProcessing,
    cameraActive,
    captureProgress,
    isCapturing,
    isStable,
    toggleCamera
  };
};
