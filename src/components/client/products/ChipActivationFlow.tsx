import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { ChipInstructions } from "./chip-activation/ChipInstructions";
import { BarcodeInstructions } from "./chip-activation/BarcodeInstructions";
import { BarcodeScannerComponent } from "./chip-activation/BarcodeScanner";

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
  return (
    <>
      {scanningIndex !== null && (
        <BarcodeScanner
          onResult={(result) => onUpdateBarcode(scanningIndex, result)}
          onClose={onScanningClose}
        />
      )}
      
      <Card className="md:col-span-2 max-w-4xl mx-auto w-full">
        <CardContent className="pt-6 space-y-8">
          {currentStep === 4 && <ChipInstructions />}
          {currentStep === 5 && <BarcodeInstructions />}
          {currentStep === 6 && (
            <BarcodeScannerComponent
              selectedLines={selectedLines}
              onStartScanning={onStartScanning}
            />
          )}

          <div className="flex justify-between">
            <Button 
              className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
              onClick={onBack}
              type="button"
            >
              Voltar
            </Button>
            <Button 
              className="bg-[#8425af] hover:bg-[#6c1e8f]"
              onClick={onContinue}
              disabled={currentStep === 6 && selectedLines.some(line => !line.barcode)}
              type="button"
            >
              {currentStep === 6 ? 'Finalizar' : 'Continuar'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}