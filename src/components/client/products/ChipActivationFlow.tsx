import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { useToast } from "@/hooks/use-toast";
import { ActivationTypeSelector } from "./ActivationTypeSelector";
import { ESIMActivationFlow } from "./ESIMActivationFlow";
import { SimCardInstructionsStep } from "./steps/SimCardInstructionsStep";
import { BarcodeInstructionsStep } from "./steps/BarcodeInstructionsStep";
import { BarcodeScanningStep } from "./steps/BarcodeScanningStep";
import { useState } from "react";

type Line = {
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
  const { toast } = useToast();
  const [activationType, setActivationType] = useState<'sim' | 'esim' | null>(null);

  const handleScanResult = (index: number, barcode: string) => {
    console.log("Barcode scanned:", barcode);
    onUpdateBarcode(index, barcode);
    toast({
      title: "Código escaneado com sucesso",
      description: "O código do chip foi registrado.",
    });
    onScanningClose();
  };

  if (currentStep === 4 && !activationType) {
    return (
      <Card className="md:col-span-2 max-w-4xl mx-auto w-full">
        <CardContent className="pt-6 space-y-8">
          <ActivationTypeSelector onSelect={setActivationType} />
        </CardContent>
      </Card>
    );
  }

  if (activationType === 'esim') {
    return (
      <ESIMActivationFlow
        currentStep={currentStep - 4}
        phoneNumber="(51) 99566-4831"
        onBack={onBack}
        onContinue={onContinue}
      />
    );
  }

  return (
    <>
      {scanningIndex !== null && (
        <BarcodeScanner
          onResult={(result) => handleScanResult(scanningIndex, result)}
          onClose={onScanningClose}
        />
      )}
      
      {currentStep === 4 && <SimCardInstructionsStep />}
      {currentStep === 5 && <BarcodeInstructionsStep />}
      {currentStep === 6 && (
        <BarcodeScanningStep
          selectedLines={selectedLines}
          onStartScanning={onStartScanning}
        />
      )}

      <div className="flex justify-between mt-6">
        <Button 
          className="bg-[#660099] hover:bg-[#660099]/90 text-white"
          onClick={onBack}
          type="button"
        >
          Voltar
        </Button>
        <Button 
          className="bg-[#660099] hover:bg-[#660099]/90"
          onClick={onContinue}
          disabled={currentStep === 6 && selectedLines.some(line => !line.barcode)}
          type="button"
        >
          {currentStep === 6 ? 'Finalizar' : 'Continuar'}
        </Button>
      </div>
    </>
  );
}