import { Button } from "../ui/button";

interface ScannerControlsProps {
  onClose: () => void;
}

export function ScannerControls({ onClose }: ScannerControlsProps) {
  return (
    <div className="mt-4 text-center space-y-2">
      <p className="text-sm text-gray-600">
        Posicione o código de barras do chip dentro da área
      </p>
      <Button
        variant="outline"
        onClick={onClose}
        className="mt-2 border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
      >
        Cancelar
      </Button>
    </div>
  );
}