
import { useState, useRef } from "react";

export const useFaceDetectionState = () => {
  const [faceDetected, setFaceDetected] = useState(false);
  const [facePosition, setFacePosition] = useState({ x: 0, y: 0, size: 0 });
  const [faceProximity, setFaceProximity] = useState<"ideal" | "too-close" | "too-far" | "not-detected">("not-detected");
  const [lightingQuality, setLightingQuality] = useState<"good" | "poor" | "too-dark" | "too-bright">("good");
  
  const consecutiveDetectionsRef = useRef(0);
  const consecutiveNoDetectionsRef = useRef(0);

  const updateFaceDetection = (detected: boolean, position: { x: number; y: number; size: number }, proximity: "ideal" | "too-close" | "too-far" | "not-detected", lighting: "good" | "poor" | "too-dark" | "too-bright") => {
    setFacePosition(position);
    setFaceProximity(proximity);
    setLightingQuality("good"); // Sempre como "good"

    console.log(`🔄 ATUALIZAÇÃO DETECÇÃO - Detectado: ${detected}, Proximidade: ${proximity}`);

    if (detected) {
      consecutiveDetectionsRef.current++;
      consecutiveNoDetectionsRef.current = 0;
      
      // DETECÇÃO IMEDIATA - sem esperar frames consecutivos
      setFaceDetected(true);
      console.log(`✅ ROSTO DETECTADO IMEDIATAMENTE!`);
    } else {
      consecutiveNoDetectionsRef.current++;
      consecutiveDetectionsRef.current = 0;
      
      // Perder detecção apenas após alguns frames
      if (consecutiveNoDetectionsRef.current >= 3) {
        setFaceDetected(false);
        console.log(`❌ Rosto perdido após ${consecutiveNoDetectionsRef.current} frames`);
      }
    }
  };

  return {
    faceDetected,
    facePosition,
    faceProximity,
    lightingQuality,
    updateFaceDetection
  };
};
