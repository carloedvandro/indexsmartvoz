
import { useEffect } from "react";
import { Power } from "lucide-react";

interface PowerToggleButtonsProps {
  onBack: () => void;
  onContinue: () => void;
  disabled?: boolean;
}

export function PowerToggleButtons({ 
  onBack, 
  onContinue, 
  disabled = false 
}: PowerToggleButtonsProps) {
  // Apply keypress event listeners
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onBack();
      } else if (e.key === 'ArrowRight' && !disabled) {
        onContinue();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onBack, onContinue, disabled]);

  return (
    <div className="relative w-full max-w-[250px] h-[54px] mx-auto">
      {/* Main container */}
      <div className="w-full h-full bg-black rounded-full flex items-center justify-between px-1 shadow-lg">
        {/* Back button (left/red) */}
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none"
          aria-label="Voltar"
        >
          <Power className="w-5 h-5 text-white" />
        </button>
        
        {/* Divider */}
        <div className="flex-1 h-2 bg-gray-800 rounded-full mx-1"></div>
        
        {/* Continue button (right/green) */}
        <button
          onClick={onContinue}
          disabled={disabled}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none 
            ${disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500'}`}
          aria-label="Continuar"
        >
          <Power className="w-5 h-5 text-white" />
        </button>
      </div>
      
      {/* Button labels */}
      <div className="absolute -bottom-6 w-full flex justify-between px-2 text-xs">
        <span className="text-gray-700 font-medium">Voltar</span>
        <span className={`font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>Continuar</span>
      </div>
    </div>
  );
}
