import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PlanSelectionStep } from "@/components/client/products/PlanSelectionStep";
import { OrderReviewStep } from "@/components/client/products/OrderReviewStep";
import { DueDateStep } from "@/components/client/products/DueDateStep";
import { ContractTermsStep } from "@/components/client/products/ContractTermsStep";
import { SuccessScreen } from "@/components/client/products/SuccessScreen";
import { useToast } from "@/hooks/use-toast";
import { ProgressBar } from "@/components/client/products/ProgressBar";
import { ChipActivationFlow } from "@/components/client/products/ChipActivationFlow";

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

    if (currentStep === 4 && acceptedTerms) {
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
    setCurrentStep(currentStep - 1);
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 pb-16 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">
            {showChipActivation ? "Ativação do Chip" : "Contratação de Planos"}
          </h1>
        </div>

        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={showChipActivation ? 6 : 4}
          showChipActivation={showChipActivation}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Card className="md:col-span-2 max-w-4xl mx-auto w-full">
              <CardContent className="pt-6 space-y-8">
                {currentStep === 1 && (
                  <PlanSelectionStep
                    selectedLines={selectedLines}
                    setSelectedLines={setSelectedLines}
                  />
                )}

                {currentStep === 2 && (
                  <OrderReviewStep selectedLines={selectedLines} />
                )}

                {currentStep === 3 && (
                  <DueDateStep
                    selectedDueDate={selectedDueDate}
                    onDueDateChange={setSelectedDueDate}
                  />
                )}

                {currentStep === 4 && (
                  <ContractTermsStep
                    acceptedTerms={acceptedTerms}
                    onTermsChange={setAcceptedTerms}
                  />
                )}

                <div className="flex justify-between">
                  {currentStep > 1 && (
                    <Button 
                      className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
                      onClick={handleBack}
                    >
                      Voltar
                    </Button>
                  )}
                  <Button 
                    className="bg-[#8425af] hover:bg-[#6c1e8f] ml-auto"
                    onClick={handleContinue}
                    disabled={selectedLines.length === 0}
                  >
                    {currentStep === 4 ? 'Finalizar compra' : 'Continuar'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}