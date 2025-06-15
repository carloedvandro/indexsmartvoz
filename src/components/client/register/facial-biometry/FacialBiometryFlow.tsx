
import { useState } from "react";
import { DocumentCaptureStep } from "./steps/DocumentCaptureStep";
import { useCameraManagement } from "@/hooks/useCameraManagement";

interface FacialBiometryFlowProps {
  onComplete?: (verificationData: {
    facialVerification: boolean;
    documentVerification: boolean;
  }) => void;
  onBack: () => void;
}

export const FacialBiometryFlow = ({ onComplete, onBack }: FacialBiometryFlowProps) => {
  const [selectedDocType] = useState<'rg' | 'cnh'>('rg');
  const { videoConstraints: documentVideoConstraints } = useCameraManagement(true);

  const handleDocumentCapture = (imageSrc: string) => {
    if (onComplete) {
      onComplete({
        facialVerification: true,
        documentVerification: true,
      });
    }
  };

  return (
    <div className="space-y-0">
      {/* Header with Smartvoz logo */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-center">
          <img
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
            alt="Smartvoz"
            className="h-20 object-contain"
          />
        </div>
      </div>

      <DocumentCaptureStep
        onNext={handleDocumentCapture}
        selectedDocType={selectedDocType}
        isBackSide={false}
        videoConstraints={documentVideoConstraints}
        step={1}
        totalSteps={1}
      />
    </div>
  );
};
