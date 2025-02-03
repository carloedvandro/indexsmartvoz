import { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { ScannerOverlay } from "./scanner/ScannerOverlay";
import { ScannerError } from "./scanner/ScannerError";
import { ScannerResult } from "./scanner/ScannerResult";
import { ScannerControls } from "./scanner/ScannerControls";
import { beepSound } from "../utils/beepSound";

interface BarcodeScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);

  const { ref } = useZxing({
    onDecodeResult(result) {
      const text = result.getText();
      if (text.length === 20 && text.startsWith('8955')) {
        console.log("Código válido detectado:", text);
        setLastScannedCode(text);
        // Tocar o som de beep quando um código válido é detectado
        beepSound.play().catch(err => console.error("Erro ao tocar som:", err));
      } else {
        console.log("Código inválido detectado:", text);
        setError("Código inválido. O código deve ter 20 dígitos e começar com 8955.");
        setTimeout(() => setError(null), 3000);
      }
    },
    onError(error) {
      console.error("Scanner error:", error);
      setError("Erro ao ler o código. Por favor, tente novamente.");
      setTimeout(() => setError(null), 3000);
    },
    constraints: {
      video: {
        facingMode: "environment",
        width: { ideal: 240 },
        height: { ideal: 740 }
      }
    },
    timeBetweenDecodingAttempts: 500,
    // Definir a área de escaneamento para corresponder ao tamanho do vídeo
    viewfinderWidth: 240,
    viewfinderHeight: 740,
    // Centralizar a área de escaneamento
    viewfinderBorderWidth: 2,
    viewfinderBorderLength: 20,
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
        
        setHasPermission(true);
      } catch (err) {
        console.error("Camera error:", err);
        setHasPermission(false);
        setError("Permissão da câmera negada. Por favor, permita o acesso à câmera.");
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

  const handleConfirm = () => {
    if (lastScannedCode) {
      onResult(lastScannedCode);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-[420px] mx-auto">
        {hasPermission === false ? (
          <div className="text-center text-red-500 p-4">
            {error || "Por favor, permita o acesso à câmera para escanear o código."}
          </div>
        ) : (
          <>
            <div className="relative h-[30vh] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <video 
                  ref={ref} 
                  className="w-full h-[10vh] object-cover"
                  autoPlay
                  playsInline
                />
              </div>
              <ScannerOverlay />
            </div>
            
            <ScannerError error={error} />
            <ScannerResult code={lastScannedCode} />
            <ScannerControls 
              onClose={onClose}
              onConfirm={handleConfirm}
              showConfirm={!!lastScannedCode}
            />
          </>
        )}
      </div>
    </div>
  );
}