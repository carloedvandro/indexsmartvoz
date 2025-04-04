
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileImage, FileText } from "lucide-react";

interface DocumentTypeStepProps {
  onSelectDocType: (type: 'rg' | 'cnh') => void;
  step: number;
  totalSteps: number;
}

export const DocumentTypeStep = ({ onSelectDocType }: DocumentTypeStepProps) => {
  const [selectedType, setSelectedType] = useState<'rg' | 'cnh' | null>(null);

  const handleSelect = (type: 'rg' | 'cnh') => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      onSelectDocType(selectedType);
    }
  };

  return (
    <div className="bg-[#8425af] text-white p-8 rounded-lg">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">Selecione o tipo de documento</h2>
        <p className="text-center">
          Escolha qual documento de identificação você deseja utilizar:
        </p>

        <div className="flex flex-col gap-4 mt-4">
          <Card 
            className={`cursor-pointer transition-all ${
              selectedType === 'rg' 
              ? 'ring-2 ring-white bg-[#9636c0]' 
              : 'bg-[#8425af]/70 hover:bg-[#9636c0]/80'
            }`}
            onClick={() => handleSelect('rg')}
          >
            <CardContent className="p-4 flex items-center">
              <div className="mr-4 bg-white/10 p-2 rounded-full">
                <FileImage className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium">RG (Identidade)</h3>
                <p className="text-sm text-white/80">Frente e verso</p>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all ${
              selectedType === 'cnh' 
              ? 'ring-2 ring-white bg-[#9636c0]' 
              : 'bg-[#8425af]/70 hover:bg-[#9636c0]/80'
            }`}
            onClick={() => handleSelect('cnh')}
          >
            <CardContent className="p-4 flex items-center">
              <div className="mr-4 bg-white/10 p-2 rounded-full">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium">CNH (Carteira de Motorista)</h3>
                <p className="text-sm text-white/80">Apenas frente</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button
          onClick={handleContinue}
          className="w-full mt-6 bg-white text-[#8425af] hover:bg-gray-100"
          disabled={!selectedType}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
