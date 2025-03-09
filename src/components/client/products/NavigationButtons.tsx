
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
        className="border-[#5f0889] text-[#5f0889] hover:bg-[#5f0889] hover:text-white w-full mr-2"
        onClick={() => currentStep === 1 ? navigate("/client/dashboard") : handleBack()}
      >
        Voltar
      </Button>
      <Button 
        className="bg-[#5f0889] hover:bg-[#5f0889]/90 text-white w-full ml-2"
        onClick={handleContinue}
      >
        {currentStep === 3 ? 'Continuar' : 'Continuar'}
      </Button>
    </div>
  );
}
