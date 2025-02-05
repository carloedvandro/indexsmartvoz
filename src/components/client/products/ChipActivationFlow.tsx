import { Button } from "@/components/ui/button";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { ChipInstructions } from "./chip-activation/ChipInstructions";
import { BarcodeInstructions } from "./chip-activation/BarcodeInstructions";
import { BarcodeScannerComponent } from "./chip-activation/BarcodeScanner";

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

export type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  barcode?: string;
};

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
  return (
    <>
      {scanningIndex !== null && (
        <BarcodeScanner
          onResult={(result) => onUpdateBarcode(scanningIndex, result)}
          onClose={onScanningClose}
        />
      )}
      
      <div className="w-full max-w-[320px] mx-auto overflow-hidden">
        <div className="pt-8 space-y-6">
          {currentStep === 4 && <ChipInstructions />}
          {currentStep === 5 && <BarcodeInstructions onBack={onBack} onContinue={onContinue} />}
          {currentStep === 6 && (
            <>
              <BarcodeScannerComponent
                selectedLines={selectedLines}
                onStartScanning={onStartScanning}
              />
              <div className="flex justify-between mt-8 px-4">
                <Button 
                  variant="outline" 
                  className="bg-white border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white w-[120px] h-[42px] flex items-center justify-center"
                  onClick={onBack}
                >
                  Voltar
                </Button>
                <Button 
                  className="bg-[#8425af] hover:bg-[#6c1e8f] text-white w-[120px] h-[42px] flex items-center justify-center"
                  onClick={onContinue}
                >
                  Continuar
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}