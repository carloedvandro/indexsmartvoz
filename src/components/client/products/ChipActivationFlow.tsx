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
  // Verifica se todos os chips têm código de barras escaneado
  const allChipsScanned = selectedLines.every((line) => line.barcode);

  return (
    <>
      {scanningIndex !== null && (
        <BarcodeScanner
          onResult={(result) => onUpdateBarcode(scanningIndex, result)}
          onClose={onScanningClose}
        />
      )}
      
      <div className="max-w-[360px] mx-auto w-full">
        <div className="pt-10 space-y-8 scrollbar-hide">
          {currentStep === 4 && <ChipInstructions />}
          {currentStep === 5 && <BarcodeInstructions onBack={onBack} onContinue={onContinue} />}
          {currentStep === 6 && (
            <>
              <BarcodeScannerComponent
                selectedLines={selectedLines}
                onStartScanning={onStartScanning}
              />
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white h-10"
                  onClick={onBack}
                >
                  Voltar
                </Button>
                <Button 
                  className="bg-[#8425af] hover:bg-[#6c1e8f] text-white disabled:opacity-50 disabled:cursor-not-allowed h-10"
                  onClick={onContinue}
                  disabled={!allChipsScanned}
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