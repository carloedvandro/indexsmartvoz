
import { BarcodeGuideStep } from "./chip-activation/BarcodeGuideStep";
import { ChipActivationStepContent } from "./chip-activation/ChipActivationStepContent";
import { BarcodeScannerContainer } from "./chip-activation/BarcodeScannerContainer";

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

interface ChipActivationFlowProps {
  currentStep: number;
  selectedLines: Line[];
  scanningIndex: number | null;
  onBack: () => void;
  onContinue: () => void;
  onStartScanning: (index: number) => void;
  onUpdateBarcode: (index: number, barcode: string) => void;
  onScanningClose: () => void;
}

export function ChipActivationFlow({
  currentStep,
  selectedLines,
  scanningIndex,
  onBack,
  onContinue,
  onStartScanning,
  onUpdateBarcode,
  onScanningClose
}: ChipActivationFlowProps) {
  const allBarcodesScanned = selectedLines.every(line => line.barcode);

  if (currentStep === 4) {
    return (
      <div>
        <BarcodeGuideStep
          onBack={onBack}
          onContinue={onContinue}
        />
      </div>
    );
  }

  return (
    <div className="pt-20 flex items-center justify-center min-h-screen" style={{ backgroundColor: '#5f0889' }}>
      <div className="w-full max-w-md mx-auto p-4">
        
        {currentStep === 6 ? (
          // Para o step 6, renderizar sem o container extra já que tem layout próprio
          <>
            <ChipActivationStepContent
              currentStep={currentStep}
              selectedLines={selectedLines}
              allBarcodesScanned={allBarcodesScanned}
              onBack={onBack}
              onContinue={onContinue}
              onStartScanning={onStartScanning}
            />
            <BarcodeScannerContainer
              scanningIndex={scanningIndex}
              onUpdateBarcode={onUpdateBarcode}
              onScanningClose={onScanningClose}
            />
          </>
        ) : (
          // Para outros steps, manter o layout original
          <>
            <ChipActivationStepContent
              currentStep={currentStep}
              selectedLines={selectedLines}
              allBarcodesScanned={allBarcodesScanned}
              onBack={onBack}
              onContinue={onContinue}
              onStartScanning={onStartScanning}
            />
            <BarcodeScannerContainer
              scanningIndex={scanningIndex}
              onUpdateBarcode={onUpdateBarcode}
              onScanningClose={onScanningClose}
            />
          </>
        )}
      </div>
    </div>
  );
}
