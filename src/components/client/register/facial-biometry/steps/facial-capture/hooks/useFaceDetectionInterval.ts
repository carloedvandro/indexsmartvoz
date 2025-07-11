
import { useEffect, useRef } from "react";
import { detectFaceInFrame } from "../utils/faceDetectionCore";
import { detectFaceWithFaceApi, speakInstruction } from "../utils/faceApiDetection";

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

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    console.log("🟢 DETECÇÃO HABILITADA - Iniciando verificação contínua");

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
          
          console.log("🔍 ANALISANDO FRAME COM FACE-API.JS");
          
          // Tentar face-api.js primeiro, fallback para detecção simples
          let result;
          try {
            result = await detectFaceWithFaceApi(video);
            console.log("🎯 FACE-API.JS RESULTADO:", {
              detected: result.detected,
              proximity: result.proximity,
              confidence: result.confidence
            });
          } catch (error) {
            console.log("⚠️ Face-api.js falhou, usando detecção fallback");
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
    }, 800); // Intervalo otimizado para face-api.js - 800ms

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("🛑 Detecção facial parada");
      }
    };
  }, [isActive, webcamRef, onDetectionResult]);
};
