
import { Button } from "@/components/ui/button";

interface DocumentInstructionsStepProps {
  onNext: () => void;
  step: number;
  totalSteps: number;
}

export const DocumentInstructionsStep = ({ onNext }: DocumentInstructionsStepProps) => {
  return (
    <div className="bg-[#8425af] text-white p-8 rounded-lg relative">
      {/* Corner dots - smaller and simpler */}
      <div className="absolute top-4 left-4 w-1 h-1 rounded-full bg-white/80"></div>
      <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-white/80"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-white/80"></div>
      <div className="absolute bottom-4 right-4 w-1 h-1 rounded-full bg-white/80"></div>
      
      <div className="flex flex-col items-center justify-between h-full py-8">
        {/* Icon */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/093589c8-1267-448a-a583-8332cfa911e9.png" 
            alt="Documento" 
            className="h-12 w-12 object-contain"
          />
        </div>
        
        {/* Text content - simplified and centered */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-normal mb-1">Vamos lá!</h2>
          <p className="text-sm">
            Tenha em mãos o seu RG, CNH ou<br />
            Documento oficial de identificação com foto.
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
