import { useState, RefObject, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { useToast } from "@/hooks/use-toast";
import { useCaptureValidation } from "./hooks/useCaptureValidation";
import { useCaptureProgress } from "./hooks/useCaptureProgress";
import { useFaceStability } from "./hooks/useFaceStability";
import { uploadFacialImage } from "./utils/imageUpload";
import { cleanupMediaPipe } from "./utils/mediaPipeDetection";
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

  // Função COMPLETA para limpar todos os recursos
  const cleanupAllResources = useCallback(async () => {
    console.log("🧹 INICIANDO limpeza COMPLETA de TODOS os recursos...");
    
    try {
      // 1. Parar webcam primeiro
      if (webcamRef.current?.video) {
        const video = webcamRef.current.video;
        console.log("📹 Pausando e limpando vídeo...");
        video.pause();
        
        if (video.srcObject) {
          const stream = video.srcObject as MediaStream;
          console.log(`📡 Stream encontrado com ${stream.getTracks().length} tracks`);
          
          stream.getTracks().forEach((track, index) => {
            console.log(`🛑 Parando track ${index + 1}: ${track.kind} - ${track.label} - Estado: ${track.readyState}`);
            track.stop();
          });
          
          video.srcObject = null;
          console.log("🧽 srcObject limpo");
        }
        
        // Forçar reload do vídeo
        video.load();
      }
      
      // 2. Limpar MediaPipe COMPLETAMENTE
      console.log("🧹 Limpando MediaPipe...");
      await cleanupMediaPipe();
      
      // 3. Parar síntese de voz
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        console.log("🔇 Síntese de voz cancelada");
      }
      
      // 4. Forçar limpeza de todos os streams de mídia ativos globalmente
      console.log("🔍 Verificando streams ativos globalmente...");
      
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log(`📱 ${devices.length} dispositivos encontrados`);
        
        // Aguardar tempo suficiente para garantir liberação
        console.log("⏳ Aguardando 3 segundos para liberação completa...");
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Verificar se a câmera traseira está disponível
        console.log("🔍 Verificando disponibilidade da câmera traseira...");
        try {
          const testStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
          });
          console.log("✅ Câmera traseira disponível - recursos liberados!");
          testStream.getTracks().forEach(track => track.stop());
          return true;
        } catch (error) {
          console.warn("⚠️ Câmera traseira ainda não disponível:", error);
          
          // Segunda tentativa após mais tempo
          await new Promise(resolve => setTimeout(resolve, 2000));
          try {
            const testStream2 = await navigator.mediaDevices.getUserMedia({ 
              video: { facingMode: 'environment' } 
            });
            console.log("✅ Câmera traseira disponível na segunda tentativa!");
            testStream2.getTracks().forEach(track => track.stop());
            return true;
          } catch (error2) {
            console.error("❌ Câmera ainda ocupada após tentativas:", error2);
            return false;
          }
        }
      } catch (error) {
        console.log("⚠️ Erro ao enumerar dispositivos:", error);
        return false;
      }
      
    } catch (error) {
      console.error("❌ Erro durante limpeza completa:", error);
      return false;
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
      
      console.log("💾 Salvando imagem no localStorage...");
      localStorage.setItem('selfieBase64', imageSrc);
      
      toast({
        title: "Captura Concluída", 
        description: "Selfie capturada com sucesso!",
      });
      
      resetProgress();
      resetStability();
      
      // LIMPEZA COMPLETA DE TODOS OS RECURSOS
      console.log("🧹 Iniciando limpeza COMPLETA de todos os recursos...");
      const resourcesReleased = await cleanupAllResources();
      
      if (resourcesReleased) {
        console.log("✅ Todos os recursos liberados - redirecionando...");
        toast({
          title: "Recursos Liberados",
          description: "Redirecionando para verificação de documento...",
        });
      } else {
        console.warn("⚠️ Alguns recursos podem ainda estar ocupados");
        toast({
          title: "Aviso",
          description: "Alguns recursos podem ainda estar ocupados, mas prosseguindo...",
          variant: "destructive",
        });
      }
      
      // Tempo adicional de segurança
      console.log("⏳ Tempo de segurança adicional...");
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
      await cleanupAllResources();
    }
    setCameraActive(prev => !prev);
    resetProgress();
    resetStability();
    toast({
      title: "Câmera",
      description: cameraActive ? "Câmera desativada" : "Câmera ativada",
    });
  }, [resetProgress, resetStability, toast, cameraActive, cleanupAllResources]);

  // Cleanup aprimorado ao desmontar o componente
  useEffect(() => {
    return () => {
      console.log("🧹 Componente useFacialCapture desmontado - limpeza final");
      cleanupAllResources();
    };
  }, [cleanupAllResources]);

  return {
    isProcessing,
    cameraActive,
    captureProgress,
    isCapturing,
    isStable,
    toggleCamera
  };
};
