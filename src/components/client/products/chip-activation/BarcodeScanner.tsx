
import { Button } from "@/components/ui/button";
import { Line } from "../ChipActivationFlow";
import { Info } from "lucide-react";

interface BarcodeScannerProps {
  selectedLines: Line[];
  onStartScanning: (index: number) => void;
}

export function BarcodeScannerComponent({ selectedLines, onStartScanning }: BarcodeScannerProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-[342px] mx-auto">
      <div className="w-full flex justify-center mb-4">
        <img 
          src="/lovable-uploads/8681ef58-fb81-4463-8d12-8ede81fcab0a.png" 
          alt="Smartvoz Logo" 
          className="h-[140px] object-contain"
        />
      </div>
      
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2 w-full">
        <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-700">
          O código de barras do chip deve ter 20 dígitos e começar com 8955. Posicione o código no centro da câmera.
        </p>
      </div>
      
      <div className="space-y-4 w-full">
        {selectedLines.map((line, index) => (
          <div key={line.id} className="flex flex-col space-y-3 w-full">
            <div className="p-6 border rounded-lg w-full">
              <div className="flex flex-col space-y-4">
                <p className="font-medium">Código de barras do SIM card</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Linha: DDD {line.ddd}</p>
                  <Button
                    onClick={() => onStartScanning(index)}
                    className="bg-[#8425af] hover:bg-[#6c1e8f] px-4 h-[42px] flex items-center"
                  >
                    {line.barcode ? 'Escanear novamente' : 'Escanear código'}
                  </Button>
                </div>
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
