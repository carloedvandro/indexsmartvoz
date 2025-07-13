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

  // Função aprimorada para limpar recursos da câmera
  const cleanupCamera = useCallback(async () => {
    console.log("🧹 INICIANDO limpeza completa da câmera...");
    
    try {
      // 1. Parar webcam primeiro
      if (webcamRef.current?.video) {
        const video = webcamRef.current.video;
        console.log("📹 Pausando vídeo...");
        video.pause();
        
        if (video.srcObject) {
          const stream = video.srcObject as MediaStream;
          console.log(`📡 Stream encontrado com ${stream.getTracks().length} tracks`);
          
          // Parar cada track individualmente
          stream.getTracks().forEach((track, index) => {
            console.log(`🛑 Parando track ${index + 1}: ${track.kind} - ${track.label} - Estado: ${track.readyState}`);
            track.stop();
            
            // Verificar se realmente parou
            setTimeout(() => {
              console.log(`✅ Track ${index + 1} estado após stop: ${track.readyState}`);
            }, 100);
          });
          
          // Limpar srcObject
          video.srcObject = null;
          console.log("🧽 srcObject limpo");
        }
      }
      
      // 2. Forçar limpeza de todos os streams de mídia ativos
      console.log("🔍 Verificando streams ativos globalmente...");
      
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log(`📱 ${devices.length} dispositivos encontrados`);
        
        // Tentat parar qualquer stream ativo
        if (navigator.mediaDevices.getUserMedia) {
          console.log("🛑 Forçando parada de streams globais...");
          
          // Hack para garantir que todos os streams sejam parados
          navigator.mediaDevices.getUserMedia({ video: false, audio: false })
            .then(() => console.log("✅ Streams globais verificados"))
            .catch(() => console.log("ℹ️ Nenhum stream ativo para parar"));
        }
      } catch (error) {
        console.log("⚠️ Erro ao enumerar dispositivos:", error);
      }
      
      // 3. Aguardar um pouco para garantir limpeza
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log("✅ Limpeza da câmera CONCLUÍDA");
      
    } catch (error) {
      console.error("❌ Erro durante limpeza da câmera:", error);
    }
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
      
      // LIMPEZA COMPLETA DA CÂMERA
      console.log("🧹 Iniciando limpeza completa da câmera antes do redirecionamento...");
      await cleanupCamera();
      
      // TEMPO DE ESPERA MAIOR para garantir que a câmera seja liberada
      console.log("⏳ Aguardando 3 segundos para garantir liberação da câmera...");
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Verificar se realmente liberou
      console.log("🔍 Verificando se a câmera foi liberada...");
      try {
        const testStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        console.log("✅ Câmera traseira disponível para documento");
        testStream.getTracks().forEach(track => track.stop());
      } catch (error) {
        console.warn("⚠️ Câmera ainda pode estar ocupada:", error);
        // Aguardar mais um pouco
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      // Redirecionar para próxima etapa
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

  const toggleCamera = useCallback(async () => {
    if (cameraActive) {
      await cleanupCamera();
    }
    setCameraActive(prev => !prev);
    resetProgress();
    resetStability();
    toast({
      title: "Câmera",
      description: cameraActive ? "Câmera desativada" : "Câmera ativada",
    });
  }, [resetProgress, resetStability, toast, cameraActive, cleanupCamera]);

  // Cleanup aprimorado ao desmontar o componente
  useEffect(() => {
    return () => {
      console.log("🧹 Componente desmontado - iniciando limpeza completa");
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
