
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { ChipInstructions } from "./chip-activation/ChipInstructions";
import { BarcodeInstructions } from "./chip-activation/BarcodeInstructions";
import { BarcodeScannerComponent } from "./chip-activation/BarcodeScanner";
import { ChipTypeSelection } from "./chip-activation/ChipTypeSelection";
import { EsimActivationFlow } from "./chip-activation/EsimActivationFlow";
import { PhysicalChipActivation } from "./chip-activation/PhysicalChipActivation";

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
  const [chipType, setChipType] = useState<'physical' | 'esim' | null>(null);

  const handleChipTypeSelect = (type: 'physical' | 'esim') => {
    setChipType(type);
    if (type === 'physical') {
      onContinue();
    }
  };

  const handleEsimComplete = (imei: string, eid: string) => {
    selectedLines.forEach((line, index) => {
      onUpdateBarcode(index, `ESIM-${imei}-${eid}-${line.ddd}`);
    });
    onContinue();
  };

  return (
    <>
      {scanningIndex !== null && (
        <BarcodeScanner
          onResult={(result) => onUpdateBarcode(scanningIndex, result)}
          onClose={onScanningClose}
        />
      )}
      
      <div className="max-w-[400px] mx-auto w-full">
        <div className="pt-16 space-y-8">
          {currentStep === 4 && <ChipInstructions />}
          {currentStep === 5 && (
            chipType === null ? (
              <ChipTypeSelection onSelectChipType={handleChipTypeSelect} />
            ) : chipType === 'physical' ? (
              <PhysicalChipActivation 
                currentStep={currentStep}
                selectedLines={selectedLines}
                onBack={onBack}
                onContinue={onContinue}
                onStartScanning={onStartScanning}
                allBarcodesScanned={selectedLines.every(line => line.barcode)}
              />
            ) : (
              <EsimActivationFlow onComplete={handleEsimComplete} />
            )
          )}
        </div>
      </div>
    </>
  );
}
