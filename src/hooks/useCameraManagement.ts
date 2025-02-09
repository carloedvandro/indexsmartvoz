
import { useState } from 'react';

interface VideoConstraints {
  width: number;
  height: number;
  facingMode: "user" | "environment";
}

export const useCameraManagement = (forceEnvironment?: boolean) => {
  const [facingMode, setFacingMode] = useState<"user" | "environment">(forceEnvironment ? "environment" : "user");

  const toggleCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  const videoConstraints: VideoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facingMode
  };

  return {
    videoConstraints,
    toggleCamera,
    facingMode
  };
};
