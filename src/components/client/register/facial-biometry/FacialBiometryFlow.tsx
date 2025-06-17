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
  return <div className="space-y-0 flex flex-col justify-center items-center h-full">
      {/* Logo fixada no topo */}
      <div className="fixed top-0 left-0 right-0 bg-white px-4 py-2 z-50 shadow-sm">
        <div className="flex items-center justify-center">
          <img src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" alt="Smartvoz" className="h-14 object-contain" />
        </div>
      </div>
      
      {/* Conteúdo com padding-top para não ficar atrás da logo */}
      <div className="pt-20 w-full h-full">
        <StepRenderer currentStep={currentStep} selectedDocType={selectedDocType} facialVideoConstraints={facialVideoConstraints} documentVideoConstraints={documentVideoConstraints} onContinue={handleContinue} onBack={handleBack} onDocumentTypeSelection={handleDocumentTypeSelection} onFacialCapture={handleFacialCapture} onDocumentCapture={handleDocumentCapture} onComplete={handleCompletion} />
      </div>
    </div>;
};