
import { ChipInstructions } from "./ChipInstructions";
import { BarcodeInstructions } from "./BarcodeInstructions";
import { BarcodeScannerComponent } from "./BarcodeScanner";
import { Button } from "@/components/ui/button";
import { Line } from "../ChipActivationFlow";

interface ChipActivationStepContentProps {
  currentStep: number;
  selectedLines: Line[];
  allBarcodesScanned: boolean;
  onBack: () => void;
  onContinue: () => void;
  onStartScanning: (index: number) => void;
}

export function ChipActivationStepContent({
  currentStep,
  selectedLines,
  allBarcodesScanned,
  onBack,
  onContinue,
  onStartScanning
}: ChipActivationStepContentProps) {
  if (currentStep === 4) {
    return <ChipInstructions />;
  }
  
  if (currentStep === 5) {
    return <BarcodeInstructions onBack={onBack} onContinue={onContinue} />;
  }
  
  if (currentStep === 6) {
    return (
      <div className="flex flex-col space-y-6">
        <BarcodeScannerComponent
          selectedLines={selectedLines}
          onStartScanning={onStartScanning}
        />
        <NavigationButtons 
          onBack={onBack} 
          onContinue={onContinue} 
          disabled={!allBarcodesScanned}
        />
      </div>
    );
  }
  
  return null;
}
