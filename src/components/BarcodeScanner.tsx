import { useEffect, useState } from "react";
import { useZxing } from "react-zxing";

interface BarcodeScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { ref } = useZxing({
    onDecodeResult(result) {
      const text = result.getText();
      // Só aceita códigos com 20 dígitos que começam com 8955
      if (text.length === 20 && text.startsWith('8955')) {
        onResult(text);
        onClose();
      } else {
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
    timeBetweenDecodingAttempts: 300,
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
      if (ref.current) {
        const stream = ref.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-[90%] max-w-[400px] mx-auto"> {/* Increased max-width */}
        {hasPermission === false ? (
          <div className="text-center text-red-500 p-4">
            {error || "Por favor, permita o acesso à câmera para escanear o código."}
          </div>
        ) : (
          <>
            <div className="relative aspect-[2/1]"> {/* Changed aspect ratio to be wider */}
              <video 
                ref={ref} 
                className="absolute inset-0 w-full h-full object-cover rounded"
                autoPlay
                playsInline
              />
              <div className="absolute inset-0 border-2 border-[#8425af] rounded pointer-events-none">
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#8425af]/30" />
                <div className="absolute inset-y-0 left-1/6 w-0.5 bg-[#8425af]/30" /> {/* Adjusted guide lines */}
                <div className="absolute inset-y-0 right-1/6 w-0.5 bg-[#8425af]/30" /> {/* Adjusted guide lines */}
              </div>
            </div>
            {error && (
              <div className="mt-2 text-sm text-red-500 text-center">
                {error}
              </div>
            )}
            <div className="mt-4 text-center space-y-2">
              <p className="text-sm text-gray-600">
                Posicione o código de barras do chip dentro da área
              </p>
              <button
                onClick={onClose}
                className="text-[#8425af] font-medium"
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}