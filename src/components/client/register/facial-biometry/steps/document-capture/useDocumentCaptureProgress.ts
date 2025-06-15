
import { useState, useEffect } from "react";

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

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    if (documentDetected && !isCapturing) {
      console.log("🚀 INICIANDO PROGRESSO DE CAPTURA - Documento detectado");
      setIsProgressActive(true);
      setCaptureProgress(0);

      progressInterval = setInterval(() => {
        setCaptureProgress(prev => {
          const newProgress = prev + 20; // Incrementa 20% a cada 100ms (5 frames para 100%)
          
          console.log(`📈 Progresso de captura: ${newProgress}%`);
          
          if (newProgress >= 100) {
            console.log("✅ CAPTURA AUTOMÁTICA ATIVADA - 100% atingido");
            setIsProgressActive(false);
            onCapture();
            return 100;
          }
          
          return newProgress;
        });
      }, 100); // Atualiza a cada 100ms
    } else {
      // Interrompe e reseta quando documento não detectado ou está capturando
      console.log("🛑 INTERROMPENDO PROGRESSO - Documento não detectado ou capturando");
      setIsProgressActive(false);
      setCaptureProgress(0);
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [documentDetected, isCapturing, onCapture]);

  return {
    captureProgress,
    isProgressActive
  };
};
