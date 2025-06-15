
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
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col justify-center p-8 -mt-5">
        <div className="space-y-6">
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

      <div className="p-0 mb-5">
        <button
          onClick={handleContinue}
          className="w-full h-16 bg-[#8B3FBF] text-white hover:bg-[#7A3AAB] transition-colors uppercase text-sm font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedType}
        >
          AVANÇAR
        </button>
      </div>
    </div>
  );
};
