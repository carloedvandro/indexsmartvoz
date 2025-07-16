
import { ChipInstructions } from "./ChipInstructions";
import { BarcodeInstructions } from "./BarcodeInstructions";
import { NavigationButtons } from "./NavigationButtons";
import { BarcodeInputStep } from "./BarcodeInputStep";
import { ActivationConfirmation } from "./ActivationConfirmation";

export type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  barcode?: string;
  planId?: string;
  planName?: string;
};

interface ChipActivationStepContentProps {
  currentStep: number;
  selectedLines: Line[];
  allBarcodesScanned: boolean;
  onBack: () => void;
  onContinue: () => void;
  onStartScanning: (index: number) => void;
  onUpdateDDD?: (index: number, ddd: string) => void; // Opcional, mas não usado mais
}

export function ChipActivationStepContent({
  currentStep,
  selectedLines,
  allBarcodesScanned,
  onBack,
  onContinue,
  onStartScanning,
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
      <>
        <BarcodeInstructions />
        <NavigationButtons
          onBack={onBack}
          onContinue={onContinue}
        />
      </>
    );
  }

  if (currentStep === 6) {
    return (
      <BarcodeInputStep
        selectedLines={selectedLines}
        allBarcodesScanned={allBarcodesScanned}
        onBack={onBack}
        onContinue={onContinue}
        onStartScanning={onStartScanning}
      />
    );
  }

  if (currentStep === 7) {
    return (
      <ActivationConfirmation
        selectedLines={selectedLines}
        onFinish={onContinue}
      />
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="text-center">
        <p className="text-gray-600">Passo não encontrado: {currentStep}</p>
      </div>
      <NavigationButtons
        onBack={onBack}
        onContinue={onContinue}
      />
    </div>
  );
}
