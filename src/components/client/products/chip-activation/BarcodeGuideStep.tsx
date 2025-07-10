import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Circle } from "lucide-react";
interface BarcodeGuideStepProps {
  onBack: () => void;
  onContinue: () => void;
}
export function BarcodeGuideStep({
  onBack,
  onContinue
}: BarcodeGuideStepProps) {
  return <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md mx-auto p-4 space-y-4">
        
        <div className="pt-6 space-y-8 ">
          <div className="space-y-7 mt-6">
            <h2 className="text-2xl font-bold scale-[1] origin-left">Confira como você encontra o código de barras do SIM card</h2>

            {/* Stepper indicator */}
            <div className="flex items-center justify-between max-w-md mx-auto mb-4 mt-1">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-[#8425af] flex items-center justify-center text-white">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm mt-1 text-[#8425af] font-medium">Identidade</span>
              </div>
              
              <div className="flex flex-col items-center flex-1">
                <div className="h-0.5 w-full bg-[#8425af] mb-4"></div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full border-2 border-[#8425af] flex items-center justify-center text-[#8425af]">
                  <Circle className="w-3 h-3 fill-[#8425af] stroke-[#8425af]" />
                </div>
                <span className="text-sm mt-1 text-[#8425af] font-medium">SIM Card</span>
              </div>
              
              <div className="flex flex-col items-center flex-1">
                <div className="h-0.5 w-full bg-gray-200 mb-4"></div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-300">
                  <Circle className="w-3 h-3 fill-gray-200 stroke-gray-300" />
                </div>
                <span className="text-sm mt-1 text-gray-400">Linhas</span>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-lg font-semibold">COMO ENCONTRAR?</h3>
              <p className="text-gray-600 scale-[1.050] origin-left">
                O código de barras está impresso no cartão do Chip, tem 20 números e começa com 8955, conforme o exemplo:
              </p>

              <img src="/lovable-uploads/8592bc80-f516-440a-a660-d17446a9528d.png" alt="Exemplo de código de barras do SIM card" className="max-w-full h-auto scale-[1.03]" />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onBack} className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white flex-1">
              Voltar
            </Button>
            <Button className="bg-[#8425af] hover:bg-[#6c1e8f] flex-1 space-y-4" onClick={onContinue}>
              Continuar
            </Button>
          </div>
        </div></div></div>;
}