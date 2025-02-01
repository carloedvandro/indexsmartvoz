import { useZxing } from "react-zxing";

interface BarcodeScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  const { ref } = useZxing({
    onDecodeResult(result) {
      const text = result.getText();
      // Só aceita códigos com 20 dígitos que começam com 8955
      if (text.length === 20 && text.startsWith('8955')) {
        onResult(text);
        onClose();
      }
    },
    constraints: {
      facingMode: { exact: "environment" }
    },
    timeBetweenDecodingAttempts: 300,
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-[90%] max-w-[320px] mx-auto">
        <div className="relative aspect-[4/1]">
          <video ref={ref} className="absolute inset-0 w-full h-full object-cover rounded" />
          <div className="absolute inset-0 border-2 border-[#8425af] rounded pointer-events-none">
            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#8425af]/30" />
            <div className="absolute inset-y-0 left-1/4 w-0.5 bg-[#8425af]/30" />
            <div className="absolute inset-y-0 right-1/4 w-0.5 bg-[#8425af]/30" />
          </div>
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