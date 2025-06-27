
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
  planId?: string;
  planName?: string;
  orderData?: any;
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
  onUpdateDDD?: (index: number, ddd: string) => void;
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
  onUpdateDDD,
}: ChipActivationFlowProps) {
  // Verifica se todos os códigos de barras foram escaneados
  const allBarcodesScanned = selectedLines.every(line => line.barcode);
  
  return (
    <>
      <ScanningAnimationStyle />
      
      {/* Logo fixada no topo - navbar simples */}
      <div className="fixed top-0 left-0 right-0 bg-white px-4 py-2 z-50 shadow-sm">
        <div className="flex items-center justify-center">
          <img
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
            alt="Smartvoz"
            className="h-16 object-contain"
          />
        </div>
      </div>
      
      <BarcodeScannerContainer 
        scanningIndex={scanningIndex}
        onUpdateBarcode={onUpdateBarcode}
        onScanningClose={onScanningClose}
      />
      
      <div className="flex flex-col items-center w-full pt-20">
        <div className="w-full max-w-[342px] mx-auto">
          <div className="pt-16 space-y-8">
            <ChipActivationStepContent
              currentStep={currentStep}
              selectedLines={selectedLines}
              allBarcodesScanned={allBarcodesScanned}
              onBack={onBack}
              onContinue={onContinue}
              onStartScanning={onStartScanning}
              onUpdateDDD={onUpdateDDD}
            />
          </div>
        </div>
      </div>
    </>
  );
}
