
import { Card, CardContent } from "@/components/ui/card";

export function BarcodeInstructions() {
  return (
    <div className="space-y-6 px-4 py-4 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Escaneie o código de barras do chip</h2>
        <p className="text-gray-600">
          Use a câmera do seu dispositivo para escanear o código de barras que está na embalagem do chip SIM.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Instruções:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Posicione o código de barras dentro da área de escaneamento</li>
          <li>Mantenha o dispositivo estável</li>
          <li>Certifique-se de que há boa iluminação</li>
          <li>O código será lido automaticamente</li>
        </ul>
      </div>
    </div>
  );
}
