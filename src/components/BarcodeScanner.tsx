import { Button } from "@/components/ui/button";

interface BarcodeScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-md w-full mx-4">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Escaneie o código de barras</h2>
          <p className="text-sm text-gray-600">
            Posicione o código de barras do chip na frente da câmera
          </p>
          
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Câmera não disponível</p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={() => onResult("895519123456789012")}>
              Simular Leitura
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}