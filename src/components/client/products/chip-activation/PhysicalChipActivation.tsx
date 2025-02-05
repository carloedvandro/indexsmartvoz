
import { Button } from "@/components/ui/button";
import { BarcodeInstructions } from "./BarcodeInstructions";
import { BarcodeScannerComponent } from "./BarcodeScanner";
import type { Line } from "../ChipActivationFlow";

interface PhysicalChipActivationProps {
  currentStep: number;
  selectedLines: Line[];
  onBack: () => void;
  onContinue: () => void;
  onStartScanning: (index: number) => void;
  allBarcodesScanned: boolean;
}

export function PhysicalChipActivation({
  currentStep,
  selectedLines,
  onBack,
  onContinue,
  onStartScanning,
  allBarcodesScanned
}: PhysicalChipActivationProps) {
  if (currentStep === 5) {
    return <BarcodeInstructions onBack={onBack} onContinue={onContinue} />;
  }

  return (
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
  );
}
