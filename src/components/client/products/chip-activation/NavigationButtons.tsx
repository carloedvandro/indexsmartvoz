
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
        className="px-4 py-4 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 text-white flex-1 items-center"
        style={{backgroundColor: '#5f0889'}}
        onClick={onBack}
      >
        Voltar
      </Button>
      <Button 
        className="px-4 py-4 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 text-white flex-1 items-center"
        style={{backgroundColor: '#5f0889'}}
        onClick={onContinue}
        disabled={disabled}
      >
        Continuar
      </Button>
    </div>
  );
}
