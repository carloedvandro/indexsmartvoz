import { useZxing } from "react-zxing";

interface BarcodeScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  const { ref } = useZxing({
    onDecodeResult(result) {
      onResult(result.getText());
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-md w-full mx-4">
        <div className="relative">
          <video ref={ref} className="w-full rounded" />
          <div className="absolute inset-0 border-2 border-[#8425af] rounded pointer-events-none" />
        </div>
        <div className="mt-4 text-center space-y-2">
          <p className="text-sm text-gray-600">Posicione o código de barras do chip dentro da área</p>
          <button
            onClick={onClose}
            className="text-[#8425af] font-medium"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}