
import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  onBack: () => void;
  onContinue: () => void;
}

export function NavigationButtons({ onBack, onContinue }: NavigationButtonsProps) {
  return (
    <div className="flex justify-between pt-6">
      <Button
        variant="outline"
        onClick={onBack}
        className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
      >
        Voltar
      </Button>

      <div className="flex gap-4">
        <Button
          variant="link"
          className="text-[#8425af]"
        >
          Preciso de ajuda
        </Button>

        <Button
          onClick={onContinue}
          className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
