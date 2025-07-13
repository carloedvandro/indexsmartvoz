
import { useEffect, useRef } from "react";
import { detectFaceWithMediaPipe, speakInstruction, initializeMediaPipe } from "../utils/mediaPipeDetection";
import { detectFaceInFrame } from "../utils/faceDetectionCore";

interface UseFaceDetectionIntervalProps {
  webcamRef: React.RefObject<any>;
  isActive: boolean;
  onDetectionResult: (detected: boolean, position: { x: number; y: number; size: number }, proximity: "ideal" | "too-close" | "too-far" | "not-detected", lighting: "good" | "poor" | "too-dark" | "too-bright") => void;
}

export const useFaceDetectionInterval = ({
  webcamRef,
  isActive,
  onDetectionResult
}: UseFaceDetectionIntervalProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mediaPipeInitialized = useRef(false);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    console.log("🟢 DETECÇÃO HABILITADA - Iniciando verificação contínua com MediaPipe");

    // Inicializar MediaPipe uma vez
    const initMediaPipe = async () => {
      if (!mediaPipeInitialized.current) {
        const success = await initializeMediaPipe();
        mediaPipeInitialized.current = success;
        console.log(`📦 MediaPipe inicializado: ${success}`);
      }
    };

    initMediaPipe();

    intervalRef.current = setInterval(async () => {
      if (webcamRef.current?.video) {
        try {
          const video = webcamRef.current.video;
          
          console.log(`📹 VIDEO STATUS: ${video.videoWidth}x${video.videoHeight}, ready: ${video.readyState}`);
          
          // Verificação mais flexível do vídeo
          if (video.videoWidth === 0 || video.videoHeight === 0 || video.readyState < 2) {
            console.log("⚠️ Vídeo ainda não está pronto");
            onDetectionResult(false, { x: 0, y: 0, size: 0 }, "not-detected", "good");
            return;
          }
          
          console.log("🔍 ANALISANDO FRAME COM MEDIAPIPE");
          
          // Tentar MediaPipe primeiro, fallback para detecção simples
          let result;
          try {
            if (mediaPipeInitialized.current) {
              result = await detectFaceWithMediaPipe(video);
              console.log("🎯 MEDIAPIPE RESULTADO:", {
                detected: result.detected,
                proximity: result.proximity,
                confidence: result.confidence
              });
            } else {
              throw new Error("MediaPipe não inicializado");
            }
          } catch (error) {
            console.log("⚠️ MediaPipe falhou, usando detecção fallback");
            result = await detectFaceInFrame(video);
          }
          
          // Dar instruções por voz se necessário
          if (result.detected && result.proximity === "ideal") {
            speakInstruction("Rosto posicionado corretamente");
          } else if (result.detected && result.proximity === "too-close") {
            speakInstruction("Afaste um pouco");
          } else if (result.detected && result.proximity === "too-far") {
            speakInstruction("Aproxime um pouco");
          } else if (!result.detected) {
            speakInstruction("Posicione o rosto dentro do oval");
          }
          
          onDetectionResult(result.detected, result.position, result.proximity, result.lighting);
        } catch (error) {
          console.error("❌ Erro na detecção facial:", error);
          onDetectionResult(false, { x: 0, y: 0, size: 0 }, "not-detected", "good");
        }
      } else {
        console.log("⚠️ Elemento de vídeo não disponível");
        onDetectionResult(false, { x: 0, y: 0, size: 0 }, "not-detected", "good");
      }
    }, 500); // Intervalo otimizado para MediaPipe - 500ms

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("🛑 Detecção facial parada");
      }
    };
  }, [isActive, webcamRef, onDetectionResult]);
};
