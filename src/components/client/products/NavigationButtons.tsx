
import { useNavigate } from "react-router-dom";
import { PowerToggleButtons } from "./chip-activation/PowerToggleButtons";

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
  
  const onBack = () => {
    if (currentStep === 1) {
      navigate("/client/dashboard");
    } else {
      handleBack();
    }
  };

  return (
    <div className="mt-6 w-full">
      <PowerToggleButtons
        onBack={onBack}
        onContinue={handleContinue}
        disabled={disabled}
      />
    </div>
  );
}
