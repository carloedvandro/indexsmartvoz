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
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.CODABAR
  ]);

  // Configurações otimizadas para melhor leitura
  hints.set(DecodeHintType.TRY_HARDER, true);
  hints.set(DecodeHintType.CHARACTER_SET, "UTF-8");
  hints.set(DecodeHintType.PURE_BARCODE, false);
  hints.set(DecodeHintType.ASSUME_CODE_39_CHECK_DIGIT, true);

  const { ref } = useZxing({
    onDecodeResult: (result) => {
      const code = result.getText();
      console.log("Tentando ler código:", code);
      
      // Validação mais flexível do código
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
      // Verificação de tipo segura para o erro
      const errorMessage = error instanceof Error 
        ? error.message
        : typeof error === 'string' 
          ? error 
          : "Erro ao ler o código. Por favor, tente novamente.";

      // Só logar erros reais, não tentativas de leitura
      if (!errorMessage.includes("No MultiFormat Readers were able to detect")) {
        console.error("Erro de leitura:", errorMessage);
        onError(errorMessage);
      }
    },
    timeBetweenDecodingAttempts: 150,
    constraints: {
      video: {
        facingMode: "environment",
        width: { min: 480, ideal: 1080, max: 1920 },
        height: { min: 360, ideal: 720, max: 1080 },
        aspectRatio: 1.777778,
        frameRate: { min: 15, ideal: 30, max: 60 }
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