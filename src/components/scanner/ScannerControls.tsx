import { Button } from "@/components/ui/button";
import { beepSound } from "@/utils/beepSound";

interface ScannerControlsProps {
  onClose: () => void;
  onConfirm: () => void;
  showConfirm: boolean;
}

export function ScannerControls({ onClose, onConfirm, showConfirm }: ScannerControlsProps) {
  const handleButtonClick = async (action: () => void) => {
    try {
      beepSound.play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
    action();
  };

  return (
    <div className="flex justify-between p-4">
      <Button 
        variant="outline"
        onClick={() => handleButtonClick(onClose)}
      >
        Fechar
      </Button>
      {showConfirm && (
        <Button 
          onClick={() => handleButtonClick(onConfirm)}
          className="bg-[#8425af] hover:bg-[#6c1e8f]"
        >
          Confirmar
        </Button>
      )}
    </div>
  );
}