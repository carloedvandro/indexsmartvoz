
import { useEffect, useRef } from "react";
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
          
          // Verificação se o vídeo está funcionando
          if (video.videoWidth === 0 || video.videoHeight === 0) {
            console.log("⚠️ Vídeo não está pronto ainda");
            onDetectionResult(false, { x: 0, y: 0, size: 0 }, "not-detected", "good");
            return;
          }
          
          console.log("🔍 ANALISANDO FRAME DO VÍDEO");
          const result = await detectFaceInFrame(video);
          
          console.log("📋 RESULTADO:", {
            detected: result.detected,
            proximity: result.proximity,
            position: result.position
          });
          
          onDetectionResult(result.detected, result.position, result.proximity, result.lighting);
        } catch (error) {
          console.error("❌ Erro na detecção facial:", error);
          onDetectionResult(false, { x: 0, y: 0, size: 0 }, "not-detected", "good");
        }
      } else {
        console.log("⚠️ Elemento de vídeo não disponível");
        onDetectionResult(false, { x: 0, y: 0, size: 0 }, "not-detected", "good");
      }
    }, 150); // Intervalo de 150ms para detecção mais frequente

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("🛑 Detecção facial parada");
      }
    };
  }, [isActive, webcamRef, onDetectionResult]);
};
