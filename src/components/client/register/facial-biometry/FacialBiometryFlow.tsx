
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
      {/* Header with Smartvoz logo */}
      <div className="bg-white px-4 py-3">
        <div className="flex items-center justify-center" style={{ marginTop: '10px' }}>
          <img
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
            alt="Smartvoz"
            className="h-20 object-contain"
          />
        </div>
      </div>

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
