
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CaptureInstructionsProps {
  onNext: () => void;
  onBack: () => void;
}

export const CaptureInstructions = ({ onNext, onBack }: CaptureInstructionsProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Instruções para Captura</h2>
        <div className="space-y-4 text-left max-w-md mx-auto">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Prepare o ambiente:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Escolha um local bem iluminado</li>
              <li>Evite fundos muito claros ou escuros</li>
              <li>Remova óculos, máscaras ou outros acessórios</li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Durante a captura:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Mantenha uma expressão neutra</li>
              <li>Olhe diretamente para a câmera</li>
              <li>Evite movimentos bruscos</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 max-w-xs mx-auto">
        <Button onClick={onNext} className="w-full">
          Continuar
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
      </div>
    </div>
  );
};
