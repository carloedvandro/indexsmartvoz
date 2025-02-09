
import { useState } from 'react';

interface VideoConstraints {
  width: number;
  height: number;
  facingMode: "user" | "environment";
}

export const useCameraManagement = () => {
  const videoConstraints: VideoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return {
    videoConstraints
  };
};
