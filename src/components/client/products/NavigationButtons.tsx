
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

  // Always use the provided handler for back navigation
  const handleBackNavigation = () => {
    if (currentStep === 1) {
      navigate("/client/dashboard");
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
