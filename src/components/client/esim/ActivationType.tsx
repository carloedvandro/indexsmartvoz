
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useState } from "react";

type ActivationTypeProps = {
  onSelect: (type: 'self' | 'collaborator') => void;
  onBack: () => void;
};

export function ActivationType({ onSelect, onBack }: ActivationTypeProps) {
  const [selectedType, setSelectedType] = useState<'self' | 'collaborator'>('self');

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          Selecione o tipo de ativação do eSIM
        </h2>
      </div>

      <div className="bg-[#212529] text-white rounded-lg p-4 flex items-center gap-2">
        <Info className="w-5 h-5" />
        <p className="text-sm">
          Escolha se você está ativando para você mesmo ou para outra pessoa
        </p>
      </div>

      <div className="space-y-4 mt-4">
        <div 
          className={`p-4 rounded-lg border hover:border-[#8425af] cursor-pointer transition-all ${
            selectedType === 'self' ? 'border-[#8425af]' : 'border-gray-200'
          }`}
          onClick={() => setSelectedType('self')}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="type"
              id="self"
              className="accent-[#8425af]"
              checked={selectedType === 'self'}
              onChange={() => setSelectedType('self')}
            />
            <label htmlFor="self" className="text-lg font-medium">
              Para mim mesmo
            </label>
          </div>
        </div>

        <div 
          className={`p-4 rounded-lg border hover:border-[#8425af] cursor-pointer transition-all ${
            selectedType === 'collaborator' ? 'border-[#8425af]' : 'border-gray-200'
          }`}
          onClick={() => setSelectedType('collaborator')}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="type"
              id="collaborator"
              className="accent-[#8425af]"
              checked={selectedType === 'collaborator'}
              onChange={() => setSelectedType('collaborator')}
            />
            <label htmlFor="collaborator" className="text-lg font-medium">
              Para outra pessoa
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button 
          variant="outline"
          className="border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white px-6"
          onClick={onBack}
        >
          Voltar
        </Button>
        <Button 
          onClick={() => onSelect(selectedType)}
          className="bg-[#8425af] hover:bg-[#6c1e8f] text-white px-6"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
