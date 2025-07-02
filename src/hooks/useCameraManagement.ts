
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
    const checkCameraDevices = async () => {
      try {
        console.log("🔍 Verificando dispositivos de câmera...");
        
        // Primeiro, tentar obter permissão básica
        let permissionGranted = false;
        try {
          const testStream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 320, height: 240 } 
          });
          testStream.getTracks().forEach(track => track.stop());
          permissionGranted = true;
          console.log("✅ Permissão de câmera obtida");
        } catch (permissionError) {
          console.log("⚠️ Permissão de câmera não obtida ainda:", permissionError);
        }
        
        // Listar dispositivos disponíveis
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        console.log("📹 Dispositivos de vídeo encontrados:", videoDevices.length);
        videoDevices.forEach((device, index) => {
          console.log(`📹 Dispositivo ${index + 1}:`, {
            deviceId: device.deviceId,
            label: device.label || 'Câmera sem nome',
            kind: device.kind
          });
        });
        
        // Detectar câmera traseira de forma mais robusta
        const hasBackCameraDetected = videoDevices.some(device => {
          const label = device.label.toLowerCase();
          return (
            label.includes('back') ||
            label.includes('traseira') ||
            label.includes('environment') ||
            label.includes('rear') ||
            label.includes('facing back') ||
            label.includes('camera2 0') || // Padrão Android
            label.includes('0x0') // Outro padrão comum
          );
        }) || videoDevices.length > 1; // Se tem mais de 1, assume que uma é traseira
        
        setHasBackCamera(hasBackCameraDetected);
        setAvailableDevices(videoDevices);
        
        console.log("📱 Resultado da detecção:", {
          totalCameras: videoDevices.length,
          hasBackCamera: hasBackCameraDetected,
          permissionGranted
        });
        
        // Se foi forçado environment e tem câmera traseira, usar ela
        if (forceEnvironment && hasBackCameraDetected) {
          setFacingMode("environment");
          console.log("🔄 Câmera definida para environment (traseira)");
        }
        
      } catch (error) {
        console.error('❌ Erro ao verificar dispositivos de câmera:', error);
        // Em caso de erro, assumir que pelo menos uma câmera existe
        setHasBackCamera(true);
      }
    };

    // Só executar se navigator.mediaDevices existir
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      checkCameraDevices();
    } else {
      console.warn("⚠️ navigator.mediaDevices não disponível");
    }
  }, [forceEnvironment]);

  const toggleCamera = () => {
    const newMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newMode);
    console.log("🔄 Câmera alterada para:", newMode);
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
