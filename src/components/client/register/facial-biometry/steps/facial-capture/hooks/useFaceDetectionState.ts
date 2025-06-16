
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

    console.log(`🔄 ULTRA SIMPLE Detection update - Detected: ${detected}, Proximity: ${proximity}`);

    if (detected) {
      consecutiveDetectionsRef.current++;
      consecutiveNoDetectionsRef.current = 0;
      
      // Detecção IMEDIATA
      setFaceDetected(true);
      console.log(`✅ ULTRA SIMPLE Face detected IMMEDIATELY`);
    } else {
      consecutiveNoDetectionsRef.current++;
      consecutiveDetectionsRef.current = 0;
      
      if (consecutiveNoDetectionsRef.current >= 2) {
        setFaceDetected(false);
        console.log(`❌ ULTRA SIMPLE Face lost after ${consecutiveNoDetectionsRef.current} frames`);
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
