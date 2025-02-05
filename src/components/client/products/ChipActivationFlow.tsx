
import { Button } from "@/components/ui/button";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { ChipInstructions } from "./chip-activation/ChipInstructions";
import { BarcodeInstructions } from "./chip-activation/BarcodeInstructions";
import { BarcodeScannerComponent } from "./chip-activation/BarcodeScanner";
import { ChipTypeSelection } from "./chip-activation/ChipTypeSelection";
import { useState } from "react";

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
    if (type === 'esim') {
      // Para eSIM, vamos gerar códigos QR fictícios por enquanto
      selectedLines.forEach((line, index) => {
        onUpdateBarcode(index, `ESIM-${line.ddd}-${Date.now()}`);
      });
    }
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
      
      <div className="max-w-[340px] mx-auto w-full">
        <div className="pt-16 space-y-8">
          {currentStep === 4 && <ChipInstructions />}
          {currentStep === 5 && (
            chipType === null ? (
              <ChipTypeSelection onSelectChipType={handleChipTypeSelect} />
            ) : (
              <BarcodeInstructions onBack={onBack} onContinue={onContinue} />
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
          {currentStep === 6 && chipType === 'esim' && (
            <div className="flex flex-col space-y-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">eSIM</h3>
                <p className="text-gray-600">
                  Seu eSIM foi configurado com sucesso! Em breve você receberá um e-mail com as instruções de ativação.
                </p>
              </div>
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
