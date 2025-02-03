import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { playClickSound } from "@/utils/playSound";

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

  const handleBackClick = () => {
    playClickSound();
    if (currentStep === 1) {
      navigate("/client/dashboard");
    } else {
      handleBack();
    }
  };

  const handleContinueClick = () => {
    playClickSound();
    handleContinue();
  };

  return (
    <div className="flex justify-between mt-6">
      <Button 
        variant="outline"
        className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
        onClick={handleBackClick}
      >
        Voltar
      </Button>
      <Button 
        className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
        onClick={handleContinueClick}
      >
        {currentStep === 3 ? 'Continuar' : 'Continuar'}
      </Button>
    </div>
  );
}