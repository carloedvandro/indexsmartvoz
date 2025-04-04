
import { Button } from "@/components/ui/button";

interface BarcodeInstructionsProps {
  onBack?: () => void;
  onContinue?: () => void;
}

export function BarcodeInstructions({ onBack, onContinue }: BarcodeInstructionsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium">Confira como você encontra o código de barras do SIM card</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">COMO ENCONTRAR?</h3>
        <p className="text-gray-600">
          O código de barras está impresso no cartão do Chip, tem 20 números e começa com 8955, conforme o exemplo:
        </p>

        <div className="mt-8 flex justify-center">
          <img 
            src="/lovable-uploads/c1471528-92f5-409a-a0c9-a520defbecf5.png" 
            alt="Exemplo de código de barras do chip"
            className="max-w-[340px] w-full"
          />
        </div>
      </div>

      {(onBack || onContinue) && (
        <div className="flex justify-between gap-4">
          {onBack && (
            <Button 
              variant="outline"
              className="hover:bg-[#8425af] hover:text-white border-[#8425af] text-[#8425af] flex-1"
              onClick={onBack}
              type="button"
            >
              Voltar
            </Button>
          )}
          
          {onContinue && (
            <Button 
              className="bg-[#8425af] hover:bg-[#6c1e8f] text-white flex-1"
              onClick={onContinue}
              type="button"
            >
              Continuar
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
