import { useEffect } from "react";
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
    BarcodeFormat.ITF
  ]);

  hints.set(DecodeHintType.TRY_HARDER, true);

  const { ref } = useZxing({
    onDecodeResult: (result) => {
      const code = result.getText();
      console.log("Código detectado:", code);
      
      if (code && code.length > 0) {
        console.log("Código válido encontrado:", code);
        beepSound.play();
        onValidCode(code);
      } else {
        onError("Código inválido. Tente novamente.");
      }
    },
    onError: (error) => {
      if (!error.toString().includes("No MultiFormat Readers were able to detect")) {
        console.error("Erro de leitura:", error);
        onError("Erro ao ler o código. Por favor, tente novamente.");
      }
    },
    timeBetweenDecodingAttempts: 500,
    constraints: {
      video: {
        facingMode: "environment",
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 }
      }
    },
    hints
  });

  useEffect(() => {
    return () => {
      if (ref.current) {
        const stream = ref.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      }
    };
  }, []);

  return (
    <video 
      ref={ref} 
      className="w-full h-full object-cover"
    />
  );
}