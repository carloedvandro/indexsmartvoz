
import { useBiometryFlow } from "./hooks/useBiometryFlow";
import { StepRenderer } from "./components/StepRenderer";

interface FacialBiometryFlowProps {
  onComplete?: (verificationData: {
    facialVerification: boolean;
    documentVerification: boolean;
  }) => void;
  onBack: () => void;
}

export const FacialBiometryFlow = ({
  onComplete,
  onBack
}: FacialBiometryFlowProps) => {
  const {
    currentStep,
    selectedDocType,
    facialVideoConstraints,
    documentVideoConstraints,
    isReleasingCamera,
    handleBack,
    handleContinue,
    handleDocumentTypeSelection,
    handleFacialCapture,
    handleDocumentCapture,
    handleCompletion
  } = useBiometryFlow({
    onComplete,
    onBack
  });

  return (
    <div className="space-y-0 flex flex-col justify-center items-center h-full">
      <div className="w-full h-full">
        <StepRenderer 
          currentStep={currentStep} 
          selectedDocType={selectedDocType} 
          facialVideoConstraints={facialVideoConstraints} 
          documentVideoConstraints={documentVideoConstraints}
          isReleasingCamera={isReleasingCamera}
          onContinue={handleContinue} 
          onBack={handleBack} 
          onDocumentTypeSelection={handleDocumentTypeSelection} 
          onFacialCapture={handleFacialCapture} 
          onDocumentCapture={handleDocumentCapture} 
          onComplete={handleCompletion} 
        />
      </div>
    </div>
  );
};
