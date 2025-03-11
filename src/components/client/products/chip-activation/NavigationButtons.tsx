
import { Button } from "@/components/ui/button";
import { useSwipe } from "@/hooks/use-swipe";
import { Power } from "lucide-react";
import { useEffect } from "react";

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
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
    onSwipeLeft: () => !disabled && onContinue(),
    onSwipeRight: onBack
  });

  // Adicionar suporte para navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && !disabled) {
        onContinue();
      } else if (e.key === "ArrowLeft") {
        onBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBack, onContinue, disabled]);

  return (
    <div 
      className="flex justify-center w-full mt-8 touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between w-full max-w-[320px] bg-[#660099] rounded-full h-16 px-3 shadow-lg relative">
        {/* Botão Voltar */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-red-600 opacity-20 blur-sm animate-pulse" />
          <Button 
            onClick={onBack}
            className="rounded-full h-14 w-14 flex items-center justify-center p-0 bg-gray-800 border-2 border-gray-400 hover:bg-gray-700 text-red-500 shadow-md transition-all duration-300 z-10 relative overflow-hidden"
            aria-label="Voltar"
          >
            <div className="absolute inset-0 rounded-full bg-black opacity-80" />
            <div className="absolute inset-0 rounded-full border-2 border-gray-500" />
            <div className="absolute inset-2 rounded-full border border-red-500 opacity-70" />
            <Power size={22} strokeWidth={2.5} className="transform rotate-180 relative z-10" />
          </Button>
        </div>

        {/* Barra de conexão */}
        <div className="h-2 flex-1 max-w-[180px] bg-gray-700 rounded-full mx-4 z-0" />
        
        {/* Botão Continuar */}
        <div className="relative">
          {!disabled && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-500 opacity-20 blur-sm animate-pulse" />
          )}
          <Button 
            onClick={onContinue}
            disabled={disabled}
            className={`rounded-full h-14 w-14 flex items-center justify-center p-0 border-2 border-gray-400 shadow-md transition-all duration-300 z-10 relative overflow-hidden ${
              disabled 
                ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                : "bg-gray-800 hover:bg-gray-700 text-green-500"
            }`}
            aria-label="Continuar"
          >
            <div className="absolute inset-0 rounded-full bg-black opacity-80" />
            <div className="absolute inset-0 rounded-full border-2 border-gray-500" />
            {!disabled && (
              <div className="absolute inset-2 rounded-full border border-green-500 opacity-70" />
            )}
            <Power size={22} strokeWidth={2.5} className="relative z-10" />
          </Button>
        </div>
      </div>
    </div>
  );
}
