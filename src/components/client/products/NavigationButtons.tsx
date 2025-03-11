
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSwipe } from "@/hooks/use-swipe";
import { Power } from "lucide-react";
import { useEffect } from "react";

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
  
  const handleBackClick = () => currentStep === 1 ? navigate("/client/dashboard") : handleBack();
  
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
    onSwipeLeft: () => !disabled && handleContinue(),
    onSwipeRight: handleBackClick
  });

  // Adicionar suporte para navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && !disabled) {
        handleContinue();
      } else if (e.key === "ArrowLeft") {
        handleBackClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleBackClick, handleContinue, disabled]);

  return (
    <div 
      className="flex justify-center w-full mt-8 touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between w-full max-w-[320px] bg-[#660099] rounded-full h-16 px-3 shadow-lg relative">
        {/* Botão Voltar */}
        <Button 
          onClick={handleBackClick}
          className="rounded-full h-12 w-12 flex items-center justify-center p-0 bg-red-600 hover:bg-red-700 text-white border-none shadow-md transition-all duration-300 z-10"
          aria-label="Voltar"
        >
          <Power size={22} strokeWidth={2.5} className="transform rotate-180" />
        </Button>

        {/* Barra de conexão */}
        <div className="h-2 flex-1 max-w-[180px] bg-gray-700 rounded-full mx-4 z-0" />
        
        {/* Botão Continuar */}
        <Button 
          onClick={handleContinue}
          disabled={disabled}
          className={`rounded-full h-12 w-12 flex items-center justify-center p-0 border-none shadow-md transition-all duration-300 z-10 ${
            disabled 
              ? "bg-gray-500 cursor-not-allowed" 
              : "bg-green-500 hover:bg-green-600"
          } text-white`}
          aria-label="Continuar"
        >
          <Power size={22} strokeWidth={2.5} />
        </Button>
      </div>
    </div>
  );
}
