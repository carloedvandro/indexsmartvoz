
import { Button } from "@/components/ui/button";

interface CaptureInstructionsProps {
  onNext: () => void;
  onBack: () => void;
}

export const CaptureInstructions = ({ onNext }: CaptureInstructionsProps) => {
  return (
    <div className="bg-[#8425af] text-white min-h-[calc(100vh-100px)] relative flex flex-col justify-between">
      {/* Corner dots - small white dots in the corners */}
      <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-white opacity-70"></div>
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white opacity-70"></div>
      <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-white opacity-70"></div>
      <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-white opacity-70"></div>
      
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        {/* Updated icon */}
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/f4a0a9d1-e05b-4314-aff6-399f340b0969.png" 
            alt="Face outline with phone" 
            className="h-20 w-20 object-contain mb-6"
          />
          
          {/* Text content - centered */}
          <h2 className="text-xl font-light mb-2">Olá,</h2>
          <p className="text-sm font-light leading-relaxed text-center">
            Hora de tirar sua foto de identificação.<br />
            Antes de começar, algumas dicas.
          </p>
        </div>
      </div>

      {/* Progress dots - square style at bottom */}
      <div className="flex justify-center space-x-2 mb-8">
        <div className="w-4 h-1 bg-white"></div>
        <div className="w-1 h-1 bg-white/70"></div>
        <div className="w-1 h-1 bg-white/70"></div>
        <div className="w-1 h-1 bg-white/70"></div>
      </div>

      {/* Button - white button with text black in footer */}
      <div className="w-full mt-auto">
        <Button 
          onClick={onNext} 
          className="w-full bg-white text-black hover:bg-white/90 rounded-none h-14 uppercase text-sm font-medium"
        >
          Avançar
        </Button>
      </div>
    </div>
  );
};
