
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface DocumentTypeStepProps {
  onSelectDocType: (type: 'rg' | 'cnh') => void;
  step: number;
  totalSteps: number;
}

export const DocumentTypeStep = ({ onSelectDocType, step, totalSteps }: DocumentTypeStepProps) => {
  return (
    <div className="bg-[#8425af] text-white p-8 rounded-lg">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <img src="/lovable-uploads/cb712966-b0ed-439a-ba83-8c50a897152e.png" alt="Vivo" className="h-8" />
        </div>
        <p className="text-sm">Passo {step} de {totalSteps}</p>
        
        <h2 className="text-xl font-semibold">Selecione o tipo de documento.</h2>
        
        <div className="space-y-4 mt-4">
          <Button
            variant="outline"
            className="w-full h-14 flex justify-center items-center bg-transparent border border-white text-white hover:bg-white/10"
            onClick={() => onSelectDocType('rg')}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 mr-2">
                <img 
                  src="/lovable-uploads/7d33e958-7a68-47cc-af07-aee13e8e5c41.png" 
                  alt="RG" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span>USAR MEU RG</span>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-14 flex justify-center items-center bg-transparent border border-white text-white hover:bg-white/10"
            onClick={() => onSelectDocType('cnh')}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 mr-2">
                <img 
                  src="/lovable-uploads/5a0cbe39-852f-4643-bfb6-5065205886b0.png" 
                  alt="CNH" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span>USAR MINHA CNH</span>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-14 flex justify-center items-center bg-transparent border border-white text-white hover:bg-white/10 opacity-60"
            disabled
          >
            <div className="flex items-center">
              <FileText className="w-8 h-8 mr-2" />
              <span>OUTRO DOCUMENTO</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
