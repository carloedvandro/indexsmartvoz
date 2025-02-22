
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NavigationButtonsProps {
  currentStep: number;
  handleBack: () => void;
  handleContinue: () => void;
}

export function NavigationButtons({ 
  currentStep, 
  handleBack, 
  handleContinue 
}: NavigationButtonsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mt-6">
      <Button 
        variant="outline"
        className="border-[#8425af]/80 text-[#8425af]/80 hover:bg-[#8425af]/80 hover:text-white"
        onClick={() => currentStep === 1 ? navigate("/client/dashboard") : handleBack()}
      >
        Voltar
      </Button>
      <Button 
        className="bg-[#8425af]/80 hover:bg-[#8425af]/90 text-white"
        onClick={handleContinue}
      >
        {currentStep === 3 ? 'Continuar' : 'Continuar'}
      </Button>
    </div>
  );
}
