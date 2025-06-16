
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
    setLightingQuality(lighting);

    console.log(`🔄 ATUALIZAÇÃO DETECÇÃO RIGOROSA - Detectado: ${detected}, Proximidade: ${proximity}`);

    if (detected) {
      consecutiveDetectionsRef.current++;
      consecutiveNoDetectionsRef.current = 0;
      
      // Requer 3 detecções consecutivas para confirmar rosto humano
      if (consecutiveDetectionsRef.current >= 3) {
        setFaceDetected(true);
        console.log(`✅ ROSTO HUMANO CONFIRMADO após ${consecutiveDetectionsRef.current} detecções consecutivas!`);
      } else {
        console.log(`🔄 Confirmando rosto humano... ${consecutiveDetectionsRef.current}/3 detecções`);
      }
    } else {
      consecutiveNoDetectionsRef.current++;
      consecutiveDetectionsRef.current = 0;
      
      // Perder detecção após 5 frames sem rosto
      if (consecutiveNoDetectionsRef.current >= 5) {
        setFaceDetected(false);
        console.log(`❌ Rosto perdido após ${consecutiveNoDetectionsRef.current} frames sem detecção`);
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
