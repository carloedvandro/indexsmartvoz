
import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DocumentFrame } from "./document-capture/DocumentFrame";
import { CaptureButton } from "./document-capture/CaptureButton";
import { useDocumentCapture } from "./document-capture/useDocumentCapture";
import { useDocumentDetection } from "./document-capture/useDocumentDetection";

interface DocumentCaptureStepProps {
  onNext: (imageSrc: string) => void;
  selectedDocType: 'rg' | 'cnh';
  isBackSide?: boolean;
  videoConstraints: {
    width: number;
    height: number;
    facingMode: string;
  };
  step: number;
  totalSteps: number;
}

export const DocumentCaptureStep = ({ 
  onNext, 
  selectedDocType, 
  isBackSide = false,
  videoConstraints,
  step,
  totalSteps
}: DocumentCaptureStepProps) => {
  const webcamRef = useRef<Webcam>(null);
  const { toast } = useToast();
  const [cameraActive, setCameraActive] = useState(true);

  // Check user session when component mounts
  useEffect(() => {
    const checkSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        console.error("No active session found in DocumentCaptureStep");
        toast({
          title: "Erro de Autenticação",
          description: "Sessão não encontrada. Por favor, faça login novamente.",
          variant: "destructive",
        });
      } else {
        console.log("User session found:", sessionData.session.user.id);
      }
    };
    
    checkSession();
  }, [toast]);

  // Use our custom hooks
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

  const { documentDetected } = useDocumentDetection(webcamRef, isCapturing);

  // Handle the document capture
  const handleCapture = async () => {
    if (!webcamRef.current) {
      toast({
        title: "Erro na Captura",
        description: "Câmera não disponível",
        variant: "destructive",
      });
      return;
    }
    
    const imageSrc = webcamRef.current.getScreenshot();
    await handleDocumentCapture(imageSrc);
  };

  // Force environment camera for document capture
  const updatedVideoConstraints = {
    ...videoConstraints,
    facingMode: "environment",
    width: { ideal: 1280 },
    height: { ideal: 720 }
  };
  
  return (
    <div className="relative h-[540px] bg-black overflow-hidden">
      {/* Instructions bar - moved lower */}
      <div className="absolute top-32 left-0 right-0 z-20 flex justify-center">
        <div className="bg-black/70 px-6 py-1 rounded text-white text-sm">
          {isBackSide ? "Verso do documento" : "Frente do documento"}
        </div>
      </div>

      {/* Camera View */}
      <div className="relative h-full">
        {cameraActive ? (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={updatedVideoConstraints}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-black">
            <div className="text-white/50 text-center">
              <p className="mt-4">Câmera desativada</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Document frame overlay - now with isBackSide prop */}
      <DocumentFrame documentDetected={documentDetected} isBackSide={isBackSide} />
      
      {/* Capture button */}
      <CaptureButton 
        isCapturing={isCapturing}
        captureAttempted={captureAttempted}
        onCapture={handleCapture}
        onRetry={retryCapture}
      />
    </div>
  );
};
