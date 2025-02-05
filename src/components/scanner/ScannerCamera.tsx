import { useZxing } from "react-zxing";
import { beepSound } from "@/utils/beepSound";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";

interface ScannerCameraProps {
  onValidCode: (code: string) => void;
  onError: (error: string) => void;
}

export function ScannerCamera({ onValidCode, onError }: ScannerCameraProps) {
  const hints = new Map();
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.CODABAR
  ]);

  hints.set(DecodeHintType.TRY_HARDER, true);
  hints.set(DecodeHintType.CHARACTER_SET, "UTF-8");
  hints.set(DecodeHintType.PURE_BARCODE, false);
  hints.set(DecodeHintType.ASSUME_CODE_39_CHECK_DIGIT, true);

  const { ref } = useZxing({
    onDecodeResult: (result) => {
      const code = result.getText();
      console.log("Tentando ler código:", code);
      
      if (code.length >= 18 && code.length <= 22) {
        console.log("Código com tamanho válido detectado:", code);
        if (code.includes("8955")) {
          console.log("Código válido encontrado:", code);
          beepSound.play();
          onValidCode(code);
        } else {
          onError("Código inválido. O código deve conter '8955'.");
        }
      } else {
        onError("Código inválido. O código deve ter entre 18 e 22 dígitos.");
      }
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error 
        ? error.message
        : typeof error === 'string' 
          ? error 
          : "Erro ao ler o código. Por favor, tente novamente.";

      if (!errorMessage.includes("No MultiFormat Readers were able to detect")) {
        console.error("Erro de leitura:", errorMessage);
        onError(errorMessage);
      }
    },
    timeBetweenDecodingAttempts: 150,
    constraints: {
      video: {
        facingMode: "environment",
        width: { min: 1280, ideal: 1920, max: 3840 },
        height: { min: 720, ideal: 1080, max: 2160 },
        aspectRatio: 1.777778,
        frameRate: { min: 30, ideal: 60 }
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