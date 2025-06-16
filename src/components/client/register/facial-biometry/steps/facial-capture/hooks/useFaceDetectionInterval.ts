
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

    console.log("🟢 ULTRA SIMPLE Detection interval started");

    intervalRef.current = setInterval(async () => {
      if (webcamRef.current?.video) {
        try {
          const video = webcamRef.current.video;
          
          // Verificação básica se o vídeo está funcionando
          if (video.videoWidth === 0 || video.videoHeight === 0) {
            console.log("⚠️ ULTRA SIMPLE - Video not ready");
            onDetectionResult(false, { x: 0, y: 0, size: 0 }, "not-detected", "good");
            return;
          }
          
          console.log("🔍 ULTRA SIMPLE - Running detection on video frame");
          const result = await detectFaceInFrame(video);
          onDetectionResult(result.detected, result.position, result.proximity, result.lighting);
        } catch (error) {
          console.error("❌ ULTRA SIMPLE Face detection error:", error);
          onDetectionResult(false, { x: 0, y: 0, size: 0 }, "not-detected", "good");
        }
      } else {
        console.log("⚠️ ULTRA SIMPLE - No video element available");
        onDetectionResult(false, { x: 0, y: 0, size: 0 }, "not-detected", "good");
      }
    }, 200); // Intervalo mais lento para debug

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("🛑 ULTRA SIMPLE Detection interval stopped");
      }
    };
  }, [isActive, webcamRef, onDetectionResult]);
};
