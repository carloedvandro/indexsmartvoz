import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NavigationButtonsProps {
  handleBack: () => void;
  handleContinue: () => void;
  disabled?: boolean;
}

export function NavigationButtons({
  handleBack,
  handleContinue,
  disabled = false,
}: NavigationButtonsProps) {

  return (
    <div className="flex justify-between gap-4 mt-6">
      <Button
        variant="outline"
        className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white flex-1"
        onClick={handleBack}
      >
        Voltar
      </Button>
      <Button
        className="bg-[#8425af] hover:bg-[#8425af]/90 text-white flex-1"
        onClick={handleContinue}
        disabled={disabled}
      >
        Continuar
      </Button>
    </div>
  );
}
