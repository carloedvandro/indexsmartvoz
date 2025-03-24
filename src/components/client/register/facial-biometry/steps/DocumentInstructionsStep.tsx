
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface DocumentInstructionsStepProps {
  onNext: () => void;
  step: number;
  totalSteps: number;
}

export const DocumentInstructionsStep = ({ onNext, step, totalSteps }: DocumentInstructionsStepProps) => {
  return (
    <div className="bg-[#8425af] text-white p-8 rounded-lg">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <img src="/lovable-uploads/cb712966-b0ed-439a-ba83-8c50a897152e.png" alt="Vivo" className="h-8" />
        </div>
        <p className="text-sm">Passo {step} de {totalSteps}</p>
        
        <div className="flex items-center justify-center mb-4">
          <div className="p-2 rounded-full">
            <img 
              src="/lovable-uploads/093589c8-1267-448a-a583-8332cfa911e9.png" 
              alt="Documento" 
              className="h-12 w-16 object-contain"
            />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold">Vamos lá!</h2>
        <p className="text-sm">
          Tenha em mãos o seu RG, CNH ou Documento oficial de identificação com foto.
        </p>
        
        <div className="flex justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        
        <Button onClick={onNext} className="w-full bg-white text-[#8425af] hover:bg-gray-100">
          AVANÇAR
        </Button>
      </div>
    </div>
  );
};
