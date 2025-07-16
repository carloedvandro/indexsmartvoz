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
    <div className="space-y-6 -mt-20 pt-10">
      {/* Caixa de alerta azul informativa */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <p className="text-blue-800 text-sm leading-relaxed">
          O código de barras do chip deve ter 20 dígitos e começar com 8955. Posicione o código no centro da câmera.
        </p>
      </div>

      {/* Caixa de entrada de dados */}
      <div className="px-4 py-4 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 text-white">
        {selectedLines.length > 0 && (
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-white text-base">
                Código de barras do SIM card
              </h3>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-white">
                Linha: DDD {selectedLines[0].ddd}
              </p>
              <Button
                onClick={() => onStartScanning(0)}
                className="bg-white hover:bg-gray-100 text-purple-700 px-6 py-2 rounded-lg font-medium"
              >
                {selectedLines[0].barcode ? 'Escanear novamente' : 'Escanear código'}
              </Button>
            </div>

            {selectedLines[0].barcode && (
              <div className="mt-4 space-y-3">
                <div style={{ backgroundColor: '#5f0889' }}>
                  <h4 className="font-medium text-white text-sm mb-2">
                    Código escaneado:
                  </h4>
                  <input
                    type="text"
                    value={`ICCID: ${selectedLines[0].barcode}`}
                    readOnly
                    className="w-full p-2 border border-white rounded bg-purple-700 text-white text-base pointer-events-none focus:outline-none"
                    tabIndex={-1}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botões inferiores */}
      <div className="flex gap-3 pt-4">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="flex-1 px-4 py-4 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4"
          style={{ borderColor: '#5f0889', backgroundColor: '#5f0889', color: 'white' }}
        >
          Voltar
        </Button>
        <Button 
          onClick={onContinue}
          disabled={!allBarcodesScanned}
          className={`flex-1 px-4 py-4 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 ${
            allBarcodesScanned 
              ? 'text-white hover:opacity-90' 
              : 'text-purple-400 cursor-not-allowed'
          }`}
          style={allBarcodesScanned ? { backgroundColor: '#5f0889' } : undefined}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}