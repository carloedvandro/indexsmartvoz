import { Button } from "@/components/ui/button";
import { Line } from "../ChipActivationFlow";

interface BarcodeScannerProps {
  selectedLines: Line[];
  onStartScanning: (index: number) => void;
}

export function BarcodeScannerComponent({ selectedLines, onStartScanning }: BarcodeScannerProps) {
  return (
    <div className="space-y-6 w-[360px] mx-auto">
      <h2 className="text-xl font-semibold">Escaneie o código de barra do chip</h2>
      <div className="space-y-4">
        {selectedLines.map((line, index) => (
          <div key={line.id} className="flex flex-col space-y-3">
            <div className="p-6 border rounded-lg w-[100%]">
              <div className="flex flex-col space-y-4">
                <p className="font-medium">Código de barras do SIM card</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Linha: DDD {line.ddd}</p>
                  <Button
                    onClick={() => onStartScanning(index)}
                    className="bg-[#8425af] hover:bg-[#6c1e8f]"
                  >
                    {line.barcode ? 'Escanear novamente' : 'Escanear código'}
                  </Button>
                </div>
              </div>
            </div>
            {line.barcode && (
              <div className="px-4 py-3 rounded w-[100%]">
                <p className="text-sm font-medium text-gray-700">Código escaneado:</p>
                <div className="flex flex-col gap-2 mt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">ICCID:</span>
                    <p className="text-lg font-mono p-2 border border-[#e2e8f0] rounded w-full">
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