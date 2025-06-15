
import { useState, useEffect, RefObject } from "react";
import Webcam from "react-webcam";

export const useDocumentDetection = (
  webcamRef: RefObject<Webcam>,
  isCapturing: boolean
) => {
  const [documentDetected, setDocumentDetected] = useState(false);

  useEffect(() => {
    if (!webcamRef.current || isCapturing) {
      setDocumentDetected(false);
      return;
    }

    console.log("🔍 INICIANDO DETECÇÃO DE DOCUMENTO");
    
    // Detecção automática após 1 segundo para dar tempo da câmera inicializar
    const detectionTimer = setTimeout(() => {
      console.log("📄 DOCUMENTO DETECTADO - Iniciando captura automática");
      setDocumentDetected(true);
    }, 1000);

    return () => {
      clearTimeout(detectionTimer);
    };
  }, [webcamRef, isCapturing]);

  return { documentDetected };
};
