import { useZxing } from "react-zxing";
import { beepSound } from "@/utils/beepSound";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";

interface ScannerCameraProps {
  onValidCode: (code: string) => void;
  onError: (error: string) => void;
}

export function ScannerCamera({ onValidCode, onError }: ScannerCameraProps) {
  const hints = new Map();
  // Habilitando múltiplos formatos de código de barras para melhor detecção
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.DATA_MATRIX
  ]);
  hints.set(DecodeHintType.TRY_HARDER, true);
  hints.set(DecodeHintType.CHARACTER_SET, "UTF-8");
  hints.set(DecodeHintType.PURE_BARCODE, true);

  const { ref } = useZxing({
    onDecodeResult: (result) => {
      const code = result.getText();
      console.log("Tentando ler código:", code); // Debug log
      
      // Validação mais flexível do código
      if (code.length >= 19 && code.length <= 21) {
        console.log("Código com tamanho válido detectado:", code);
        if (code.includes("8955")) {
          console.log("Código válido encontrado:", code);
          beepSound.play();
          onValidCode(code);
        } else {
          onError("Código inválido. O código deve conter '8955'.");
        }
      } else {
        onError("Código inválido. O código deve ter entre 19 e 21 dígitos.");
      }
    },
    onError: (error) => {
      // Só logar erros reais, não tentativas de leitura
      if (error.message && !error.message.includes("No MultiFormat Readers were able to detect")) {
        console.error("Erro de leitura:", error);
        const errorMessage = error instanceof Error 
          ? error.message 
          : "Erro ao ler o código. Por favor, tente novamente.";
        onError(errorMessage);
      }
    },
    timeBetweenDecodingAttempts: 200, // Aumentado para dar mais tempo de processamento
    constraints: {
      video: {
        facingMode: "environment",
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
        aspectRatio: 1.777778,
        frameRate: { ideal: 30 }
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