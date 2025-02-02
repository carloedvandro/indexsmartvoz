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

  const handleContinue = () => {
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

    if (currentStep === 3 && !acceptedTerms) {
      toast({
        title: "Erro",
        description: "Você precisa aceitar os termos para continuar",
        variant: "destructive",
      });
      return;
    }

    // Se estiver no passo 3 e os termos foram aceitos, inicia o fluxo de ativação
    if (currentStep === 3 && acceptedTerms) {
      setCurrentStep(4);
      return;
    }

    // Verifica se todos os chips foram escaneados antes de finalizar
    if (currentStep === 6) {
      const allChipsScanned = selectedLines.every(line => line.barcode);
      if (!allChipsScanned) {
        toast({
          title: "Erro",
          description: "Você precisa escanear todos os chips antes de finalizar",
          variant: "destructive",
        });
        return;
      }
      
      // Gera o protocolo e mostra a tela de confirmação apenas quando todos os chips foram escaneados
      const protocolNumber = new Date().getTime().toString();
      setProtocol(protocolNumber);
      setShowConfirmation(true);
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUnderstand = () => {
    navigate("/client/dashboard");
  };

  const handleUpdateBarcode = (index: number, barcode: string) => {
    const updatedLines = [...selectedLines];
    updatedLines[index] = { ...updatedLines[index], barcode };
    setSelectedLines(updatedLines);
    setScanningIndex(null);
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
      
      {currentStep <= 3 ? (
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
      ) : (
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
      )}
    </ProductsContainer>
  );
}