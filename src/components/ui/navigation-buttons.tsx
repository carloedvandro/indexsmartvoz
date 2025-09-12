import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface NavigationButtonsProps {
  handleBack: () => void;
  handleContinue: () => void;
  disabled?: boolean;
  backLabel?: string;
  continueLabel?: string;
  showBack?: boolean;
  showContinue?: boolean;
}

export function NavigationButtons({
  handleBack,
  handleContinue,
  disabled = false,
  backLabel = "Voltar",
  continueLabel = "Continuar",
  showBack = true,
  showContinue = true,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between gap-4">
      {showBack ? (
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          {backLabel}
        </Button>
      ) : (
        <div />
      )}
      
      {showContinue && (
        <Button 
          type="button" 
          onClick={handleContinue}
          disabled={disabled}
          className="flex items-center gap-2"
        >
          {continueLabel}
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}