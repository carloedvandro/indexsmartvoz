
import { useState } from "react";
import { CpfVerificationStep } from "./steps/CpfVerificationStep";
import { CameraAccessStep } from "./steps/CameraAccessStep";
import { CaptureInstructions } from "./CaptureInstructions";
import { FacialCaptureStep } from "./steps/FacialCaptureStep";
import { DocumentTypeStep } from "./steps/DocumentTypeStep";
import { DocumentCaptureStep } from "./steps/DocumentCaptureStep";
import { CompletionStep } from "./steps/CompletionStep";
import { useCameraManagement } from "@/hooks/useCameraManagement";
import { useNavigate } from "react-router-dom";
import { AnalysisStep } from "./steps/AnalysisStep";
import { DocumentInstructionsStep } from "./steps/DocumentInstructionsStep";

interface FacialBiometryFlowProps {
  onComplete?: (verificationData: {
    facialVerification: boolean;
    documentVerification: boolean;
  }) => void;
  onBack: () => void;
}

type Step = 
  | 'cpf-verification'
  | 'camera-access'
  | 'capture-instructions'
  | 'facial-capture'
  | 'facial-analysis'
  | 'document-instructions'
  | 'document-type'
  | 'document-front'
  | 'document-back'
  | 'document-analysis'
  | 'completion';

interface CapturedImages {
  facial?: string;
  documentFront?: string;
  documentBack?: string;
}

export const FacialBiometryFlow = ({ onComplete, onBack }: FacialBiometryFlowProps) => {
  const [currentStep, setCurrentStep] = useState<Step>('cpf-verification');
  const [selectedDocType, setSelectedDocType] = useState<'rg' | 'cnh' | null>(null);
  const [capturedImages, setCapturedImages] = useState<CapturedImages>({});
  const { videoConstraints: facialVideoConstraints } = useCameraManagement();
  const { videoConstraints: documentVideoConstraints } = useCameraManagement(true);
  const navigate = useNavigate();

  const handleBack = () => {
    // Map current step to previous step
    const stepMap: Record<Step, Step> = {
      'cpf-verification': 'cpf-verification', // Stay on first step
      'camera-access': 'cpf-verification',
      'capture-instructions': 'camera-access',
      'facial-capture': 'capture-instructions',
      'facial-analysis': 'facial-capture',
      'document-instructions': 'facial-analysis',
      'document-type': 'document-instructions',
      'document-front': 'document-type',
      'document-back': 'document-front',
      'document-analysis': 'document-back',
      'completion': 'document-analysis'
    };

    // If on first step, go back to previous page
    if (currentStep === 'cpf-verification') {
      onBack();
      return;
    }

    setCurrentStep(stepMap[currentStep]);
  };

  const handleContinue = (nextStep: Step) => {
    setCurrentStep(nextStep);
  };

  const handleDocumentTypeSelection = (type: 'rg' | 'cnh') => {
    setSelectedDocType(type);
    handleContinue('document-front');
  };

  const handleCompletion = () => {
    if (!capturedImages.facial || !capturedImages.documentFront || (selectedDocType === 'rg' && !capturedImages.documentBack)) {
      return;
    }

    if (onComplete) {
      onComplete({
        facialVerification: true,
        documentVerification: true,
      });
    } else {
      navigate("/client/dashboard");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'cpf-verification':
        return <CpfVerificationStep onNext={() => handleContinue('camera-access')} />;
      
      case 'camera-access':
        return <CameraAccessStep onNext={() => handleContinue('capture-instructions')} />;
      
      case 'capture-instructions':
        return (
          <CaptureInstructions
            onNext={() => handleContinue('facial-capture')}
            onBack={handleBack}
          />
        );
      
      case 'facial-capture':
        return (
          <FacialCaptureStep
            onNext={(imageSrc) => {
              setCapturedImages(prev => ({ ...prev, facial: imageSrc }));
              handleContinue('facial-analysis');
            }}
            videoConstraints={facialVideoConstraints}
          />
        );
      
      case 'facial-analysis':
        return (
          <AnalysisStep
            onNext={() => handleContinue('document-instructions')}
            title="Em análise"
            description="Aguarde um instante"
            step={0}
            totalSteps={0}
          />
        );
      
      case 'document-instructions':
        return (
          <DocumentInstructionsStep
            onNext={() => handleContinue('document-type')}
            step={0}
            totalSteps={0}
          />
        );
      
      case 'document-type':
        return <DocumentTypeStep onSelectDocType={handleDocumentTypeSelection} step={0} totalSteps={0} />;
      
      case 'document-front':
      case 'document-back':
        return (
          <DocumentCaptureStep
            onNext={(imageSrc) => {
              if (currentStep === 'document-front') {
                setCapturedImages(prev => ({ ...prev, documentFront: imageSrc }));
                if (selectedDocType === 'cnh') {
                  // CNH só precisa de frente, então vai direto para análise
                  handleContinue('document-analysis');
                } else {
                  handleContinue('document-back');
                }
              } else {
                setCapturedImages(prev => ({ ...prev, documentBack: imageSrc }));
                handleContinue('document-analysis');
              }
            }}
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
            onNext={() => handleContinue('completion')}
            title="Em análise"
            description="Aguarde um instante"
            step={0}
            totalSteps={0}
          />
        );
      
      case 'completion':
        return <CompletionStep onComplete={handleCompletion} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {renderStep()}
    </div>
  );
};
