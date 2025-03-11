
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
    <div className="flex justify-between w-full gap-4 max-w-[340px] mx-auto mt-6">
      <Button 
        variant="outline" 
        className="bg-white border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white px-4 h-[42px] flex-1 items-center"
        onClick={onBack}
      >
        Voltar
      </Button>
      <Button 
        className="bg-[#8425af] hover:bg-[#6c1e8f] text-white px-4 h-[42px] flex-1 items-center"
        onClick={onContinue}
        disabled={disabled}
      >
        Continuar
      </Button>
    </div>
  );
}
