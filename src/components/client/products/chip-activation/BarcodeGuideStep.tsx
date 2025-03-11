
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface BarcodeGuideStepProps {
  onBack: () => void;
  onContinue: () => void;
}

export function BarcodeGuideStep({ onBack, onContinue }: BarcodeGuideStepProps) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Confira como você encontra o código de barras do SIM card</h2>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">COMO ENCONTRAR?</h3>
            <p className="text-gray-600">
              O código de barras está impresso no cartão do Vivo Chip, tem 20 números e começa com 8955, conforme o exemplo:
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <img 
                src="/lovable-uploads/f5d55154-a62e-475f-b8de-b65ac463b3fc.png" 
                alt="Exemplo de código de barras do SIM card"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button 
            variant="outline"
            onClick={onBack}
          >
            Voltar
          </Button>
          <Button 
            className="bg-[#8425af] hover:bg-[#6c1e8f]"
            onClick={onContinue}
          >
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
