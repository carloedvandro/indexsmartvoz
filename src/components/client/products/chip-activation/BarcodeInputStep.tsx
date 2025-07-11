import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

export type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  barcode?: string;
  planId?: string;
  planName?: string;
};

interface BarcodeInputStepProps {
  selectedLines: Line[];
  allBarcodesScanned: boolean;
  onBack: () => void;
  onContinue: () => void;
  onStartScanning: (index: number) => void;
}

export function BarcodeInputStep({
  selectedLines,
  allBarcodesScanned,
  onBack,
  onContinue,
  onStartScanning
}: BarcodeInputStepProps) {
  return (
    <div className="space-y-6 -mt-20 pt-20">
      {/* Caixa de alerta azul informativa */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <p className="text-blue-800 text-sm leading-relaxed">
          O código de barras do chip deve ter 20 dígitos e começar com 8955. Posicione o código no centro da câmera.
        </p>
      </div>

      {/* Caixa de entrada de dados */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          {selectedLines.map((line, index) => (
            <div key={line.id} className="space-y-3">
              <div>
                <h3 className="font-medium text-gray-900 text-base">
                  Código de barras do SIM card
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Linha: DDD {line.ddd}
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button
                  onClick={() => onStartScanning(index)}
                  className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-medium"
                  disabled={!!line.barcode}
                >
                  {line.barcode ? 'Código Escaneado' : 'Escanear código'}
                </Button>
              </div>

              {line.barcode && (
                <div className="mt-2 p-2 bg-green-50 rounded text-sm text-green-700">
                  ✓ Código: {line.barcode}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Botões inferiores */}
      <div className="flex gap-3 pt-4">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="flex-1 border-purple-700 text-purple-700 hover:bg-purple-50"
        >
          Voltar
        </Button>
        <Button 
          onClick={onContinue}
          disabled={!allBarcodesScanned}
          className={`flex-1 ${
            allBarcodesScanned 
              ? 'bg-purple-700 hover:bg-purple-800 text-white' 
              : 'bg-purple-200 text-purple-400 cursor-not-allowed'
          }`}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}