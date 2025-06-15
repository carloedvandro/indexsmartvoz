
import { useState, useEffect, useCallback, useRef } from "react";

interface UseDocumentCaptureProgressProps {
  documentDetected: boolean;
  isCapturing: boolean;
  onCapture: () => Promise<void>;
}

export const useDocumentCaptureProgress = ({
  documentDetected,
  isCapturing,
  onCapture
}: UseDocumentCaptureProgressProps) => {
  const [captureProgress, setCaptureProgress] = useState(0);
  const [isProgressActive, setIsProgressActive] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const captureTriggeredRef = useRef(false);

  // Memoize the capture function to avoid infinite loops
  const handleCapture = useCallback(async () => {
    if (captureTriggeredRef.current) {
      return; // Prevent multiple captures
    }
    
    captureTriggeredRef.current = true;
    console.log("✅ CAPTURA AUTOMÁTICA ATIVADA - 100% atingido");
    setIsProgressActive(false);
    setCaptureProgress(100);
    
    try {
      await onCapture();
    } finally {
      // Reset will be handled by parent component state changes
    }
  }, [onCapture]);

  useEffect(() => {
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    // Reset progress when capturing starts
    if (isCapturing) {
      console.log("🛑 CAPTURA INICIADA - Resetando progresso");
      setIsProgressActive(false);
      setCaptureProgress(0);
      captureTriggeredRef.current = false;
      return;
    }

    // Start progress when document is detected and not already capturing
    if (documentDetected && !isCapturing && !isProgressActive && !captureTriggeredRef.current) {
      console.log("🚀 INICIANDO PROGRESSO DE CAPTURA - Documento detectado");
      setIsProgressActive(true);
      setCaptureProgress(0);

      progressIntervalRef.current = setInterval(() => {
        setCaptureProgress(prev => {
          const newProgress = prev + 10; // Incrementa 10% a cada 100ms (10 steps para 100%)
          
          console.log(`📈 Progresso de captura: ${newProgress}%`);
          
          if (newProgress >= 100) {
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current);
              progressIntervalRef.current = null;
            }
            handleCapture();
            return 100;
          }
          
          return newProgress;
        });
      }, 100); // Atualiza a cada 100ms
    } else if (!documentDetected && !isCapturing) {
      // Reset when document not detected
      console.log("🔄 RESETANDO PROGRESSO - Documento não detectado");
      setIsProgressActive(false);
      setCaptureProgress(0);
      captureTriggeredRef.current = false;
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [documentDetected, isCapturing, handleCapture, isProgressActive]);

  return {
    captureProgress,
    isProgressActive
  };
};
