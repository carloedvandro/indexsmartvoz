
import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  onBack: () => void;
  onContinue: () => void;
  disabled?: boolean;
  continueText?: string;
  backText?: string;
  className?: string;
}

export function NavigationButtons({ 
  onBack, 
  onContinue, 
  disabled = false,
  continueText = "Continuar",
  backText = "Voltar",
  className = ""
}: NavigationButtonsProps) {
  return (
    <div className={`flex justify-between w-full gap-4 ${className}`}>
      <Button 
        variant="outline" 
        className="flex-1 border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white rounded-md"
        onClick={onBack}
      >
        {backText}
      </Button>
      <Button 
        className="flex-1 bg-[#8425af] hover:bg-[#6c1e8f] text-white rounded-md"
        onClick={onContinue}
        disabled={disabled}
      >
        {continueText}
      </Button>
    </div>
  );
}
