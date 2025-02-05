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

  const { ref } = useZxing({
    onDecodeResult: (result) => {
      const code = result.getText();
      console.log("Código detectado:", code);
      
      if (code.length >= 18 && code.length <= 22) {
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
    onError: (error) => {
      if (!error.toString().includes("No MultiFormat Readers were able to detect")) {
        console.error("Erro de leitura:", error);
        onError("Erro ao ler o código. Por favor, tente novamente.");
      }
    },
    timeBetweenDecodingAttempts: 50, // Reduzido para 50ms para captura mais rápida
    constraints: {
      video: {
        facingMode: "environment",
        width: { ideal: 1280 },
        height: { ideal: 720 },
        frameRate: { ideal: 60 } // Aumentado para 60fps para melhor resposta
      }
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