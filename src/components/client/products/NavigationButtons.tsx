
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSwipe } from "@/hooks/use-swipe";
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
      className="flex justify-center w-full mt-8 touch-pan-y gap-12"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Botão Voltar */}
      <div className="relative">
        <Button 
          onClick={handleBackClick}
          className="rounded-full h-16 w-16 flex flex-col items-center justify-center p-0 relative overflow-hidden shadow-lg"
          aria-label="Voltar"
        >
          {/* Silver outer ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-300 to-gray-400 shadow-inner"></div>
          
          {/* Black inner ring */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-b from-gray-700 to-black"></div>
          
          {/* Red button */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-b from-red-500 to-red-700 shadow-inner flex items-center justify-center">
            <span className="text-white text-[8px] font-bold leading-tight">START<br/>STOP</span>
          </div>
          
          {/* Glossy overlay */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-b from-white to-transparent opacity-30"></div>
        </Button>
      </div>
      
      {/* Botão Continuar */}
      <div className="relative">
        <Button 
          onClick={handleContinue}
          disabled={disabled}
          className={`rounded-full h-16 w-16 flex flex-col items-center justify-center p-0 relative overflow-hidden shadow-lg ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Continuar"
        >
          {/* Silver outer ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-300 to-gray-400 shadow-inner"></div>
          
          {/* Black inner ring */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-b from-gray-700 to-black"></div>
          
          {/* Red button */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-b from-red-500 to-red-700 shadow-inner flex items-center justify-center">
            <span className="text-white text-[8px] font-bold leading-tight">START<br/>STOP</span>
          </div>
          
          {/* Glossy overlay */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-b from-white to-transparent opacity-30"></div>
        </Button>
      </div>
    </div>
  );
}
