
import { useState } from "react";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { PageHeader } from "@/components/client/products/chip-activation/PageHeader";
import { ProgressSteps } from "@/components/client/products/chip-activation/ProgressSteps";
import { IntroductionStep } from "@/components/client/products/chip-activation/IntroductionStep";
import { BarcodeGuideStep } from "@/components/client/products/chip-activation/BarcodeGuideStep";
import { LineSelectionStep } from "@/components/client/products/chip-activation/LineSelectionStep";
import { ConfirmationScreen } from "@/components/client/products/chip-activation/ConfirmationScreen";

export default function ClientChipActivation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLines, setSelectedLines] = useState<Array<{
    number: string;
    barcode?: string;
  }>>([]);
  const [scanningIndex, setScanningIndex] = useState<number | null>(null);
  const [protocol, setProtocol] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleContinue = () => {
    if (currentStep === 3) {
      // Generate a protocol number when moving to confirmation
      const protocolNumber = new Date().getTime().toString();
      setProtocol(protocolNumber);
      setShowConfirmation(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAddLine = (phoneNumber: string) => {
    if (phoneNumber && selectedLines.length < 10) {
      setSelectedLines([...selectedLines, { number: phoneNumber }]);
    }
  };

  const handleUpdateBarcode = (index: number, barcode: string) => {
    const updatedLines = [...selectedLines];
    updatedLines[index] = { ...updatedLines[index], barcode };
    setSelectedLines(updatedLines);
  };

  const handleRemoveLine = (index: number) => {
    const updatedLines = selectedLines.filter((_, i) => i !== index);
    setSelectedLines(updatedLines);
  };

  const startScanning = (index: number) => {
    setScanningIndex(index);
  };

  if (showConfirmation) {
    return <ConfirmationScreen selectedLines={selectedLines} protocol={protocol} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {scanningIndex !== null && (
        <BarcodeScanner
          onResult={(result) => handleUpdateBarcode(scanningIndex, result)}
          onClose={() => setScanningIndex(null)}
        />
      )}
      
      <div className="container mx-auto p-4 pb-16 space-y-6">
        <PageHeader />
        <ProgressSteps currentStep={currentStep} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentStep === 1 && (
            <IntroductionStep onContinue={handleContinue} />
          )}

          {currentStep === 2 && (
            <BarcodeGuideStep 
              onBack={handleBack}
              onContinue={handleContinue}
            />
          )}

          {currentStep === 3 && (
            <LineSelectionStep 
              selectedLines={selectedLines}
              onAddLine={handleAddLine}
              onRemoveLine={handleRemoveLine}
              onScanBarcode={startScanning}
              onBack={handleBack}
              onContinue={handleContinue}
            />
          )}
        </div>
      </div>
    </div>
  );
}
