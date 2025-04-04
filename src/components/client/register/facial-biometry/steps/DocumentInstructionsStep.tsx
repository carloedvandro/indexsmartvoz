
import { Button } from "@/components/ui/button";

interface DocumentInstructionsStepProps {
  onNext: () => void;
  step: number;
  totalSteps: number;
}

export const DocumentInstructionsStep = ({ onNext }: DocumentInstructionsStepProps) => {
  return (
    <div className="bg-[#8425af] text-white min-h-[calc(100vh-100px)] relative flex flex-col justify-between">
      {/* Corner dots - tiny white dots in corners */}
      <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-white opacity-70"></div>
      <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-white opacity-70"></div>
      <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-white opacity-70"></div>
      <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-white opacity-70"></div>
      
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        {/* Document icon */}
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/f08e8d41-e68d-4da1-9fdd-aedd255b813d.png" 
            alt="Documento" 
            className="h-16 w-16 object-contain mb-6"
          />
          
          {/* Text content - centered with smaller text */}
          <h2 className="text-base font-light mb-2">Vamos lá!</h2>
          <p className="text-xs font-light leading-relaxed text-center">
            Tenha em mãos o seu RG, CNH ou<br />
            Documento oficial de identificação com foto.
          </p>
        </div>
      </div>

      {/* Progress dots - square style */}
      <div className="flex justify-center space-x-2 mb-10">
        <div className="w-4 h-1 bg-white"></div>
        <div className="w-1 h-1 bg-white/70"></div>
        <div className="w-1 h-1 bg-white/70"></div>
        <div className="w-1 h-1 bg-white/70"></div>
      </div>

      {/* Button - white button with text black in footer */}
      <div className="w-full mt-auto">
        <Button 
          onClick={onNext} 
          className="w-full bg-white text-black hover:bg-white/90 rounded-none h-12 uppercase text-xs font-medium"
        >
          Avançar
        </Button>
      </div>
    </div>
  );
};
