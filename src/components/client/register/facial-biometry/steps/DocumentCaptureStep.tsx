
import { useRef } from "react";
import Webcam from "react-webcam";
import { DocumentFrame } from "./document-capture/DocumentFrame";
import { CaptureButton } from "./document-capture/CaptureButton";
import { useDocumentDetection } from "./document-capture/useDocumentDetection";
import { useDocumentCapture } from "./document-capture/useDocumentCapture";

interface DocumentCaptureStepProps {
  onNext: (imageSrc: string) => void;
  selectedDocType: 'rg' | 'cnh';
  isBackSide?: boolean;
  videoConstraints: {
    width: number;
    height: number;
    facingMode: string;
  };
}

export const DocumentCaptureStep = ({ 
  onNext, 
  selectedDocType, 
  isBackSide = false,
  videoConstraints 
}: DocumentCaptureStepProps) => {
  const webcamRef = useRef<Webcam>(null);
  
  const {
    isCapturing,
    captureAttempted,
    handleDocumentCapture,
    retryCapture
  } = useDocumentCapture({
    selectedDocType,
    isBackSide,
    onNext
  });

  const { documentDetected } = useDocumentDetection(
    webcamRef,
    isCapturing,
    captureAttempted,
    async () => {
      const imageSrc = webcamRef.current?.getScreenshot();
      await handleDocumentCapture(imageSrc);
    }
  );

  return (
    <div className="flex flex-col h-full relative bg-black">
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
        <div className="text-white text-sm">
          vivo
        </div>
        <div className="text-white text-sm">
          Passo 3 de 4
        </div>
      </div>

      <div className="flex-1 relative">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            ...videoConstraints,
            aspectRatio: 3/4
          }}
          className="w-full h-full object-cover"
        />
        
        <DocumentFrame documentDetected={documentDetected} />

        <CaptureButton
          isCapturing={isCapturing}
          captureAttempted={captureAttempted}
          onCapture={() => {
            const imageSrc = webcamRef.current?.getScreenshot();
            handleDocumentCapture(imageSrc);
          }}
          onRetry={retryCapture}
        />
      </div>
    </div>
  );
};
