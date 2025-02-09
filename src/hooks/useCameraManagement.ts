
import { useState, useCallback } from 'react';

interface VideoConstraints {
  width: number;
  height: number;
  facingMode: "user" | "environment";
}

export const useCameraManagement = () => {
  const [isFacingUser, setIsFacingUser] = useState(true);

  const videoConstraints: VideoConstraints = {
    width: 1280,
    height: 720,
    facingMode: isFacingUser ? "user" : "environment"
  };

  const toggleCamera = useCallback(() => {
    setIsFacingUser(prev => !prev);
  }, []);

  return {
    isFacingUser,
    videoConstraints,
    toggleCamera
  };
};
