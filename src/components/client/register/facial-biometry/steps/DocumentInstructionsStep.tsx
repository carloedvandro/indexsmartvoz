
import { Button } from "@/components/ui/button";

interface DocumentInstructionsStepProps {
  onNext: () => void;
  step: number;
  totalSteps: number;
}

export const DocumentInstructionsStep = ({ onNext }: DocumentInstructionsStepProps) => {
  return (
    <div className="bg-[#8425af] text-white min-h-[calc(100vh-100px)] relative flex flex-col justify-between">
      {/* Corner dots - small white dots in corners */}
      <div className="absolute top-4 left-4 w-1 h-1 rounded-full bg-white"></div>
      <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-white"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-white"></div>
      <div className="absolute bottom-4 right-4 w-1 h-1 rounded-full bg-white"></div>
      
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        {/* Icon */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/093589c8-1267-448a-a583-8332cfa911e9.png" 
            alt="Documento" 
            className="h-16 w-16 object-contain"
          />
        </div>
        
        {/* Text content - centered */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-light mb-2">Vamos lá!</h2>
          <p className="text-sm font-light leading-relaxed">
            Tenha em mãos o seu RG, CNH ou<br />
            Documento oficial de identificação com foto.
          </p>
        </div>
      </div>

      {/* Progress dots - square style */}
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
