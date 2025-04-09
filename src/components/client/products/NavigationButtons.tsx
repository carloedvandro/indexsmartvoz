
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavigationButtonsProps {
  currentStep: number;
  handleBack: () => void;
  handleContinue: () => void;
  disabled?: boolean;
}

export function NavigationButtons({ 
  currentStep, 
  handleBack, 
  handleContinue,
  disabled = false
}: NavigationButtonsProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="flex justify-between gap-4 mt-6 mx-auto" style={{ width: isMobile ? "96%" : "480px" }}>
      <Button 
        variant="outline"
        className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white flex-1"
        onClick={() => currentStep === 1 ? navigate("/client/dashboard") : handleBack()}
      >
        Voltar
      </Button>
      <Button 
        className="bg-[#8425af] hover:bg-[#6c1e8f] text-white flex-1"
        onClick={handleContinue}
        disabled={disabled}
      >
        {currentStep === 3 ? 'Continuar' : 'Continuar'}
      </Button>
    </div>
  );
}
