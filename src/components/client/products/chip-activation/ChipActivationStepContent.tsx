
import { ChipInstructions } from "./ChipInstructions";
import { BarcodeInstructions } from "./BarcodeInstructions";
import { NavigationButtons } from "./NavigationButtons";
import { Line } from "../ChipActivationFlow";

interface ChipActivationStepContentProps {
  currentStep: number;
  selectedLines: Line[];
  allBarcodesScanned: boolean;
  onBack: () => void;
  onContinue: () => void;
  onStartScanning: (index: number) => void;
}

export function ChipActivationStepContent({
  currentStep,
  selectedLines,
  allBarcodesScanned,
  onBack,
  onContinue,
  onStartScanning
}: ChipActivationStepContentProps) {
  console.log('🔍 [CHIP-STEP-CONTENT] Renderizando step:', currentStep);
  console.log('📋 [CHIP-STEP-CONTENT] Lines:', selectedLines);

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
            Clique no botão abaixo para cada linha que deseja ativar e escaneie o código de barras do chip.
          </p>
          
          <div className="space-y-3">
            {selectedLines.map((line, index) => (
              <div key={line.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{line.internet} - {line.type}</p>
                  <p className="text-sm text-gray-600">DDD: {line.ddd || "Não informado"}</p>
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
                  {line.barcode ? 'Escaneado' : 'Escanear'}
                </button>
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
  
  // Fallback para steps não reconhecidos
  console.warn('⚠️ [CHIP-STEP-CONTENT] Step não reconhecido:', currentStep);
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
