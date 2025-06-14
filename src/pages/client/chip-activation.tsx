import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChipActivationFlow } from "@/components/client/products/ChipActivationFlow";
import { SuccessScreen } from "@/components/client/products/SuccessScreen";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function ChipActivation() {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [currentStep, setCurrentStep] = useState(5); // Start at chip activation step
  const [selectedLines, setSelectedLines] = useState<any[]>([]);
  const [protocol, setProtocol] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [scanningIndex, setScanningIndex] = useState<number | null>(null);
  useEffect(() => {
    // Load order data from localStorage
    const orderData = localStorage.getItem('orderData');
    if (orderData) {
      const order = JSON.parse(orderData);
      setSelectedLines(order.selectedLines);
      setProtocol(order.protocol);
    } else {
      toast({
        title: "Erro",
        description: "Dados do pedido não encontrados. Redirecionando...",
        variant: "destructive"
      });
      navigate("/client/checkout");
    }
  }, [navigate]);
  const handleContinue = () => {
    if (currentStep === 5) {
      setCurrentStep(6);
    } else if (currentStep === 6) {
      setShowConfirmation(true);
    }
  };
  const handleBack = () => {
    if (currentStep === 5) {
      navigate("/client/checkout");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleUnderstand = () => {
    // Clear order data and navigate to dashboard
    localStorage.removeItem('orderData');
    localStorage.removeItem('selectedPlan');
    navigate("/client/dashboard");
  };
  const handleUpdateBarcode = (index: number, barcode: string) => {
    const updatedLines = [...selectedLines];
    updatedLines[index] = {
      ...updatedLines[index],
      barcode
    };
    setSelectedLines(updatedLines);
  };
  if (showConfirmation) {
    return <SuccessScreen selectedLines={selectedLines} protocol={protocol} onUnderstand={handleUnderstand} showBarcodes={true} />;
  }
  return <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        
      </div>

      <ChipActivationFlow currentStep={currentStep} selectedLines={selectedLines} scanningIndex={scanningIndex} onBack={handleBack} onContinue={handleContinue} onStartScanning={index => setScanningIndex(index)} onUpdateBarcode={handleUpdateBarcode} onScanningClose={() => setScanningIndex(null)} />

      {/* Progress Indicator */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
        
      </div>
    </div>;
}