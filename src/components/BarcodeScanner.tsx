import { useState } from "react";
import { useZxing } from "react-zxing";
import { ScannerOverlay } from "./scanner/ScannerOverlay";
import { ScannerError } from "./scanner/ScannerError";
import { ScannerResult } from "./scanner/ScannerResult";
import { ScannerControls } from "./scanner/ScannerControls";
import { ScannerCamera } from "./scanner/ScannerCamera";
import { ScannerContainer } from "./scanner/ScannerContainer";
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
  });

  const handleConfirm = () => {
    if (lastScannedCode) {
      onResult(lastScannedCode);
    }
  };

  return (
    <ScannerContainer>
      <ScannerCamera 
        ref={ref}
        hasPermission={hasPermission}
        onPermissionDenied={() => setHasPermission(false)}
      />
      <ScannerOverlay />
      <ScannerError error={error} />
      <ScannerResult code={lastScannedCode} />
      <ScannerControls 
        onClose={onClose}
        onConfirm={handleConfirm}
        showConfirm={!!lastScannedCode}
      />
    </ScannerContainer>
  );
}