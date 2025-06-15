
import { useState, useEffect, useCallback } from "react";

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

  // Memoize the capture function to avoid infinite loops
  const handleCapture = useCallback(async () => {
    console.log("✅ CAPTURA AUTOMÁTICA ATIVADA - 100% atingido");
    setIsProgressActive(false);
    setCaptureProgress(0);
    await onCapture();
  }, [onCapture]);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    // Inicia o progresso quando documento é detectado e não está capturando
    if (documentDetected && !isCapturing) {
      console.log("🚀 INICIANDO PROGRESSO DE CAPTURA - Documento detectado");
      setIsProgressActive(true);
      setCaptureProgress(0);

      progressInterval = setInterval(() => {
        setCaptureProgress(prev => {
          const newProgress = prev + 10; // Incrementa 10% a cada 100ms (10 steps para 100%)
          
          console.log(`📈 Progresso de captura: ${newProgress}%`);
          
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            handleCapture();
            return 100;
          }
          
          return newProgress;
        });
      }, 100); // Atualiza a cada 100ms
    } else if (!documentDetected && !isCapturing) {
      // Reset quando documento não detectado
      console.log("🔄 RESETANDO PROGRESSO - Documento não detectado");
      setIsProgressActive(false);
      setCaptureProgress(0);
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [documentDetected, isCapturing, handleCapture]);

  // Reset progress when capture starts
  useEffect(() => {
    if (isCapturing) {
      console.log("🛑 CAPTURA INICIADA - Resetando progresso");
      setIsProgressActive(false);
      setCaptureProgress(0);
    }
  }, [isCapturing]);

  return {
    captureProgress,
    isProgressActive
  };
};
