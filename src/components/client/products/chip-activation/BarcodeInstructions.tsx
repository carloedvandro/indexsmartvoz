import { Button } from "@/components/ui/button";

interface BarcodeInstructionsProps {
  onBack: () => void;
  onContinue: () => void;
}

export function BarcodeInstructions({ onBack, onContinue }: BarcodeInstructionsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium">Confira como você encontra o código de barras do SIM card</h2>
      
      <div className="flex items-center justify-between max-w-xl mx-auto relative">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-6 rounded-full bg-[#8425af] flex items-center justify-center text-white text-sm">✓</div>
          <span className="text-sm font-medium text-gray-700">Identidade</span>
        </div>

        <div className="flex-1 h-[2px] bg-[#8425af]"></div>

        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-6 rounded-full bg-[#8425af] border-2 border-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
          </div>
          <span className="text-sm font-medium text-[#8425af]">SIM Card</span>
        </div>

        <div className="flex-1 h-[2px] bg-gray-200"></div>

        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
          </div>
          <span className="text-sm font-medium text-gray-500">Linhas</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">COMO ENCONTRAR?</h3>
        <p className="text-gray-600">
          O código de barras está impresso no cartão do Chip, tem 20 números e começa com 8955, conforme o exemplo:
        </p>

        <div className="mt-8 flex justify-center">
          <img 
            src="/lovable-uploads/c1471528-92f5-409a-a0c9-a520defbecf5.png" 
            alt="Exemplo de código de barras do chip"
            className="max-w-[1200px] w-full"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline"
          className="hover:bg-[#8425af] hover:text-white border-[#8425af] text-[#8425af]"
          onClick={onBack}
          type="button"
        >
          Voltar
        </Button>
        <Button 
          className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
          onClick={onContinue}
          type="button"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}