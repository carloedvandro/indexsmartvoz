
import { useState, useCallback } from "react";
import { CAPTURE_CONFIG } from "../config/captureConfig";

export const useCaptureProgress = () => {
  const [captureProgress, setCaptureProgress] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [consecutiveValidFrames, setConsecutiveValidFrames] = useState(0);
  const [captureStartTime, setCaptureStartTime] = useState<number | null>(null);

  const startCapture = useCallback(() => {
    console.log("🟢 INICIANDO CAPTURA - Condições atendidas");
    setIsCapturing(true);
    setCaptureProgress(0);
    setConsecutiveValidFrames(0);
    setCaptureStartTime(Date.now());
  }, []);

  const resetProgress = useCallback(() => {
    setIsCapturing(false);
    setCaptureProgress(0);
    setConsecutiveValidFrames(0);
    setCaptureStartTime(null);
  }, []);

  const incrementProgress = useCallback(() => {
    setConsecutiveValidFrames(prev => {
      const newCount = prev + 1;
      const newProgress = Math.min(newCount * CAPTURE_CONFIG.PROGRESS_INCREMENT, 100);
      setCaptureProgress(newProgress);
      
      console.log(`✅ Frame válido ${newCount}/${CAPTURE_CONFIG.REQUIRED_CONSECUTIVE_FRAMES} - Progresso: ${newProgress.toFixed(1)}%`);
      
      return newCount;
    });
  }, []);

  const isComplete = consecutiveValidFrames >= CAPTURE_CONFIG.REQUIRED_CONSECUTIVE_FRAMES;

  return {
    captureProgress,
    isCapturing,
    consecutiveValidFrames,
    captureStartTime,
    isComplete,
    startCapture,
    resetProgress,
    incrementProgress
  };
};
