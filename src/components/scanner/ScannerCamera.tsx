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
    BarcodeFormat.CODABAR,
    BarcodeFormat.ITF // Added ITF format for better industrial barcode support
  ]);

  hints.set(DecodeHintType.TRY_HARDER, true);
  hints.set(DecodeHintType.CHARACTER_SET, "UTF-8");
  hints.set(DecodeHintType.PURE_BARCODE, true); // Changed to true for better barcode focus
  hints.set(DecodeHintType.ASSUME_CODE_39_CHECK_DIGIT, true); // Added for better check digit handling
  hints.set(DecodeHintType.RELAXED_CODE_39_EXTENDED, true); // Added for more flexible Code 39 reading

  const { ref } = useZxing({
    onDecodeResult: (result) => {
      const code = result.getText();
      console.log("Código detectado:", code);
      
      // Relaxed validation to test if the scanner is working
      if (code && code.length > 0) {
        console.log("Código válido encontrado:", code);
        beepSound.play();
        onValidCode(code);
      } else {
        onError("Código inválido. Tente novamente.");
      }
    },
    onError: (error) => {
      // Only log real errors, not normal scanning attempts
      if (!error.toString().includes("No MultiFormat Readers were able to detect")) {
        console.error("Erro de leitura:", error);
        onError("Erro ao ler o código. Por favor, tente novamente.");
      }
    },
    timeBetweenDecodingAttempts: 150, // Increased to reduce CPU usage and improve stability
    constraints: {
      video: {
        facingMode: "environment",
        width: { min: 640, ideal: 1280, max: 1920 }, // Adjusted for better performance
        height: { min: 480, ideal: 720, max: 1080 },
        frameRate: { ideal: 30 }, // Reduced to 30fps for better stability
        aspectRatio: 4/3 // Changed to 4:3 for better barcode capture
      }
    },
    hints
  });

  return (
    <video 
      ref={ref} 
      className="w-full h-full object-cover"
      style={{ transform: 'scaleX(-1)' }} // Mirror the video for better user experience
    />
  );
}