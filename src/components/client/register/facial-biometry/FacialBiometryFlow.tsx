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
    if (!capturedImages.facial || !capturedImages.documentFront || !capturedImages.documentBack) {
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

  const renderAnalysisStep = () => (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold">Em análise</h2>
      <p className="text-gray-600">Aguarde um instante</p>
      <div className="flex justify-center">
        <Clock className="w-16 h-16 text-purple-500 animate-spin" />
      </div>
    </div>
  );

  const renderDocumentInstructions = () => (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold">Verificação de Documento</h2>
      <p className="text-gray-600">
        Tenha em mãos seu RG, CNH ou Documento oficial de identificação com foto.
      </p>
      <Button onClick={() => setCurrentStep('document-type')} className="w-full max-w-xs">
        Continuar
        <ArrowRight className="ml-2" />
      </Button>
    </div>
  );

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
              setTimeout(() => setCurrentStep('document-instructions'), 2000);
            }}
            videoConstraints={facialVideoConstraints}
          />
        );
      
      case 'facial-analysis':
      case 'document-analysis':
        return renderAnalysisStep();
      
      case 'document-instructions':
        return renderDocumentInstructions();
      
      case 'document-type':
        return <DocumentTypeStep onSelectDocType={handleDocumentTypeSelection} />;
      
      case 'document-front':
      case 'document-back':
        return (
          <DocumentCaptureStep
            onNext={(imageSrc) => {
              if (currentStep === 'document-front') {
                setCapturedImages(prev => ({ ...prev, documentFront: imageSrc }));
                setCurrentStep('document-back');
              } else {
                setCapturedImages(prev => ({ ...prev, documentBack: imageSrc }));
                setCurrentStep('document-analysis');
                setTimeout(() => setCurrentStep('completion'), 2000);
              }
            }}
            selectedDocType={selectedDocType!}
            isBackSide={currentStep === 'document-back'}
            videoConstraints={documentVideoConstraints}
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
