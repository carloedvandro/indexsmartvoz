
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NavigationButtonsProps {
  currentStep: number;
  handleBack: () => void;
  handleContinue: () => void;
  disabled?: boolean;
}

export function NavigationButtons({ 
  currentStep, 
  handleBack, 
  handleContinue,
  disabled = false
}: NavigationButtonsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between gap-4 mt-6">
      <Button 
        variant="outline"
        className="flex-1 border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white rounded-md"
        onClick={() => currentStep === 1 ? navigate("/client/dashboard") : handleBack()}
      >
        Voltar
      </Button>
      <Button 
        className="flex-1 bg-[#8425af] hover:bg-[#6c1e8f] text-white rounded-md"
        onClick={handleContinue}
        disabled={disabled}
      >
        {currentStep === 3 ? 'Continuar' : 'Continuar'}
      </Button>
    </div>
  );
}
