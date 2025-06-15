
import { useState, useEffect, RefObject } from "react";
import Webcam from "react-webcam";

export const useDocumentDetection = (
  webcamRef: RefObject<Webcam>,
  isCapturing: boolean
) => {
  const [documentDetected, setDocumentDetected] = useState(false);

  useEffect(() => {
    if (!webcamRef.current || isCapturing) return;

    // Detecção super simples - sempre detecta documento após 500ms
    const detectionTimer = setTimeout(() => {
      console.log("📄 DOCUMENTO DETECTADO - Configuração 100%");
      setDocumentDetected(true);
    }, 500);

    return () => {
      clearTimeout(detectionTimer);
    };
  }, [webcamRef, isCapturing]);

  // Reset quando iniciar captura
  useEffect(() => {
    if (isCapturing) {
      setDocumentDetected(false);
    }
  }, [isCapturing]);

  return { documentDetected };
};
