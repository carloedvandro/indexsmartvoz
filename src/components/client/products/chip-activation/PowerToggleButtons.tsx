
import { Button } from "@/components/ui/button";

interface PowerToggleButtonsProps {
  onBack: () => void;
  onContinue: () => void;
  disabled?: boolean;
  bgColor?: string;
}

export function PowerToggleButtons({ 
  onBack, 
  onContinue, 
  disabled = false,
  bgColor = "#000000" 
}: PowerToggleButtonsProps) {
  return (
    <div className="flex justify-between items-center w-full max-w-sm mx-auto">
      <Button
        onClick={onBack}
        className="relative rounded-full p-0 overflow-hidden"
        disabled={disabled}
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-gray-300">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center" 
            style={{ backgroundColor: bgColor }}
          >
            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">STOP</span>
            </div>
          </div>
        </div>
      </Button>
      
      <Button
        onClick={onContinue}
        className="relative rounded-full p-0 overflow-hidden"
        disabled={disabled}
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-gray-300">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: bgColor }}
          >
            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">START</span>
            </div>
          </div>
        </div>
      </Button>
    </div>
  );
}
