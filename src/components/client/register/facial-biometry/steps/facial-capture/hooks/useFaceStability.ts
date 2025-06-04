
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

  const checkStability = useCallback(() => {
    if (!faceDetected || faceProximity !== "ideal") {
      setIsStable(false);
      setStableFrameCount(0);
      return false;
    }

    const lastPos = lastPositionRef.current;
    const currentPos = facePosition;

    // Calcular diferença de posição
    const positionDiff = Math.sqrt(
      Math.pow(currentPos.x - lastPos.x, 2) + 
      Math.pow(currentPos.y - lastPos.y, 2)
    );

    const sizeDiff = Math.abs(currentPos.size - lastPos.size);

    // Verificar se está estável
    const isCurrentlyStable = positionDiff < CAPTURE_CONFIG.FACE_STABILITY_THRESHOLD &&
                             sizeDiff < 0.02;

    if (isCurrentlyStable) {
      setStableFrameCount(prev => {
        const newCount = prev + 1;
        const shouldBeStable = newCount >= CAPTURE_CONFIG.REQUIRED_STABLE_FRAMES;
        setIsStable(shouldBeStable);
        return newCount;
      });
    } else {
      setStableFrameCount(0);
      setIsStable(false);
    }

    // Atualizar última posição
    lastPositionRef.current = currentPos;

    return isStable;
  }, [faceDetected, faceProximity, facePosition, isStable]);

  const resetStability = useCallback(() => {
    setIsStable(false);
    setStableFrameCount(0);
    lastPositionRef.current = { x: 0, y: 0, size: 0 };
  }, []);

  return {
    isStable,
    stableFrameCount,
    checkStability,
    resetStability
  };
};
