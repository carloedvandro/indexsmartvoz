
import { Button } from "@/components/ui/button";
import { Line } from "../ChipActivationFlow";
import { Info } from "lucide-react";

interface BarcodeScannerProps {
  selectedLines: Line[];
  onStartScanning: (index: number) => void;
}

export function BarcodeScannerComponent({ selectedLines, onStartScanning }: BarcodeScannerProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-[380px] mx-auto">
      <h2 className="text-xl font-semibold text-center mb-6">Escaneie o código de barra do chip</h2>
      
      <div className="mb-4 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-2 w-full">
        <Info size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-700">
          O código de barras do chip deve ter 20 dígitos e começar com 8955. Posicione o código no centro da câmera.
        </p>
      </div>
      
      <div className="space-y-4 w-full border-t border-gray-200 pt-4">
        {selectedLines.map((line, index) => (
          <div key={line.id} className="w-full">
            <div className="flex flex-col space-y-2">
              <p className="font-medium text-lg">Código de barras do SIM card</p>
              <div className="flex items-center justify-between">
                <p className="text-md text-gray-700">Linha: DDD {line.ddd}</p>
                <Button
                  onClick={() => onStartScanning(index)}
                  className="bg-[#8425af] hover:bg-[#6c1e8f] px-6 py-2 rounded-md"
                >
                  {line.barcode ? 'Escanear novamente' : 'Escanear código'}
                </Button>
              </div>
            </div>
            
            {line.barcode && (
              <div className="py-3 w-full">
                <p className="text-sm font-medium text-gray-700">Código escaneado:</p>
                <div className="flex flex-col gap-2 mt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">ICCID:</span>
                    <p className="text-sm font-mono p-2 border border-[#e2e8f0] rounded w-full">
                      {line.barcode}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
