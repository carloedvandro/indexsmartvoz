
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileImage, FileText, Loader2 } from "lucide-react";

interface DocumentTypeStepProps {
  onSelectDocType: (type: 'rg' | 'cnh') => void;
  step: number;
  totalSteps: number;
  isReleasingCamera?: boolean;
}

export const DocumentTypeStep = ({ onSelectDocType, isReleasingCamera }: DocumentTypeStepProps) => {
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
        <div className="w-full max-w-[320px] space-y-6">
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
              } ${isReleasingCamera ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={() => !isReleasingCamera && handleSelect('rg')}
            >
              <CardContent className="p-5 flex items-center">
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
              } ${isReleasingCamera ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={() => !isReleasingCamera && handleSelect('cnh')}
            >
              <CardContent className="p-5 flex items-center">
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

          {isReleasingCamera && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <p className="text-sm text-blue-800 font-medium">
                  Liberando câmera, aguarde...
                </p>
              </div>
              <p className="text-xs text-blue-600 text-center mt-2">
                Garantindo que a câmera seja completamente liberada antes de prosseguir
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Botão fixado na parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <Button
          onClick={handleContinue}
          disabled={!selectedType || isReleasingCamera}
          className="w-full h-12 bg-[#8425af] text-white hover:bg-[#7a1fa2] font-medium uppercase text-base tracking-wider rounded-none disabled:opacity-50"
        >
          {isReleasingCamera ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              LIBERANDO CÂMERA...
            </>
          ) : (
            'AVANÇAR'
          )}
        </Button>
      </div>
    </div>
  );
};
