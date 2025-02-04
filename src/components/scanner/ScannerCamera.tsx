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
    timeBetweenDecodingAttempts: 1000, // Reduzido para melhor resposta
    constraints: {
      video: {
        facingMode: "environment",
        width: { ideal: 1280 }, // Aumentado para melhor qualidade
        height: { ideal: 720 },
        aspectRatio: 1.777778,
      },
    },
    hints: {
      tryHarder: true, // Tenta mais intensamente ler o código
      assumeCode39CheckDigit: true,
      possibleFormats: ["CODE_128", "EAN_13", "EAN_8"], // Formatos comuns de códigos de barra
    },
  });

  return (
    <video 
      ref={ref} 
      className="w-full h-full object-cover" 
    />
  );
}