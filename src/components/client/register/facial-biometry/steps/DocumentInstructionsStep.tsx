
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
    <div className="bg-white text-gray-800 min-h-screen relative flex flex-col">
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        {/* Document icon */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 p-8 rounded-full mb-6">
            <FileText size={64} color="#8425af" strokeWidth={1.5} />
          </div>
          
          {/* Text content - centered with smaller text */}
          <h2 className="text-base font-medium mb-2 text-gray-800">Vamos lá!</h2>
          <p className="text-xs font-light leading-relaxed text-center text-gray-600">
            Tenha em mãos o seu RG, CNH ou<br />
            Documento oficial de identificação com foto.
          </p>
        </div>
      </div>

      {/* Button fixed at bottom with no white margin */}
      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <button
          onClick={onNext}
          className="w-full h-12 bg-[#8425af] text-white uppercase text-xs font-medium hover:bg-[#7a1fa2]"
        >
          AVANÇAR
        </button>
      </div>
    </div>
  );
};
