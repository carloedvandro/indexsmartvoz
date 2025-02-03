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
        // Inicia o beep contínuo
        beepSound.play().catch(err => console.error("Erro ao tocar som:", err));
      } else {
        console.log("Código inválido detectado:", text);
        setError("Código inválido. O código deve ter 20 dígitos e começar com 8955.");
        setTimeout(() => setError(null), 3000);
        // Para o beep se um código inválido for detectado
        beepSound.pause();
        beepSound.currentTime = 0;
      }
    },
    onError(error) {
      console.error("Scanner error:", error);
      setError("Erro ao ler o código. Por favor, tente novamente.");
      setTimeout(() => setError(null), 3000);
      // Para o beep em caso de erro
      beepSound.pause();
      beepSound.currentTime = 0;
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
      // Para o beep quando confirmar
      beepSound.pause();
      beepSound.currentTime = 0;
      onResult(lastScannedCode);
    }
  };

  const handleClose = () => {
    // Para o beep quando fechar
    beepSound.pause();
    beepSound.currentTime = 0;
    onClose();
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
        onClose={handleClose}
        onConfirm={handleConfirm}
        showConfirm={!!lastScannedCode}
      />
    </ScannerContainer>
  );
}