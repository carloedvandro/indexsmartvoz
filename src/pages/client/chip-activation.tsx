
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { ChipActivationSteps } from "@/components/client/chip-activation/ChipActivationSteps";
import { ChipActivationConfirmation } from "@/components/client/chip-activation/ChipActivationConfirmation";
import { ProgressIndicator } from "@/components/client/chip-activation/ProgressIndicator";
import { useChipActivation } from "@/hooks/useChipActivation";

export default function ClientChipActivation() {
  const navigate = useNavigate();
  const {
    currentStep,
    selectedLines,
    phoneNumber,
    scanningIndex,
    protocol,
    showConfirmation,
    handleContinue,
    handleBack,
    handleAddLine,
    handleUpdateBarcode,
    handleRemoveLine,
    startScanning,
    handleScanningClose,
    setPhoneNumber
  } = useChipActivation();

  if (showConfirmation) {
    return <ChipActivationConfirmation selectedLines={selectedLines} protocol={protocol} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {scanningIndex !== null && (
        <BarcodeScanner
          onResult={(result) => handleUpdateBarcode(scanningIndex, result)}
          onClose={handleScanningClose}
        />
      )}
      
      <div className="container mx-auto p-4 pb-16 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Ativação do Chip do Plano</h1>
        </div>

        <ProgressIndicator currentStep={currentStep} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChipActivationSteps
            currentStep={currentStep}
            phoneNumber={phoneNumber}
            selectedLines={selectedLines}
            onPhoneNumberChange={setPhoneNumber}
            onAddLine={handleAddLine}
            onRemoveLine={handleRemoveLine}
            onStartScanning={startScanning}
            handleBack={handleBack}
            handleContinue={handleContinue}
            handleUpdateBarcode={handleUpdateBarcode}
          />
        </div>
      </div>
    </div>
  );
}
