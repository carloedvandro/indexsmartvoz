import { Button } from "@/components/ui/button";

interface BarcodeInstructionsProps {
  onBack: () => void;
  onContinue: () => void;
}

export function BarcodeInstructions({ onBack, onContinue }: BarcodeInstructionsProps) {
  return (
    <div className="space-y-6 w-full">
      <h2 className="text-2xl font-medium">Confira como você encontra o código de barras do SIM card</h2>
      
      <div className="flex items-center justify-between max-w-xl mx-auto relative">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[#8425af] rounded-full flex items-center justify-center text-white text-xl font-bold mb-2">
            1
          </div>
          <span className="text-center text-sm">
            Retire o chip do cartão
          </span>
        </div>

        <div className="h-[2px] flex-1 bg-gray-300 mx-4" />

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[#8425af] rounded-full flex items-center justify-center text-white text-xl font-bold mb-2">
            2
          </div>
          <span className="text-center text-sm">
            Localize o código de barras
          </span>
        </div>

        <div className="h-[2px] flex-1 bg-gray-300 mx-4" />

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[#8425af] rounded-full flex items-center justify-center text-white text-xl font-bold mb-2">
            3
          </div>
          <span className="text-center text-sm">
            Escaneie o código
          </span>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
          onClick={onBack}
        >
          Voltar
        </Button>
        <Button 
          className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
          onClick={onContinue}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}