
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, CheckCircle } from "lucide-react";
import { Line } from "../ChipActivationFlow";

interface BarcodeScannerComponentProps {
  selectedLines: Line[];
  onStartScanning: (index: number) => void;
}

export function BarcodeScannerComponent({
  selectedLines,
  onStartScanning
}: BarcodeScannerComponentProps) {
  console.log('📱 [BARCODE-SCANNER] Linhas para escanear:', selectedLines);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Escaneie os códigos de barras</h2>
        <p className="text-gray-600">
          Escaneie o código de barras de cada chip para finalizar a ativação
        </p>
      </div>

      {selectedLines.map((line, index) => (
        <Card key={line.id || index} className="w-full">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium">{line.internet}</h3>
                <p className="text-sm text-gray-600">{line.type}</p>
                {line.ddd && <p className="text-sm text-gray-600">DDD: {line.ddd}</p>}
                <p className="text-sm font-medium text-green-600">R$ {line.price.toFixed(2)}</p>
              </div>
              
              <div className="flex items-center gap-3">
                {line.barcode ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Escaneado</span>
                  </div>
                ) : (
                  <Button
                    onClick={() => onStartScanning(index)}
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    <QrCode className="h-4 w-4" />
                    Escanear
                  </Button>
                )}
              </div>
            </div>
            
            {line.barcode && (
              <div className="mt-3 p-2 bg-gray-50 rounded text-xs font-mono">
                {line.barcode}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
