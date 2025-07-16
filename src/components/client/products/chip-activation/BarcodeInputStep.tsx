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
      {/* Mensagem sobre prazo do sistema */}
      <div className="px-6 py-8 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 text-center" style={{backgroundColor: '#5f0889'}}>
        <h2 className="text-white text-xl font-bold leading-relaxed">
          O prazo do sistema para concluir ativação<br />
          e o funcionamento da linha neste chip é de<br />
          até 24 horas
        </h2>
      </div>

      {/* Caixa principal */}
      <div className="px-6 py-6 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4" style={{backgroundColor: '#5a008f', borderColor: '#7e3ccf'}}>
        {selectedLines.length > 0 && (
          <div className="space-y-4">
            {/* Cabeçalho */}
            <div>
              <h3 className="font-bold text-white text-lg mb-5">
                Código de barras do SIM card
              </h3>
            </div>
            
            {/* DDD + botão */}
            <div className="flex justify-between items-center mb-5">
              <span className="text-white font-medium text-base">
                Linha: DDD <strong>{selectedLines[0].ddd}</strong>
              </span>
              <Button
                onClick={() => onStartScanning(0)}
                className="px-4 py-2 bg-transparent border border-white rounded-lg text-white font-bold hover:bg-green-500 hover:text-black transition-all duration-300"
              >
                {selectedLines[0].barcode ? 'Escanear novamente' : 'Escanear código'}
              </Button>
            </div>

            {/* ICCID container */}
            {selectedLines[0].barcode && (
              <div className="rounded-lg p-4 border" style={{backgroundColor: '#7a00b9', borderColor: '#a060ff'}}>
                <div className="flex items-center gap-4">
                  <span className="text-white text-base">
                    ✅ <strong>{selectedLines[0].ddd}</strong>
                  </span>
                  <span className="text-white text-base">
                    <strong>ICCID</strong> {selectedLines[0].barcode}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botões inferiores */}
      <div className="flex justify-between gap-4 pt-4">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="px-6 py-3 text-white font-bold border-none rounded-lg"
          style={{backgroundColor: '#4a0072'}}
        >
          Voltar
        </Button>
        <Button 
          onClick={onContinue}
          disabled={!allBarcodesScanned}
          className="px-6 py-3 text-white font-bold border-none rounded-lg"
          style={{backgroundColor: '#4a0072'}}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}