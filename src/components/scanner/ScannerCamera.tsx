import { useZxing } from "react-zxing";
import { beepSound } from "@/utils/beepSound";

interface ScannerCameraProps {
  onValidCode: (code: string) => void;
  onError: (error: string) => void;
}

export function ScannerCamera({ onValidCode, onError }: ScannerCameraProps) {
  const { ref } = useZxing({
    onDecodeResult: (result) => {
      const code = result.getText();
      if (code.length === 20 && code.startsWith("8955")) {
        beepSound.play();
        onValidCode(code);
      } else {
        onError("Código inválido. O código deve começar com 8955 e ter 20 dígitos.");
      }
    },
    onError: (error) => {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Erro ao ler o código. Por favor, tente novamente.";
      onError(errorMessage);
    },
    timeBetweenDecodingAttempts: 3000,
    constraints: {
      video: {
        facingMode: "environment",
        aspectRatio: 1,
        width: { ideal: 340 },
        height: { ideal: 340 }
      },
    },
  });

  return (
    <video 
      ref={ref} 
      className="w-full h-full object-cover transform-gpu" 
      style={{ transform: 'scaleX(-1)' }}
    />
  );
}