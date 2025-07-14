
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

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
  return (
    <div className="flex flex-col gap-2 mt-[30px] w-full">
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
