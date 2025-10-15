
import { useState, useEffect } from 'react';

interface VideoConstraints {
  width: number;
  height: number;
  facingMode: string; // Mudando para string para compatibilidade
}

export const useCameraManagement = (forceEnvironment?: boolean) => {
  const [facingMode, setFacingMode] = useState<"user" | "environment">(forceEnvironment ? "environment" : "user");
  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([]);
  const [hasBackCamera, setHasBackCamera] = useState(false);

  useEffect(() => {
    const getDevices = async () => {
      try {
        // First try to get access with environment camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" }
          }
        });
        
        // Stop the stream immediately after checking
        stream.getTracks().forEach(track => track.stop());
        
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        // Check if we have a back camera
        const hasBack = videoDevices.some(device => 
          device.label.toLowerCase().includes('back') ||
          device.label.toLowerCase().includes('traseira') ||
          device.label.toLowerCase().includes('environment')
        );
        
        setHasBackCamera(hasBack);
        setAvailableDevices(videoDevices);
        
        if (hasBack) {
          setFacingMode("environment");
        }
      } catch (error) {
        console.error('Error getting video devices:', error);
        // Fallback to any camera if environment fails
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
          fallbackStream.getTracks().forEach(track => track.stop());
        } catch (fallbackError) {
          console.error('Fallback camera access failed:', fallbackError);
        }
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
    facingMode: hasBackCamera ? "environment" : facingMode // Usando string diretamente ao invés de objeto
  };

  return {
    videoConstraints,
    toggleCamera,
    facingMode,
    availableDevices,
    hasBackCamera
  };
};
