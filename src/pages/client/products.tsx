
import { useState, useEffect } from "react";
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
  planId?: string;
  planName?: string;
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

  // Load selected plan from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('selectedPlan');
    if (savedPlan) {
      try {
        const plan = JSON.parse(savedPlan);
        console.log('Loaded plan from localStorage:', plan);
        
        // Pre-populate with selected plan
        setSelectedLines([{
          id: 1,
          internet: plan.gb,
          type: "eSIM",
          ddd: "",
          price: plan.price,
          planId: plan.id,
          planName: plan.name || plan.title
        }]);
      } catch (error) {
        console.error('Error parsing saved plan:', error);
        // If no plan is saved, redirect back to plan selection
        navigate("/client/plan-selection");
      }
    } else {
      // If no plan is saved, redirect back to plan selection
      navigate("/client/plan-selection");
    }
  }, [navigate]);

  const handleContinue = () => {
    if (currentStep === 1 && selectedLines.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma linha para continuar",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 1 && (!selectedLines[0]?.ddd || !selectedDueDate)) {
      toast({
        title: "Erro",
        description: "Selecione o DDD e data de vencimento para continuar",
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

    if (currentStep === 3 && acceptedTerms) {
      // Store complete order data in localStorage for checkout
      const orderData = {
        selectedLines,
        selectedDueDate,
        acceptedTerms,
        selectedPlan: JSON.parse(localStorage.getItem('selectedPlan') || '{}')
      };
      localStorage.setItem('orderData', JSON.stringify(orderData));
      
      // Navigate to checkout instead of chip activation
      navigate("/client/checkout", {
        state: {
          selectedLines,
          selectedDueDate,
          acceptedTerms
        }
      });
    } else if (currentStep === 5) {
      setCurrentStep(6);
    } else if (currentStep === 6) {
      setShowConfirmation(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/client/plan-selection");
    } else if (currentStep > 1) {
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
