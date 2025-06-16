
import { useState, useCallback, useRef } from "react";
import { CAPTURE_CONFIG } from "../config/captureConfig";

interface FaceStabilityProps {
  facePosition: { x: number; y: number; size: number };
  faceDetected: boolean;
  faceProximity: "ideal" | "too-close" | "too-far" | "not-detected";
}

export const useFaceStability = ({
  facePosition,
  faceDetected,
  faceProximity
}: FaceStabilityProps) => {
  const [isStable, setIsStable] = useState(false);
  const [stableFrameCount, setStableFrameCount] = useState(0);
  const lastPositionRef = useRef({ x: 0, y: 0, size: 0 });
  const consecutiveStableRef = useRef(0);

  const checkStability = useCallback(() => {
    console.log("🔍 Checking stability (RIGOROSA) - Face detected:", faceDetected, "Proximity:", faceProximity);
    
    // Apenas considerar estável se rosto detectado E na posição ideal
    if (!faceDetected || faceProximity !== "ideal") {
      console.log("❌ Não estável - rosto não detectado ou posição não ideal");
      setIsStable(false);
      setStableFrameCount(0);
      consecutiveStableRef.current = 0;
      return false;
    }

    // Se rosto detectado na posição ideal, considerar estável rapidamente
    consecutiveStableRef.current += 1;
    setStableFrameCount(consecutiveStableRef.current);
    
    // Requisitos rigorosos: apenas posição ideal
    const shouldBeStable = consecutiveStableRef.current >= CAPTURE_CONFIG.REQUIRED_STABLE_FRAMES;
    setIsStable(shouldBeStable);
    
    console.log("✅ Face stable (RIGOROSA):", shouldBeStable, "Frames:", consecutiveStableRef.current);
    
    // Atualizar última posição
    lastPositionRef.current = facePosition;

    return shouldBeStable;
  }, [faceDetected, facePosition, faceProximity]);

  const resetStability = useCallback(() => {
    console.log("🔄 Resetting stability");
    setIsStable(false);
    setStableFrameCount(0);
    consecutiveStableRef.current = 0;
    lastPositionRef.current = { x: 0, y: 0, size: 0 };
  }, []);

  return {
    isStable,
    stableFrameCount,
    checkStability,
    resetStability
  };
};
