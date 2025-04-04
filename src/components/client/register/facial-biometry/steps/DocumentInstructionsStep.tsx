
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";

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
        {/* Document icon in white frame */}
        <div className="flex flex-col items-center">
          <div className="border border-white p-2 mb-6">
            <img 
              src="/lovable-uploads/2855a994-0fac-406d-b04e-6ded0989c1be.png" 
              alt="Documento" 
              className="h-12 w-12 object-contain"
            />
          </div>
          
          {/* Text content - centered with smaller text */}
          <h2 className="text-base font-light mb-2">Vamos lá!</h2>
          <p className="text-xs font-light leading-relaxed text-center">
            Tenha em mãos o seu RG, CNH ou<br />
            Documento oficial de identificação com foto.
          </p>
        </div>
      </div>

      {/* Progress dots - exact style from the image */}
      <div className="flex justify-center space-x-2 mb-10">
        <div className="w-4 h-1 bg-white"></div>
        <div className="w-1 h-1 bg-white rounded-full"></div>
        <div className="w-1 h-1 bg-white rounded-full"></div>
        <div className="w-1 h-1 bg-white rounded-full"></div>
      </div>

      {/* Button outside of the main container as shown in the image */}
      <button
        onClick={onNext}
        className="w-full h-12 bg-white text-black uppercase text-xs font-medium"
      >
        AVANÇAR
      </button>
    </div>
  );
};
