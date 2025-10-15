
import { CpfVerificationStep } from "../steps/CpfVerificationStep";
import { CameraAccessStep } from "../steps/CameraAccessStep";
import { CaptureInstructions } from "../CaptureInstructions";
import { FacialCaptureStep } from "../steps/FacialCaptureStep";
import { DocumentTypeStep } from "../steps/DocumentTypeStep";
import { DocumentCaptureStep } from "../steps/DocumentCaptureStep";
import { CompletionStep } from "../steps/CompletionStep";
import { AnalysisStep } from "../steps/AnalysisStep";
import { DocumentInstructionsStep } from "../steps/DocumentInstructionsStep";
import { BiometryStep, CapturedImages } from "../hooks/useBiometryFlow";

interface StepRendererProps {
  currentStep: BiometryStep;
  selectedDocType: 'rg' | 'cnh' | null;
  facialVideoConstraints: any;
  documentVideoConstraints: any;
  onContinue: (nextStep: BiometryStep) => void;
  onBack: () => void;
  onDocumentTypeSelection: (type: 'rg' | 'cnh') => void;
  onFacialCapture: (imageSrc: string) => void;
  onDocumentCapture: (imageSrc: string) => void;
  onComplete: () => void;
}

export const StepRenderer = ({
  currentStep,
  selectedDocType,
  facialVideoConstraints,
  documentVideoConstraints,
  onContinue,
  onBack,
  onDocumentTypeSelection,
  onFacialCapture,
  onDocumentCapture,
  onComplete
}: StepRendererProps) => {
  switch (currentStep) {
    case 'cpf-verification':
      return <CpfVerificationStep onNext={() => onContinue('camera-access')} />;
    
    case 'camera-access':
      return <CameraAccessStep onNext={() => onContinue('capture-instructions')} />;
    
    case 'capture-instructions':
      return (
        <CaptureInstructions
          onNext={() => onContinue('facial-capture')}
          onBack={onBack}
        />
      );
    
    case 'facial-capture':
      return (
        <FacialCaptureStep
          onNext={onFacialCapture}
          videoConstraints={facialVideoConstraints}
        />
      );
    
    case 'facial-analysis':
      return (
        <AnalysisStep
          onNext={() => onContinue('document-instructions')}
          title="Em análise"
          description="Aguarde um instante"
          step={0}
          totalSteps={0}
        />
      );
    
    case 'document-instructions':
      return (
        <DocumentInstructionsStep
          onNext={() => onContinue('document-type')}
          step={0}
          totalSteps={0}
        />
      );
    
    case 'document-type':
      return <DocumentTypeStep onSelectDocType={onDocumentTypeSelection} step={0} totalSteps={0} />;
    
    case 'document-front':
    case 'document-back':
      return (
        <DocumentCaptureStep
          onNext={onDocumentCapture}
          selectedDocType={selectedDocType!}
          isBackSide={currentStep === 'document-back'}
          videoConstraints={documentVideoConstraints}
          step={0}
          totalSteps={0}
        />
      );
    
    case 'document-analysis':
      return (
        <AnalysisStep
          onNext={() => onContinue('completion')}
          title="Em análise"
          description="Aguarde um instante"
          step={0}
          totalSteps={0}
        />
      );
    
    case 'completion':
      return <CompletionStep onComplete={onComplete} />;
    
    default:
      return null;
  }
};
