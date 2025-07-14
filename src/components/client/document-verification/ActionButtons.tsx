
import { Button } from "@/components/ui/button";
import { RotateCcw, Play } from "lucide-react";

interface ActionButtonsProps {
  onCapture: () => void;
  onTryAgain: () => void;
  isProcessing: boolean;
  cameraActive: boolean;
  videoReady: boolean;
  cameraError: string | null;
}

export const ActionButtons = ({
  onCapture,
  onTryAgain,
  isProcessing,
  cameraActive,
  videoReady,
  cameraError
}: ActionButtonsProps) => {
  const handleManualPlay = () => {
    const video = document.querySelector('video');
    if (video) {
      console.log("🎬 Tentativa manual de reprodução do vídeo");
      video.play().then(() => {
        console.log("✅ Reprodução manual bem-sucedida");
      }).catch((error) => {
        console.error("❌ Falha na reprodução manual:", error);
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-[30px] w-full">
      {cameraActive && !videoReady && cameraError === "Interação necessária para ativar câmera" && (
        <Button
          onClick={handleManualPlay}
          className="px-4 py-4 bg-green-600 hover:bg-green-700 text-white"
        >
          <Play className="h-4 w-4 mr-2" />
          Ativar Câmera
        </Button>
      )}

      <Button
        onClick={onCapture}
        disabled={isProcessing || !cameraActive || !videoReady}
        className="px-4 py-4 bg-transparent backdrop-blur-sm border border-white/30 shadow-lg text-white hover:bg-white/20"
      >
        {isProcessing ? "Processando..." : "Escanear documento"}
      </Button>

      {(cameraError || !cameraActive) && (
        <Button
          onClick={onTryAgain}
          variant="outline"
          className="px-4 py-2 bg-white/10 border border-white/30 text-white hover:bg-white/20"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Tentar novamente
        </Button>
      )}
    </div>
  );
};
