import { useEffect, useState, useRef } from "react";
import { useZxing } from "react-zxing";
import { Button } from "./ui/button";

interface BarcodeScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { ref } = useZxing({
    onDecodeResult(result) {
      const text = result.getText();
      // Aceita códigos com 20 dígitos que começam com 8955
      if (text.length === 20 && text.startsWith('8955')) {
        console.log("Código válido detectado:", text);
        setLastScannedCode(text);
        // Toca o som de bip
        if (audioRef.current) {
          audioRef.current.play().catch(error => {
            console.error("Erro ao tocar o som:", error);
          });
        }
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
        width: { ideal: 1280 },
        height: { ideal: 720 }
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
            width: { ideal: 1280 },
            height: { ideal: 720 }
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
      <audio ref={audioRef} src="/beep.mp3" />
      <div className="bg-white p-4 rounded-lg w-[90%] max-w-[400px] mx-auto">
        {hasPermission === false ? (
          <div className="text-center text-red-500 p-4">
            {error || "Por favor, permita o acesso à câmera para escanear o código."}
          </div>
        ) : (
          <>
            <div className="relative aspect-[4/3]">
              <video 
                ref={ref} 
                className="absolute inset-0 w-full h-full object-cover rounded"
                autoPlay
                playsInline
              />
              <div className="absolute inset-0 border-[3px] border-[#8425af] rounded-lg pointer-events-none">
                {/* Linha de escaneamento vermelha animada */}
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-red-500/70 animate-[scan_2s_ease-in-out_infinite]" />
                {/* Linhas verticais roxas */}
                <div className="absolute inset-y-0 left-1/4 w-0.5 bg-[#8425af]/30" />
                <div className="absolute inset-y-0 right-1/4 w-0.5 bg-[#8425af]/30" />
              </div>
            </div>
            {error && (
              <div className="mt-2 text-sm text-red-500 text-center">
                {error}
              </div>
            )}
            {lastScannedCode && (
              <div className="mt-4 p-3 bg-gray-50 rounded">
                <p className="text-sm font-medium text-gray-700">Código escaneado:</p>
                <p className="text-sm font-mono">{lastScannedCode}</p>
              </div>
            )}
            <div className="mt-4 text-center space-y-2">
              <p className="text-sm text-gray-600">
                Posicione o código de barras do chip dentro da área
              </p>
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
                >
                  Cancelar
                </Button>
                {lastScannedCode && (
                  <Button
                    onClick={handleConfirm}
                    className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
                  >
                    Confirmar
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}