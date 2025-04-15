
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
        className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white w-full mr-2"
        onClick={() => currentStep === 1 ? navigate("/client/dashboard") : handleBack()}
      >
        Voltar
      </Button>
      <Button 
        className="bg-[#8425af] hover:bg-[#6c1e8f] text-white w-full ml-2"
        onClick={handleContinue}
      >
        {currentStep === 3 ? 'Continuar' : 'Continuar'}
      </Button>
    </div>
  );
}
