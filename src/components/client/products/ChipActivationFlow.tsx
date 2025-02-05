
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { ChipInstructions } from "./chip-activation/ChipInstructions";
import { BarcodeInstructions } from "./chip-activation/BarcodeInstructions";
import { BarcodeScannerComponent } from "./chip-activation/BarcodeScanner";
import { ChipTypeSelection } from "./chip-activation/ChipTypeSelection";
import { EsimActivationFlow } from "./chip-activation/EsimActivationFlow";

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
  
  // Verifica se todos os códigos de barras foram escaneados
  const allBarcodesScanned = selectedLines.every(line => line.barcode);

  const handleChipTypeSelect = (type: 'physical' | 'esim') => {
    setChipType(type);
    if (type === 'physical') {
      onContinue();
    }
  };

  const handleEsimComplete = (imei: string, eid: string) => {
    // Atualiza os códigos de barras com o formato específico para eSIM
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
              <BarcodeInstructions onBack={onBack} onContinue={onContinue} />
            ) : (
              <EsimActivationFlow onComplete={handleEsimComplete} />
            )
          )}
          {currentStep === 6 && chipType === 'physical' && (
            <div className="flex flex-col space-y-6">
              <BarcodeScannerComponent
                selectedLines={selectedLines}
                onStartScanning={onStartScanning}
              />
              <div className="flex justify-between w-full">
                <Button 
                  variant="outline" 
                  className="bg-white border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white px-4 h-[42px] flex items-center"
                  onClick={onBack}
                >
                  Voltar
                </Button>
                <Button 
                  className="bg-[#8425af] hover:bg-[#6c1e8f] text-white px-4 h-[42px] flex items-center"
                  onClick={onContinue}
                  disabled={!allBarcodesScanned}
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
