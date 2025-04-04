
import { useBiometryFlow } from "./hooks/useBiometryFlow";
import { StepRenderer } from "./components/StepRenderer";

interface FacialBiometryFlowProps {
  onComplete?: (verificationData: {
    facialVerification: boolean;
    documentVerification: boolean;
  }) => void;
  onBack: () => void;
}

export const FacialBiometryFlow = ({ onComplete, onBack }: FacialBiometryFlowProps) => {
  const {
    currentStep,
    selectedDocType,
    facialVideoConstraints,
    documentVideoConstraints,
    handleBack,
    handleContinue,
    handleDocumentTypeSelection,
    handleFacialCapture,
    handleDocumentCapture,
    handleCompletion
  } = useBiometryFlow({ onComplete, onBack });

  return (
    <div className="space-y-0">
      <StepRenderer 
        currentStep={currentStep}
        selectedDocType={selectedDocType}
        facialVideoConstraints={facialVideoConstraints}
        documentVideoConstraints={documentVideoConstraints}
        onContinue={handleContinue}
        onBack={handleBack}
        onDocumentTypeSelection={handleDocumentTypeSelection}
        onFacialCapture={handleFacialCapture}
        onDocumentCapture={handleDocumentCapture}
        onComplete={handleCompletion}
      />
    </div>
  );
};
