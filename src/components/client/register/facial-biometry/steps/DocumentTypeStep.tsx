
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
    <div className="bg-white text-gray-800 flex flex-col">
      <div className="flex-1 flex items-start justify-center pt-10 p-6">
        <div className="w-full max-w-[280px] space-y-6">
          <h2 className="text-xl font-medium text-center text-gray-800">Selecione o tipo de documento</h2>
          <p className="text-center text-sm text-gray-600">
            Escolha qual documento de identificação você deseja utilizar:
          </p>

          <div className="flex flex-col gap-4 mt-4">
            <Card 
              className={`cursor-pointer transition-all border-2 ${
                selectedType === 'rg' 
                ? 'ring-2 ring-[#8425af] bg-[#8425af]/5 border-[#8425af]' 
                : 'bg-white hover:bg-gray-50 border-gray-200'
              }`}
              onClick={() => handleSelect('rg')}
            >
              <CardContent className="p-4 flex items-center">
                <div className="mr-4 bg-[#8425af]/10 p-2 rounded-full">
                  <FileImage className="h-6 w-6 text-[#8425af]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">RG (Identidade)</h3>
                  <p className="text-sm text-gray-600">Frente e verso</p>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all border-2 ${
                selectedType === 'cnh' 
                ? 'ring-2 ring-[#8425af] bg-[#8425af]/5 border-[#8425af]' 
                : 'bg-white hover:bg-gray-50 border-gray-200'
              }`}
              onClick={() => handleSelect('cnh')}
            >
              <CardContent className="p-4 flex items-center">
                <div className="mr-4 bg-[#8425af]/10 p-2 rounded-full">
                  <FileText className="h-6 w-6 text-[#8425af]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">CNH (Carteira de Motorista)</h3>
                  <p className="text-sm text-gray-600">Apenas frente</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Botão fixado na parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <Button
          onClick={handleContinue}
          disabled={!selectedType}
          className="w-full h-12 bg-[#8425af] text-white hover:bg-[#7a1fa2] font-medium uppercase text-base tracking-wider rounded-none"
        >
          AVANÇAR
        </Button>
      </div>
    </div>
  );
};
