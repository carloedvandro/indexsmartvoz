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
      <div className="px-4 py-4 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 flex items-start space-x-3" style={{backgroundColor: '#5f0889'}}>
        <Info className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
        <p className="text-white text-sm leading-relaxed">
          O código de barras do chip deve ter 20 dígitos e começar com 8955. Posicione o código no centro da câmera.
        </p>
      </div>

      {/* Caixa de entrada de dados */}
      <div className="px-6 py-6 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 text-white">
        {selectedLines.length > 0 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-white text-lg mb-3">
                Código de barras do SIM card
              </h3>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <p className="text-white font-medium">
                Linha: DDD {selectedLines[0].ddd}
              </p>
              <Button
                onClick={() => onStartScanning(0)}
                className="px-4 py-2 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg text-white break-words max-w-sm ml-4"
                style={{backgroundColor: '#5f0889'}}
              >
                {selectedLines[0].barcode ? 'Escanear novamente' : 'Escanear código'}
              </Button>
            </div>

            {selectedLines[0].barcode && (
              <>
                <div className="mb-2">
                  <h4 className="font-bold text-gray-300 text-sm">
                    Código escaneado:
                  </h4>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">ICCID:</span>
                  <div className="px-4 py-2 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg text-white break-words max-w-md ml-4">
                    {selectedLines[0].barcode}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Botões inferiores */}
      <div className="flex gap-3 pt-4">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="flex-1 px-4 py-2 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 text-white"
          style={{ borderColor: '#5f0889', backgroundColor: '#5f0889', color: 'white' }}
        >
          Voltar
        </Button>
        <Button 
          onClick={onContinue}
          disabled={!allBarcodesScanned}
          className={`flex-1 px-4 py-2 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 text-white ${
            allBarcodesScanned 
              ? 'hover:opacity-90' 
              : 'text-purple-400 cursor-not-allowed'
          }`}
          style={{backgroundColor: '#5f0889'}}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}