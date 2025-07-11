
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCameraManagement } from "@/hooks/useCameraManagement";

export type BiometryStep = 
  | 'cpf-verification'
  | 'camera-access'
  | 'capture-instructions'
  | 'facial-capture'
  | 'facial-analysis'
  | 'document-instructions'
  | 'document-type'
  | 'document-front'
  | 'document-back'
  | 'document-scanner-combined'
  | 'document-analysis'
  | 'completion';

export interface CapturedImages {
  facial?: string;
  documentFront?: string;
  documentBack?: string;
}

interface UseBiometryFlowProps {
  onComplete?: (verificationData: {
    facialVerification: boolean;
    documentVerification: boolean;
  }) => void;
  onBack: () => void;
}

export const useBiometryFlow = ({ onComplete, onBack }: UseBiometryFlowProps) => {
  const [currentStep, setCurrentStep] = useState<BiometryStep>('cpf-verification');
  const [selectedDocType, setSelectedDocType] = useState<'rg' | 'cnh' | null>(null);
  const [capturedImages, setCapturedImages] = useState<CapturedImages>({});
  const { videoConstraints: facialVideoConstraints } = useCameraManagement();
  const { videoConstraints: documentVideoConstraints } = useCameraManagement(true);
  const navigate = useNavigate();

  const handleBack = () => {
    const stepMap: Record<BiometryStep, BiometryStep> = {
      'cpf-verification': 'cpf-verification',
      'camera-access': 'cpf-verification',
      'capture-instructions': 'camera-access',
      'facial-capture': 'capture-instructions',
      'facial-analysis': 'facial-capture',
      'document-instructions': 'facial-analysis',
      'document-type': 'document-instructions',
      'document-front': 'document-type',
      'document-back': 'document-front',
      'document-scanner-combined': 'document-type',
      'document-analysis': 'document-back',
      'completion': 'document-analysis'
    };

    if (currentStep === 'cpf-verification') {
      onBack();
      return;
    }

    setCurrentStep(stepMap[currentStep]);
  };

  const handleContinue = (nextStep: BiometryStep) => {
    setCurrentStep(nextStep);
  };

  const handleDocumentTypeSelection = (type: 'rg' | 'cnh') => {
    setSelectedDocType(type);
    // Use combined scanner instead of separate front/back steps
    handleContinue('document-scanner-combined');
  };

  const handleFacialCapture = (imageSrc: string) => {
    setCapturedImages(prev => ({ ...prev, facial: imageSrc }));
    handleContinue('facial-analysis');
  };

  const handleDocumentCapture = (imageSrc: string) => {
    if (currentStep === 'document-front') {
      setCapturedImages(prev => ({ ...prev, documentFront: imageSrc }));
      if (selectedDocType === 'cnh') {
        handleContinue('document-analysis');
      } else {
        handleContinue('document-back');
      }
    } else {
      setCapturedImages(prev => ({ ...prev, documentBack: imageSrc }));
      handleContinue('document-analysis');
    }
  };

  const handleCombinedDocumentCapture = (frontImage: string, backImage: string) => {
    setCapturedImages(prev => ({ 
      ...prev, 
      documentFront: frontImage, 
      documentBack: backImage 
    }));
    handleContinue('document-analysis');
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

  return {
    currentStep,
    selectedDocType,
    capturedImages,
    facialVideoConstraints,
    documentVideoConstraints,
    handleBack,
    handleContinue,
    handleDocumentTypeSelection,
    handleFacialCapture,
    handleDocumentCapture,
    handleCombinedDocumentCapture,
    handleCompletion
  };
};
