
import { useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Steps } from "./Steps";
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

  const handleDocumentTypeSelection = (type: 'rg' | 'cnh') => {
    setSelectedDocType(type);
    setCurrentStep('document-front');
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
        return <CpfVerificationStep onNext={() => setCurrentStep('camera-access')} />;
      
      case 'camera-access':
        return <CameraAccessStep onNext={() => setCurrentStep('capture-instructions')} />;
      
      case 'capture-instructions':
        return (
          <CaptureInstructions
            onNext={() => setCurrentStep('facial-capture')}
            onBack={onBack}
          />
        );
      
      case 'facial-capture':
        return (
          <FacialCaptureStep
            onNext={(imageSrc) => {
              setCapturedImages(prev => ({ ...prev, facial: imageSrc }));
              setCurrentStep('facial-analysis');
            }}
            videoConstraints={facialVideoConstraints}
          />
        );
      
      case 'facial-analysis':
        return (
          <AnalysisStep
            onNext={() => setCurrentStep('document-instructions')}
            title="Em análise"
            description="Aguarde um instante"
            step={3}
            totalSteps={4}
          />
        );
      
      case 'document-instructions':
        return (
          <DocumentInstructionsStep
            onNext={() => setCurrentStep('document-type')}
            step={3}
            totalSteps={4}
          />
        );
      
      case 'document-type':
        return <DocumentTypeStep onSelectDocType={handleDocumentTypeSelection} step={3} totalSteps={4} />;
      
      case 'document-front':
      case 'document-back':
        return (
          <DocumentCaptureStep
            onNext={(imageSrc) => {
              if (currentStep === 'document-front') {
                setCapturedImages(prev => ({ ...prev, documentFront: imageSrc }));
                if (selectedDocType === 'cnh') {
                  // CNH só precisa de frente, então vai direto para análise
                  setCurrentStep('document-analysis');
                } else {
                  setCurrentStep('document-back');
                }
              } else {
                setCapturedImages(prev => ({ ...prev, documentBack: imageSrc }));
                setCurrentStep('document-analysis');
              }
            }}
            selectedDocType={selectedDocType!}
            isBackSide={currentStep === 'document-back'}
            videoConstraints={documentVideoConstraints}
            step={3}
            totalSteps={4}
          />
        );
      
      case 'document-analysis':
        return (
          <AnalysisStep
            onNext={() => setCurrentStep('completion')}
            title="Em análise"
            description="Aguarde um instante"
            step={3}
            totalSteps={4}
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
      <Steps currentStep={currentStep} />
      {renderStep()}
    </div>
  );
};
