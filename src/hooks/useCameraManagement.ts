
import { useState, useEffect } from 'react';

interface VideoConstraints {
  width: number;
  height: number;
  facingMode: string;
}

export const useCameraManagement = (forceEnvironment?: boolean) => {
  const [facingMode, setFacingMode] = useState<"user" | "environment">(forceEnvironment ? "environment" : "user");
  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([]);
  const [hasBackCamera, setHasBackCamera] = useState(false);

  useEffect(() => {
    const getDevices = async () => {
      try {
        console.log("🔍 Verificando dispositivos de câmera disponíveis...");
        
        // Primeiro solicita permissão básica
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          stream.getTracks().forEach(track => track.stop());
          console.log("✅ Permissão básica de câmera obtida");
        } catch (permissionError) {
          console.log("⚠️ Permissão básica de câmera não obtida:", permissionError);
        }
        
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        console.log("📹 Dispositivos de vídeo encontrados:", videoDevices.map(d => ({
          deviceId: d.deviceId,
          label: d.label,
          kind: d.kind
        })));
        
        // Verificar se existe câmera traseira
        const hasBack = videoDevices.some(device => 
          device.label.toLowerCase().includes('back') ||
          device.label.toLowerCase().includes('traseira') ||
          device.label.toLowerCase().includes('environment') ||
          device.label.toLowerCase().includes('rear')
        );
        
        setHasBackCamera(hasBack || videoDevices.length > 1); // Se tem mais de 1 câmera, assume que uma é traseira
        setAvailableDevices(videoDevices);
        
        console.log("📱 Câmera traseira disponível:", hasBack);
        
        if (forceEnvironment && hasBack) {
          setFacingMode("environment");
        }
      } catch (error) {
        console.error('❌ Erro ao verificar dispositivos de câmera:', error);
      }
    };

    getDevices();
  }, [forceEnvironment]);

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
    availableDevices,
    hasBackCamera
  };
};
