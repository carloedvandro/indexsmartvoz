
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCalendarStyles } from "@/hooks/useCalendarStyles";

interface NavigationButtonsProps {
  currentStep: number;
  handleBack: () => void;
  handleContinue: () => void;
  selectedDueDate?: number | null;
}

export function NavigationButtons({ 
  currentStep, 
  handleBack, 
  handleContinue,
  selectedDueDate
}: NavigationButtonsProps) {
  const navigate = useNavigate();
  const { data: calendarStyle } = useCalendarStyles();

  const continueButtonStyle = selectedDueDate 
    ? { backgroundColor: calendarStyle?.theme_color || '#0040FF', borderColor: calendarStyle?.theme_color || '#0040FF' }
    : {};

  return (
    <div className="flex justify-between mt-6">
      <Button 
        variant="outline"
        className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
        onClick={() => currentStep === 1 ? navigate("/client/dashboard") : handleBack()}
      >
        Voltar
      </Button>
      <Button 
        className="text-white hover:opacity-90"
        style={continueButtonStyle}
        onClick={handleContinue}
      >
        Continuar
      </Button>
    </div>
  );
}
