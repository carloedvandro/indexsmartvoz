
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ChipActivationFlow } from "@/components/client/products/ChipActivationFlow";
import { SuccessScreen } from "@/components/client/products/SuccessScreen";
import { ProductsHeader } from "@/components/client/products/ProductsHeader";
import { ProductsContainer } from "@/components/client/products/ProductsContainer";
import { MainContent } from "@/components/client/products/MainContent";

type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  barcode?: string;
};

export default function ClientProducts() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLines, setSelectedLines] = useState<Line[]>([]);
  const [selectedDueDate, setSelectedDueDate] = useState<number | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [protocol, setProtocol] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [scanningIndex, setScanningIndex] = useState<number | null>(null);
  const [showChipActivation, setShowChipActivation] = useState(false);

  const handleContinue = () => {
    debugger;
    if (currentStep === 1 && selectedLines.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma linha para continuar",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 3 && !selectedDueDate) {
      toast({
        title: "Erro",
        description: "Selecione uma data de vencimento para continuar",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 4 && !acceptedTerms) {
      toast({
        title: "Erro",
        description: "Você precisa aceitar os termos para continuar",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 3 && acceptedTerms) {
      const protocolNumber = new Date().getTime().toString();
      setProtocol(protocolNumber);
      setShowChipActivation(true);
      setCurrentStep(5);
    } else if (currentStep === 5) {
      setCurrentStep(6);
    } else if (currentStep === 6) {
      setShowConfirmation(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      if (currentStep === 5) {
        setShowChipActivation(false);
        setCurrentStep(3);
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const handleUnderstand = () => {
    navigate("/client/dashboard");
  };

  const handleUpdateBarcode = (index: number, barcode: string) => {
    const updatedLines = [...selectedLines];
    updatedLines[index] = { ...updatedLines[index], barcode };
    setSelectedLines(updatedLines);
  };

  if (showConfirmation) {
    return (
      <SuccessScreen
        selectedLines={selectedLines}
        protocol={protocol}
        onUnderstand={handleUnderstand}
        showBarcodes={true}
      />
    );
  }

  return (
    <ProductsContainer>
      <ProductsHeader />

      {showChipActivation ? (
        <ChipActivationFlow
          currentStep={currentStep}
          selectedLines={selectedLines}
          scanningIndex={scanningIndex}
          onBack={handleBack}
          onContinue={handleContinue}
          onStartScanning={(index) => setScanningIndex(index)}
          onUpdateBarcode={handleUpdateBarcode}
          onScanningClose={() => setScanningIndex(null)}
        />
      ) : (
        <MainContent
          currentStep={currentStep}
          selectedLines={selectedLines}
          selectedDueDate={selectedDueDate}
          acceptedTerms={acceptedTerms}
          setSelectedLines={setSelectedLines}
          setSelectedDueDate={setSelectedDueDate}
          setAcceptedTerms={setAcceptedTerms}
          handleBack={handleBack}
          handleContinue={handleContinue}
        />
      )}
    </ProductsContainer>
  );
}
