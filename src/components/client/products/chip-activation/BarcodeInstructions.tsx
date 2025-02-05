import { Button } from "@/components/ui/button";
import { BarcodeScanner } from "./BarcodeScanner";

interface BarcodeInstructionsProps {
  onStartScanning: () => void;
  onBack: () => void;
  onContinue: () => void;
}

export function BarcodeInstructions({ 
  onStartScanning,
  onBack,
  onContinue 
}: BarcodeInstructionsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Ativação do chip</h2>
        <p className="text-gray-600 mb-4">
          Para ativar seu chip, siga as instruções abaixo:
        </p>
        <div className="space-y-4">
          <p className="text-gray-600">
            1. Localize o código de barras no verso do seu chip, conforme exemplo abaixo:
          </p>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/c1471528-92f5-409a-a0c9-a520defbecf5.png" 
              alt="Exemplo de código de barras do chip"
              className="max-w-[400px] w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline"
          className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
          onClick={onBack}
        >
          Voltar
        </Button>
        <Button 
          className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
          onClick={onStartScanning}
        >
          Ler código
        </Button>
      </div>
    </div>
  );
}