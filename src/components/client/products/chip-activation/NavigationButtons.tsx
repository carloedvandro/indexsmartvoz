
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
    <div className="flex justify-end gap-4">
      <Button 
        variant="outline" 
        className="bg-white border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white px-4 h-[42px] flex-1 items-center"
        onClick={onBack}
      >
        Voltar
      </Button>
      <Button 
        className="px-4 py-4 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 text-white flex-1 items-center"
        onClick={onContinue}
        disabled={disabled}
      >
        Continuar
      </Button>
    </div>
  );
}
