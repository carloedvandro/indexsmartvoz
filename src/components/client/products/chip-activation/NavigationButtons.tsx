
import { PowerToggleButtons } from "./PowerToggleButtons";

interface NavigationButtonsProps {
  onBack: () => void;
  onContinue: () => void;
  disabled?: boolean;
}

export function NavigationButtons({ 
  onBack, 
  onContinue, 
  disabled = false 
}: NavigationButtonsProps) {
  return (
    <div className="mt-8 w-full">
      <PowerToggleButtons
        onBack={onBack}
        onContinue={onContinue}
        disabled={disabled}
        bgColor="#5f0889"
      />
    </div>
  );
}
