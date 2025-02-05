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
    BarcodeFormat.CODE_39,
    BarcodeFormat.ITF,
  ]);

  hints.set(DecodeHintType.TRY_HARDER, true);
  hints.set(DecodeHintType.ASSUME_GS1, true);
  hints.set(DecodeHintType.PURE_BARCODE, true);
  hints.set(DecodeHintType.RETURN_CODABAR_START_END, true);

  const { ref } = useZxing({
    onDecodeResult: (result) => {
      const code = result.getText();
      console.log("Tentativa de leitura - código detectado:", code);
      
      if (code && code.length === 20) {
        console.log("Código válido de 20 dígitos encontrado:", code);
        beepSound.play().catch(console.error);
        onValidCode(code);
      } else {
        console.log("Código inválido - comprimento incorreto:", code.length);
        onError(`Código inválido. O código deve ter 20 dígitos. Detectado: ${code.length} dígitos`);
      }
    },
    onError: (error) => {
      if (!error.toString().includes("No MultiFormat Readers were able to detect")) {
        console.error("Erro de leitura:", error);
        onError("Erro ao ler o código. Por favor, tente novamente.");
      }
    },
    timeBetweenDecodingAttempts: 200,
    constraints: {
      video: {
        facingMode: "environment",
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
        aspectRatio: { ideal: 1.7777777778 },
        frameRate: { ideal: 30 }
      }
    },
    hints
  });

  useEffect(() => {
    return () => {
      if (ref.current) {
        const stream = ref.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => {
            track.stop();
            console.log("Stream da câmera encerrado");
          });
        }
      }
    };
  }, []);

  return (
    <video 
      ref={ref} 
      className="w-full h-full object-cover opacity-0"
    />
  );
}