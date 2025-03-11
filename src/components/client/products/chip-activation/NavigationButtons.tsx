
import { Button } from "@/components/ui/button";

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
    <div className="flex justify-between w-full gap-4 max-w-[414px] mx-auto">
      <Button 
        variant="outline" 
        className="flex-1 border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white rounded-md"
        onClick={onBack}
      >
        Voltar
      </Button>
      <Button 
        className="flex-1 bg-[#bc8ccd] hover:bg-[#8425af] text-white rounded-md"
        onClick={onContinue}
        disabled={disabled}
      >
        Continuar
      </Button>
    </div>
  );
}
