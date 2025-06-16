
import { RefObject } from "react";
import { useFaceDetectionState } from "./hooks/useFaceDetectionState";
import { useFaceDetectionInterval } from "./hooks/useFaceDetectionInterval";

interface UseFaceDetectionProps {
  webcamRef: RefObject<any>;
  isEnabled?: boolean;
  isActive?: boolean;
}

export const useFaceDetection = (
  webcamRef: RefObject<any>,
  isEnabled = true,
  isActive = true
) => {
  const {
    faceDetected,
    facePosition,
    faceProximity,
    lightingQuality,
    updateFaceDetection
  } = useFaceDetectionState();

  useFaceDetectionInterval({
    webcamRef,
    isActive: isEnabled && isActive,
    onDetectionResult: updateFaceDetection
  });

  return {
    faceDetected,
    facePosition,
    faceProximity,
    lightingQuality
  };
};
