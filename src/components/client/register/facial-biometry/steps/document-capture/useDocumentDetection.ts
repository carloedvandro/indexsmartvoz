
import { useState, useEffect, RefObject } from "react";
import Webcam from "react-webcam";

export const useDocumentDetection = (
  webcamRef: RefObject<Webcam>,
  isCapturing: boolean
) => {
  const [documentDetected, setDocumentDetected] = useState(false);
  const [detectionTriggered, setDetectionTriggered] = useState(false);

  useEffect(() => {
    // Reset detection when capturing starts
    if (isCapturing) {
      setDocumentDetected(false);
      setDetectionTriggered(false);
      return;
    }

    // Prevent multiple detections
    if (!webcamRef.current || detectionTriggered) {
      return;
    }

    console.log("🔍 INICIANDO DETECÇÃO DE DOCUMENTO - Uma única vez");
    setDetectionTriggered(true);
    
    // Detecção automática após 1 segundo para dar tempo da câmera inicializar
    const detectionTimer = setTimeout(() => {
      console.log("📄 DOCUMENTO DETECTADO - Iniciando captura automática");
      setDocumentDetected(true);
    }, 1000);

    return () => {
      clearTimeout(detectionTimer);
    };
  }, [webcamRef.current, isCapturing, detectionTriggered]);

  // Reset detection when component unmounts or webcam changes
  useEffect(() => {
    if (!webcamRef.current) {
      setDetectionTriggered(false);
      setDocumentDetected(false);
    }
  }, [webcamRef.current]);

  return { documentDetected };
};
