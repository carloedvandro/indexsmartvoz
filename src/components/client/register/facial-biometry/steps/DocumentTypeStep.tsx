
import { Button } from "@/components/ui/button";
import { IdCard } from "lucide-react";

interface DocumentTypeStepProps {
  onSelectDocType: (type: 'rg' | 'cnh') => void;
}

export const DocumentTypeStep = ({ onSelectDocType }: DocumentTypeStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Selecione o tipo de documento</h2>
      <div className="grid gap-4 max-w-xs mx-auto">
        <Button
          variant="outline"
          className="h-24 flex flex-col items-center justify-center"
          onClick={() => onSelectDocType('rg')}
        >
          <IdCard className="w-8 h-8 mb-2" />
          USAR MEU RG
        </Button>
        <Button
          variant="outline"
          className="h-24 flex flex-col items-center justify-center"
          onClick={() => onSelectDocType('cnh')}
        >
          <IdCard className="w-8 h-8 mb-2" />
          USAR MINHA CNH
        </Button>
      </div>
    </div>
  );
};
