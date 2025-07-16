
import { Button } from "@/components/ui/button";
import { SlideButton } from "@/components/ui/slide-button";
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

  console.log('🔴 NavigationButtons renderizado com disabled:', disabled);

  // Always use the provided handler for back navigation
  const handleBackNavigation = () => {
    if (currentStep === 1) {
      navigate("/client/plan-selection");
    } else {
      handleBack();
    }
  };

  return (
    <div className="flex justify-between gap-4 mt-6 max-w-[340px] mx-auto w-full">
      <Button 
        variant="outline"
        className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white flex-1"
        onClick={handleBackNavigation}
      >
        Voltar
      </Button>
      <SlideButton 
        className="bg-[#8425af] hover:bg-[#8425af]/90 text-white flex-1"
        onClick={handleContinue}
        disabled={disabled}
      >
        Continuar
      </SlideButton>
    </div>
  );
}
