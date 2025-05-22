
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";

interface BarcodeGuideStepProps {
  onBack: () => void;
  onContinue: () => void;
}

export function BarcodeGuideStep({ onBack, onContinue }: BarcodeGuideStepProps) {
  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">
        COMO ENCONTRAR?
      </h2>
      
      <p className="text-gray-700 mb-4">
        O código de barras está impresso no cartão do Chip, tem 20 números e começa com 8955, conforme o exemplo:
      </p>
      
      <div className="flex justify-center mb-8">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-w-md">
          <Image
            src="/lovable-uploads/c59ef7e4-383e-44b9-9b59-074ec5fb44d2.png"
            alt="Exemplo de código de barras no SIM card"
            className="w-full h-auto"
          />
        </div>
      </div>
      
      <div className="flex justify-between space-x-4">
        <Button 
          variant="outline" 
          className="flex-1 bg-white border-purple-700 text-purple-700 hover:bg-purple-50"
          onClick={onBack}
        >
          Voltar
        </Button>
        <Button 
          className="flex-1 bg-purple-700 hover:bg-purple-800 text-white"
          onClick={onContinue}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
