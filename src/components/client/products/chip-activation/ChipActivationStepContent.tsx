
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
                    {line.orderData && (
                      <p className="text-sm text-blue-600">
                        Protocolo: {line.orderData.id}
                      </p>
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
                
                {/* Campo para DDD após escanear */}
                {line.barcode && (
                  <div className="pt-3 border-t">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      DDD (opcional):
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 11"
                      maxLength={2}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8425af] text-center"
                      onChange={(e) => {
                        const updatedLines = [...selectedLines];
                        updatedLines[index] = {
                          ...updatedLines[index],
                          ddd: e.target.value
                        };
                        // Note: This would need to be handled by the parent component
                        // For now, just update the display
                      }}
                    />
                  </div>
                )}
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
