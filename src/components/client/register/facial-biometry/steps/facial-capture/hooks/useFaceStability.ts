
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
    if (!faceDetected) {
      setIsStable(false);
      setStableFrameCount(0);
      consecutiveStableRef.current = 0;
      return false;
    }

    // Se rosto detectado, considerar estável imediatamente
    consecutiveStableRef.current += 1;
    setStableFrameCount(consecutiveStableRef.current);
    
    const shouldBeStable = consecutiveStableRef.current >= CAPTURE_CONFIG.REQUIRED_STABLE_FRAMES;
    setIsStable(shouldBeStable);
    
    // Atualizar última posição
    lastPositionRef.current = facePosition;

    return shouldBeStable;
  }, [faceDetected, facePosition]);

  const resetStability = useCallback(() => {
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
