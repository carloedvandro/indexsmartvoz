
import { Button } from "@/components/ui/button";

interface CaptureInstructionsProps {
  onNext: () => void;
  onBack: () => void;
}

export const CaptureInstructions = ({ onNext }: CaptureInstructionsProps) => {
  return (
    <div className="bg-[#8425af] text-white p-8 rounded-lg relative">
      {/* Corner dots - much smaller and simpler */}
      <div className="absolute top-4 left-4 w-1 h-1 rounded-full bg-white/80"></div>
      <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-white/80"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-white/80"></div>
      <div className="absolute bottom-4 right-4 w-1 h-1 rounded-full bg-white/80"></div>
      
      <div className="flex flex-col items-center justify-between h-full py-8">
        {/* Icon */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/e45f8e6f-600e-4e88-b663-676cf6a63ec4.png" 
            alt="Face outline with phone" 
            className="h-12 w-12 object-contain"
          />
        </div>
        
        {/* Text content - simplified and centered */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-normal mb-1">Olá,</h2>
          <p className="text-sm">
            Hora de tirar sua foto de identificação.<br />
            Antes de começar, algumas dicas:
          </p>
        </div>
        
        {/* Progress dots - horizontal and minimal */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-5 h-1 bg-white rounded-sm"></div>
          <div className="w-1 h-1 bg-white/70 rounded-full"></div>
          <div className="w-1 h-1 bg-white/70 rounded-full"></div>
          <div className="w-1 h-1 bg-white/70 rounded-full"></div>
        </div>

        {/* Button - simplified with uppercase text */}
        <Button 
          onClick={onNext} 
          variant="outline" 
          className="w-full bg-transparent border border-white text-white hover:bg-white/10 hover:text-white uppercase text-sm"
        >
          Avançar
        </Button>
      </div>
    </div>
  );
};
