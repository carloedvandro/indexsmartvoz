
import { ChipInstructions } from "./ChipInstructions";
import { BarcodeInstructions } from "./BarcodeInstructions";
import { NavigationButtons } from "./NavigationButtons";

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

interface ChipActivationStepContentProps {
  currentStep: number;
  selectedLines: Line[];
  allBarcodesScanned: boolean;
  onBack: () => void;
  onContinue: () => void;
  onStartScanning: (index: number) => void;
  onUpdateDDD?: (index: number, ddd: string) => void; // Opcional, mas não usado mais
}

export function ChipActivationStepContent({
  currentStep,
  selectedLines,
  allBarcodesScanned,
  onBack,
  onContinue,
  onStartScanning,
}: ChipActivationStepContentProps) {
  // Each step is rendered as its own screen
  if (currentStep === 4) {
    return (
      <div className="flex flex-col space-y-6">
        <ChipInstructions />
        <NavigationButtons
          onBack={onBack}
          onContinue={onContinue}
        />
      </div>
    );
  }

  if (currentStep === 5) {
    return (
      <div className="flex flex-col space-y-6">
        <BarcodeInstructions />
        <NavigationButtons
          onBack={onBack}
          onContinue={onContinue}
        />
      </div>
    );
  }

  if (currentStep === 6) {
    return (
      <div className="flex flex-col space-y-6">
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm ">
            O código de barras do chip deve ter 20 digitos e começar com 8955. Posicione o código no centro da câmera.
          </div>
          <div className="space-y-3">
            {selectedLines.map((line, index) => (
              <div key={line.id} className="flex flex-col p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="">
                    <p className="font-medium">Código de barras do SIM card</p>
                    {line.ddd && (
                      <p className="text-sm text-gray-600">Linha DDD: {line.ddd}</p>
                    )}
                    {line.barcode && (
                      <p className="text-sm text-green-600">✓ Código: {line.barcode}</p>
                    )}
                  </div>

                  <button
                    onClick={() => onStartScanning(index)}
                    className={`px-4 py-2 rounded text-sm font-medium ${line.barcode
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : 'bg-[#8425af] text-white hover:bg-[#6c1e8f]'
                      }`}
                    disabled={!!line.barcode}
                  >
                    {line.barcode ? 'Escaneado' : 'Escanear Código'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <NavigationButtons
          onBack={onBack}
          onContinue={onContinue}
          disabled={!allBarcodesScanned}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="text-center">
        <p className="text-gray-600">Passo não encontrado: {currentStep}</p>
      </div>
      <NavigationButtons
        onBack={onBack}
        onContinue={onContinue}
      />
    </div>
  );
}
