
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSwipe } from "@/hooks/use-swipe";
import { ChevronLeft, ArrowUpRight } from "lucide-react";

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

  return (
    <div 
      className="flex justify-center w-full mt-8 touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between w-full max-w-[320px] bg-gradient-to-r from-purple-900 to-indigo-800 rounded-full h-16 px-3 shadow-lg">
        <Button 
          onClick={handleBackClick}
          className="rounded-full h-12 w-12 flex items-center justify-center p-0 bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-none shadow-md transition-all duration-300"
          aria-label="Go back"
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </Button>

        <div className="h-1 flex-1 max-w-[180px] bg-gradient-to-r from-white/10 to-white/30 rounded-full mx-4" />
        
        <Button 
          onClick={handleContinue}
          disabled={disabled}
          className="rounded-full h-12 w-12 flex items-center justify-center p-0 bg-gradient-to-br from-emerald-400 to-teal-600 hover:from-emerald-500 hover:to-teal-700 text-white border-none shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Continue"
        >
          <ArrowUpRight size={22} strokeWidth={2.5} />
        </Button>
      </div>
    </div>
  );
}
