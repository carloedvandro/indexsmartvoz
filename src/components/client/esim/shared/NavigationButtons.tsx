
import { Button } from "@/components/ui/button";

type NavigationButtonsProps = {
  onBack: () => void;
  isSubmitDisabled: boolean;
};

export function NavigationButtons({ onBack, isSubmitDisabled }: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center w-full mt-8 gap-4">
      <Button 
        type="button"
        variant="outline"
        className="flex-1 border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white rounded-lg py-3"
        onClick={onBack}
      >
        Voltar
      </Button>
      <Button 
        type="submit"
        className="flex-1 bg-[#8425af] hover:bg-[#6c1e8f] text-white rounded-lg py-3"
        disabled={isSubmitDisabled}
      >
        Continuar
      </Button>
    </div>
  );
}
