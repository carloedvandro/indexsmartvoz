
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
    <div className="flex justify-between gap-4 mt-6 max-w-[365px] mx-auto w-full">
      <Button 
        variant="outline"
        className="border-[#5f0889] text-[#5f0889] hover:bg-[#5f0889] hover:text-white flex-1"
        onClick={() => currentStep === 1 ? navigate("/client/dashboard") : handleBack()}
      >
        Voltar
      </Button>
      <Button 
        className="bg-[#5f0889] hover:bg-[#5f0889]/90 text-white flex-1"
        onClick={handleContinue}
        disabled={disabled}
      >
        {currentStep === 3 ? 'Continuar' : 'Continuar'}
      </Button>
    </div>
  );
}
