
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
    <div className="flex justify-between w-full gap-4 max-w-[380px] mx-auto mt-6">
      <Button 
        variant="outline" 
        className="bg-white border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white px-4 h-[42px] flex-1 items-center rounded-md"
        onClick={onBack}
      >
        Voltar
      </Button>
      <Button 
        className="bg-[#c591dd] hover:bg-[#8425af] text-white px-4 h-[42px] flex-1 items-center rounded-md"
        onClick={onContinue}
        disabled={disabled}
      >
        Continuar
      </Button>
    </div>
  );
}
