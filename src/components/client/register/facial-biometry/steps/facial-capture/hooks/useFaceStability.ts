
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
    if (!faceDetected || faceProximity !== "ideal") {
      setIsStable(false);
      setStableFrameCount(0);
      consecutiveStableRef.current = 0;
      return false;
    }

    const lastPos = lastPositionRef.current;
    const currentPos = facePosition;

    // Se é a primeira detecção, considerar estável
    if (lastPos.x === 0 && lastPos.y === 0) {
      lastPositionRef.current = currentPos;
      consecutiveStableRef.current = 1;
      setStableFrameCount(1);
      setIsStable(true);
      return true;
    }

    // Calcular diferença de posição com threshold mais permissivo
    const positionDiff = Math.sqrt(
      Math.pow(currentPos.x - lastPos.x, 2) + 
      Math.pow(currentPos.y - lastPos.y, 2)
    );

    const sizeDiff = Math.abs(currentPos.size - lastPos.size);

    // Verificar se está estável com threshold mais permissivo
    const isCurrentlyStable = positionDiff < CAPTURE_CONFIG.FACE_STABILITY_THRESHOLD &&
                             sizeDiff < 0.03; // Threshold de tamanho mais permissivo

    if (isCurrentlyStable) {
      consecutiveStableRef.current += 1;
      setStableFrameCount(consecutiveStableRef.current);
      
      const shouldBeStable = consecutiveStableRef.current >= CAPTURE_CONFIG.REQUIRED_STABLE_FRAMES;
      setIsStable(shouldBeStable);
    } else {
      // Não resetar imediatamente, dar uma tolerância
      consecutiveStableRef.current = Math.max(0, consecutiveStableRef.current - 1);
      setStableFrameCount(consecutiveStableRef.current);
      
      const shouldBeStable = consecutiveStableRef.current >= CAPTURE_CONFIG.REQUIRED_STABLE_FRAMES;
      setIsStable(shouldBeStable);
    }

    // Atualizar última posição
    lastPositionRef.current = currentPos;

    return isStable;
  }, [faceDetected, faceProximity, facePosition, isStable]);

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
