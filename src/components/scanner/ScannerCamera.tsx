import { useZxing } from "react-zxing";
import { beepSound } from "@/utils/beepSound";
import { ScannerOverlay } from "./ScannerOverlay";
import { ScannerError } from "./ScannerError";

interface ScannerCameraProps {
  onResult: (result: string) => void;
  onError: (error: string) => void;
  isScanning: boolean;
}

export function ScannerCamera({ onResult, onError, isScanning }: ScannerCameraProps) {
  const hints = new Map([
    [2, true], // FORMAT_EAN_13
    [3, true], // FORMAT_EAN_8
    [4, true], // FORMAT_UPC_E
  ]);

  const { ref } = useZxing({
    paused: !isScanning,
    onResult(result) {
      beepSound.play();
      onResult(result.getText());
    },
    onError(error) {
      const errorMessage = error.message.includes("NotAllowedError")
        ? "Permissão de câmera negada. Por favor, permita o acesso à câmera."
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
      },
    },
    hints
  });

  return (
    <div className="relative w-full">
      <video
        ref={ref}
        className="w-full h-[400px] object-cover"
      />
      <ScannerOverlay />
      <ScannerError />
    </div>
  );
}