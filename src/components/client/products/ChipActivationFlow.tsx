
import { BarcodeScannerContainer } from "./chip-activation/BarcodeScannerContainer";
import { ScanningAnimationStyle } from "./chip-activation/ScanningAnimationStyle";
import { ChipActivationStepContent } from "./chip-activation/ChipActivationStepContent";

export type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  barcode?: string;
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
  onScanningClose,
}: ChipActivationFlowProps) {
  // Verifica se todos os códigos de barras foram escaneados
  const allBarcodesScanned = selectedLines.every(line => line.barcode);
  
  return (
    <>
      <ScanningAnimationStyle />
      
      <BarcodeScannerContainer 
        scanningIndex={scanningIndex}
        onUpdateBarcode={onUpdateBarcode}
        onScanningClose={onScanningClose}
      />
      
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-[342px] mx-auto">
          <div className="pt-16 space-y-8">
            <ChipActivationStepContent
              currentStep={currentStep}
              selectedLines={selectedLines}
              allBarcodesScanned={allBarcodesScanned}
              onBack={onBack}
              onContinue={onContinue}
              onStartScanning={onStartScanning}
            />
          </div>
        </div>
      </div>
    </>
  );
}
