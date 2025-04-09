
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Circle } from "lucide-react";

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
          
          {/* Stepper indicator */}
          <div className="flex items-center justify-between max-w-md mx-auto mb-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#8425af] flex items-center justify-center text-white">
                <Check className="w-5 h-5" />
              </div>
              <span className="text-sm mt-1 text-[#8425af] font-medium">Identidade</span>
            </div>
            <div className="h-0.5 flex-1 bg-[#8425af] mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border-2 border-[#8425af] flex items-center justify-center text-[#8425af]">
                <Circle className="w-4 h-4 fill-[#8425af] stroke-[#8425af]" />
              </div>
              <span className="text-sm mt-1 text-[#8425af] font-medium">SIM Card</span>
            </div>
            <div className="h-0.5 flex-1 bg-gray-200 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-300">
                <Circle className="w-4 h-4 fill-gray-200 stroke-gray-300" />
              </div>
              <span className="text-sm mt-1 text-gray-400">Linhas</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">COMO ENCONTRAR?</h3>
            <p className="text-gray-600">
              O código de barras está impresso no cartão do Chip, tem 20 números e começa com 8955, conforme o exemplo:
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
            className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white flex-1"
          >
            Voltar
          </Button>
          <Button 
            className="bg-[#8425af] hover:bg-[#6c1e8f] flex-1"
            onClick={onContinue}
          >
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
