
import { Button } from "@/components/ui/button";

type ActivationTypeProps = {
  onSelect: (type: 'self' | 'collaborator') => void;
  onBack: () => void;
};

export function ActivationType({ onSelect, onBack }: ActivationTypeProps) {
  return (
    <div className="w-full max-w-[85%] md:max-w-[420px] mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Para quem será ativado o eSIM?</h2>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => onSelect('self')}
          className="w-full p-4 rounded-lg border border-gray-200 hover:border-[#8425af] hover:bg-[#8425af]/5 transition-all"
        >
          <div className="text-left">
            <h3 className="text-lg font-medium">Para mim mesmo</h3>
            <p className="text-sm text-gray-500">Ativar o eSIM no meu celular</p>
          </div>
        </button>

        <button
          onClick={() => onSelect('collaborator')}
          className="w-full p-4 rounded-lg border border-gray-200 hover:border-[#8425af] hover:bg-[#8425af]/5 transition-all"
        >
          <div className="text-left">
            <h3 className="text-lg font-medium">Para um colaborador</h3>
            <p className="text-sm text-gray-500">Ativar o eSIM no celular de outra pessoa</p>
          </div>
        </button>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button 
          variant="outline"
          className="w-[120px] border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white rounded-lg py-3"
          onClick={onBack}
        >
          Voltar
        </Button>
        <div className="w-[120px]" /> {/* Spacer to maintain layout */}
      </div>
    </div>
  );
}
