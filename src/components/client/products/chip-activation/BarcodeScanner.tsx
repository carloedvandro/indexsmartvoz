import { Button } from "@/components/ui/button";
import { Line } from "../ChipActivationFlow";

interface BarcodeScannerProps {
  selectedLines: Line[];
  onStartScanning: (index: number) => void;
}

export function BarcodeScannerComponent({ selectedLines, onStartScanning }: BarcodeScannerProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Escaneie o código de barra do chip</h2>
      <div className="space-y-4">
        {selectedLines.map((line, index) => (
          <div key={line.id} className="flex flex-col space-y-3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Código de barras do SIM card</p>
                  <p className="text-sm text-gray-500">Linha: {line.ddd}</p>
                </div>
                <Button
                  onClick={() => onStartScanning(index)}
                  className="bg-[#8425af] hover:bg-[#6c1e8f]"
                >
                  {line.barcode ? 'Escanear novamente' : 'Escanear código'}
                </Button>
              </div>
            </div>
            {line.barcode && (
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-700">Código escaneado:</p>
                <p className="text-sm font-mono">{line.barcode}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}