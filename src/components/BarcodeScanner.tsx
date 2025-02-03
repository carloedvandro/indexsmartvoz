import { useState } from "react";
import { ScannerContainer } from "./scanner/ScannerContainer";

interface BarcodeScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setTimeout(() => setError(null), 3000);
  };

  const handleValidCode = (code: string) => {
    setLastScannedCode(code);
  };

  if (!showCamera) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="w-full max-w-[380px] mx-auto bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-center">Ler código do chip</h3>
          <p className="text-sm text-gray-600 text-center mb-6">
            Clique no botão abaixo para iniciar a leitura do código do chip
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={() => setShowCamera(true)}
              className="bg-[#8425af] hover:bg-[#6c1e8f] text-white px-4 py-2 rounded"
            >
              Iniciar leitura
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {hasPermission === false ? (
        <div className="text-center text-red-500 p-4">
          {error || "Por favor, permita o acesso à câmera para escanear o código."}
        </div>
      ) : (
        <ScannerContainer
          onResult={onResult}
          onClose={onClose}
          error={error}
          lastScannedCode={lastScannedCode}
          onValidCode={handleValidCode}
          onError={handleError}
        />
      )}
    </div>
  );
}