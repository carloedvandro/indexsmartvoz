
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { FileText } from "lucide-react";

interface DocumentInstructionsStepProps {
  onNext: () => void;
  step: number;
  totalSteps: number;
}

export const DocumentInstructionsStep = ({ onNext }: DocumentInstructionsStepProps) => {
  return (
    <div className="bg-[#8425af] text-white min-h-[calc(100vh-100px)] relative flex flex-col justify-between">
      {/* Corner dots - tiny white dots in corners */}
      <div className="absolute top-4 left-4 w-1 h-1 rounded-full bg-white"></div>
      <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-white"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-white"></div>
      <div className="absolute bottom-4 right-4 w-1 h-1 rounded-full bg-white"></div>
      
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        {/* Document icon */}
        <div className="flex flex-col items-center">
          <div className="bg-white/10 p-8 rounded-full mb-6 backdrop-blur-sm">
            <FileText size={64} color="white" strokeWidth={1.5} />
          </div>
          
          {/* Text content - centered with smaller text */}
          <h2 className="text-base font-light mb-2">Vamos lá!</h2>
          <p className="text-xs font-light leading-relaxed text-center">
            Tenha em mãos o seu RG, CNH ou<br />
            Documento oficial de identificação com foto.
          </p>
        </div>
      </div>

      {/* Button outside of the main container */}
      <button
        onClick={onNext}
        className="w-full h-12 bg-white text-black uppercase text-xs font-medium"
      >
        AVANÇAR
      </button>
    </div>
  );
};
