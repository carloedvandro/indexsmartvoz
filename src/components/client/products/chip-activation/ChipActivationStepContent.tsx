
import { ChipInstructions } from "./ChipInstructions";
import { BarcodeInstructions } from "./BarcodeInstructions";
import { BarcodeScannerComponent } from "./BarcodeScanner";
import { NavigationButtons } from "./NavigationButtons";
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
  // Each step is rendered as its own screen
  if (currentStep === 4) {
    return (
      <div className="flex flex-col space-y-6">
        <ChipInstructions />
        <NavigationButtons 
          onBack={onBack} 
          onContinue={onContinue}
        />
      </div>
    );
  }
  
  if (currentStep === 5) {
    return (
      <div className="flex flex-col space-y-6">
        <BarcodeInstructions />
        <NavigationButtons 
          onBack={onBack} 
          onContinue={onContinue}
        />
      </div>
    );
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
