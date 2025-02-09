
import { useState, useEffect } from 'react';

interface VideoConstraints {
  width: number;
  height: number;
  facingMode: "user" | "environment";
}

export const useCameraManagement = (forceEnvironment?: boolean) => {
  const [facingMode, setFacingMode] = useState<"user" | "environment">(forceEnvironment ? "environment" : "user");
  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    const getDevices = async () => {
      try {
        // Request camera permission first
        await navigator.mediaDevices.getUserMedia({ video: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setAvailableDevices(videoDevices);
      } catch (error) {
        console.error('Error getting video devices:', error);
      }
    };

    getDevices();
  }, []);

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
    facingMode,
    availableDevices
  };
};
