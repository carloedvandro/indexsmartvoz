
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
          <h2 className="text-xl font-semibold">Escaneie os códigos de barras</h2>
          <p className="text-gray-600">
            Clique no botão abaixo para escanear o código de barras do chip e ativar sua linha.
          </p>
          
          <div className="space-y-3">
            {selectedLines.map((line, index) => (
              <div key={line.id} className="flex flex-col p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{line.internet} - {line.type}</p>
                    <p className="text-sm text-gray-600">
                      Valor: R$ {line.price?.toFixed(2)}
                    </p>
                    {line.ddd && (
                      <p className="text-sm text-green-600">DDD: {line.ddd}</p>
                    )}
                    {line.barcode && (
                      <p className="text-sm text-green-600">✓ Código: {line.barcode}</p>
                    )}
                  </div>
                  <button
                    onClick={() => onStartScanning(index)}
                    className={`px-4 py-2 rounded text-sm font-medium ${
                      line.barcode 
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
