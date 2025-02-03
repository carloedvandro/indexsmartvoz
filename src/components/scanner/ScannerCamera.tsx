import React, { useEffect } from 'react';
import { useZxing } from "react-zxing";
import { beepSound } from "../../utils/beepSound";

interface ScannerCameraProps {
  onValidCode: (code: string) => void;
  onError: (error: string) => void;
}

export function ScannerCamera({ onValidCode, onError }: ScannerCameraProps) {
  const { ref } = useZxing({
    onDecodeResult(result) {
      const text = result.getText();
      if (text.length === 20 && text.startsWith('8955')) {
        console.log("Código válido detectado:", text);
        onValidCode(text);
        beepSound.play().catch(err => console.error("Erro ao tocar som:", err));
      } else {
        console.log("Código inválido detectado:", text);
        onError("Código inválido. O código deve ter 20 dígitos e começar com 8955.");
      }
    },
    onError(error) {
      console.error("Scanner error:", error);
      onError("Erro ao ler o código. Por favor, tente novamente.");
    },
    constraints: {
      video: {
        facingMode: "environment",
        width: { ideal: 240 },
        height: { ideal: 740 }
      }
    },
    timeBetweenDecodingAttempts: 500,
  });

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: "environment",
            width: { ideal: 240 },
            height: { ideal: 740 }
          } 
        });
        
        if (ref.current) {
          ref.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        onError("Permissão da câmera negada. Por favor, permita o acesso à câmera.");
      }
    }

    setupCamera();

    return () => {
      if (ref.current?.srcObject) {
        const stream = ref.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <video 
      ref={ref} 
      className="w-full h-[10vh] object-cover"
      autoPlay
      playsInline
    />
  );
}