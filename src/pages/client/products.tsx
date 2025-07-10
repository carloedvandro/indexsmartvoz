
import { useProductsState } from "@/hooks/useProductsState";
import { useProductsNavigation } from "@/components/client/products/ProductsNavigation";
import { ChipActivationFlow } from "@/components/client/products/ChipActivationFlow";
import { SuccessScreen } from "@/components/client/products/SuccessScreen";
import { ProductsHeader } from "@/components/client/products/ProductsHeader";
import { ProductsContainer } from "@/components/client/products/ProductsContainer";
import { MainContent } from "@/components/client/products/MainContent";
import { LoadingOverlay } from "@/components/client/products/LoadingOverlay";

export default function ClientProducts() {
  const {
    currentStep,
    setCurrentStep,
    selectedLines,
    setSelectedLines,
    selectedDueDate,
    setSelectedDueDate,
    acceptedTerms,
    setAcceptedTerms,
    protocol,
    showConfirmation,
    setShowConfirmation,
    scanningIndex,
    setScanningIndex,
    showChipActivation,
    setShowChipActivation,
    isAsaasProcessing,
    setIsAsaasProcessing
  } = useProductsState();

  const { handleContinue, handleBack, handleUnderstand } = useProductsNavigation({
    currentStep,
    selectedLines,
    selectedDueDate,
    acceptedTerms,
    setCurrentStep,
    setShowConfirmation,
    setShowChipActivation,
    setIsAsaasProcessing
  });

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

  console.log('🖥️ Renderizando produtos - currentStep:', currentStep, 'isAsaasProcessing:', isAsaasProcessing);

  return (
    <ProductsContainer>
      {/* Logo fixada no topo */}
      <div className="fixed top-0 left-0 right-0 bg-transparent px-4 py-2 z-50">
        <div className="flex items-center justify-center">
          <img
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
            alt="Smartvoz"
            className="h-16 object-contain"
          />
        </div>
      </div>

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
        <div className="pt-20">
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
        </div>
      )}
      
      <LoadingOverlay isVisible={isAsaasProcessing} />
    </ProductsContainer>
  );
}
