import { useZxing } from "react-zxing";
import { beepSound } from "@/utils/beepSound";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";

interface ScannerCameraProps {
  onValidCode: (code: string) => void;
  onError: (error: string) => void;
}

export function ScannerCamera({ onValidCode, onError }: ScannerCameraProps) {
  const hints = new Map();
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.CODE_128, BarcodeFormat.EAN_13, BarcodeFormat.EAN_8]);
  hints.set(DecodeHintType.TRY_HARDER, true);
  hints.set(DecodeHintType.CHARACTER_SET, "UTF-8");
  hints.set(DecodeHintType.ASSUME_CODE_39_CHECK_DIGIT, true);
  hints.set(DecodeHintType.PURE_BARCODE, true);

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
    timeBetweenDecodingAttempts: 200,
    constraints: {
      video: {
        facingMode: "environment",
        width: { ideal: 1280 },
        height: { ideal: 720 },
        aspectRatio: 1.777778,
        frameRate: { ideal: 30, max: 60 }
      },
    },
    hints
  });

  return (
    <video 
      ref={ref} 
      className="w-full h-full object-cover"
    />
  );
}