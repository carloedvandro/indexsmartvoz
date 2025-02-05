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
  // Configurando apenas os formatos mais comuns para códigos de 20 dígitos
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_13,
    BarcodeFormat.ITF,
    BarcodeFormat.CODE_39
  ]);

  hints.set(DecodeHintType.TRY_HARDER, true);
  hints.set(DecodeHintType.ASSUME_GS1, true);

  const { ref } = useZxing({
    onDecodeResult: (result) => {
      const code = result.getText();
      console.log("Código detectado:", code);
      
      // Validação específica para códigos de 20 dígitos
      if (code && code.length === 20) {
        console.log("Código válido de 20 dígitos encontrado:", code);
        beepSound.play();
        onValidCode(code);
      } else {
        console.log("Código inválido - comprimento incorreto:", code.length);
        onError("Código inválido. O código deve ter 20 dígitos.");
      }
    },
    onError: (error) => {
      if (!error.toString().includes("No MultiFormat Readers were able to detect")) {
        console.error("Erro de leitura:", error);
        onError("Erro ao ler o código. Por favor, tente novamente.");
      }
    },
    timeBetweenDecodingAttempts: 300,
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