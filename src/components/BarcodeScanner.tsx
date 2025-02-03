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

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setTimeout(() => setError(null), 3000);
  };

  const handleValidCode = (code: string) => {
    setLastScannedCode(code);
  };

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