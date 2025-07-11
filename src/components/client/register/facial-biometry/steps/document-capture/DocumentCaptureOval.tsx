import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera } from "lucide-react";
import { useDocumentCapture } from "./useDocumentCapture";
import { useDocumentDetection } from "./useDocumentDetection";

interface DocumentCaptureOvalProps {
  onNext: (imageSrc: string) => void;
  onBack: () => void;
  selectedDocType: 'rg' | 'cnh';
  isBackSide?: boolean;
  videoConstraints: any;
}

export const DocumentCaptureOval = ({ 
  onNext, 
  onBack,
  selectedDocType, 
  isBackSide = false,
  videoConstraints
}: DocumentCaptureOvalProps) => {
  const webcamRef = useRef<Webcam>(null);
  const { toast } = useToast();
  const [cameraActive, setCameraActive] = useState(true);
  const [documentDetected, setDocumentDetected] = useState(false);
  const [autoDetectionTimer, setAutoDetectionTimer] = useState<NodeJS.Timeout | null>(null);

  // Check user session when component mounts
  useEffect(() => {
    const checkSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        console.error("No active session found in DocumentCaptureOval");
        toast({
          title: "Erro de Autenticação",
          description: "Sessão não encontrada. Por favor, faça login novamente.",
          variant: "destructive",
        });
      }
    };
    
    checkSession();
  }, [toast]);

  // Use our custom hook for document capture
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

  // Simple document detection simulation
  useEffect(() => {
    if (cameraActive && !isCapturing) {
      // Simulate document detection after 3 seconds
      const timer = setTimeout(() => {
        setDocumentDetected(true);
        
        // Auto-capture after detection
        const autoTimer = setTimeout(async () => {
          if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
              console.log("📸 EXECUTANDO CAPTURA AUTOMÁTICA OVAL");
              await handleDocumentCapture(imageSrc);
            }
          }
        }, 2000);
        
        setAutoDetectionTimer(autoTimer);
      }, 3000);

      return () => {
        clearTimeout(timer);
        if (autoDetectionTimer) {
          clearTimeout(autoDetectionTimer);
        }
      };
    }
  }, [cameraActive, isCapturing, handleDocumentCapture, autoDetectionTimer]);

  // Force environment camera for document capture
  const updatedVideoConstraints = {
    ...videoConstraints,
    facingMode: "environment",
    width: { ideal: 1280 },
    height: { ideal: 720 }
  };

  const handleManualCapture = async () => {
    if (!webcamRef.current) {
      toast({
        title: "Erro na Captura",
        description: "Câmera não disponível",
        variant: "destructive",
      });
      return;
    }
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      console.log("📸 EXECUTANDO CAPTURA MANUAL OVAL");
      await handleDocumentCapture(imageSrc);
    }
  };

  const getStatusMessage = () => {
    if (isCapturing) return "Processando documento...";
    if (documentDetected) return "Documento detectado com sucesso!";
    return `Centralize ${isBackSide ? 'o verso' : 'a frente'} do documento dentro do oval`;
  };

  const getDocumentTypeName = () => {
    if (selectedDocType === 'rg') return 'RG';
    if (selectedDocType === 'cnh') return 'CNH';
    return 'Documento';
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-30">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onBack}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      {/* Main content card */}
      <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-3xl shadow-2xl w-full max-w-md text-center">
        <h2 className="text-xl font-semibold text-white mb-6">
          Escaneie o {getDocumentTypeName()} - {isBackSide ? 'Verso' : 'Frente'}
        </h2>
        
        {/* Oval camera frame */}
        <div className="relative w-[280px] h-[380px] mx-auto mb-6">
          {/* Oval border */}
          <div 
            className={`absolute inset-0 border-2 ${
              documentDetected ? 'border-green-400' : 'border-white/60'
            } rounded-[50%/60%] overflow-hidden transition-colors duration-500`}
            style={{
              boxShadow: documentDetected 
                ? '0 0 20px rgba(34, 197, 94, 0.5)' 
                : '0 0 20px rgba(255, 255, 255, 0.3)'
            }}
          >
            {cameraActive ? (
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={updatedVideoConstraints}
                className="w-full h-full object-cover"
                onUserMedia={() => console.log("📷 Câmera oval inicializada")}
                onUserMediaError={(error) => {
                  console.error("❌ Erro na câmera oval:", error);
                  setCameraActive(false);
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black">
                <Camera className="w-12 h-12 text-white/50" />
              </div>
            )}
          </div>

          {/* Detection indicator */}
          {documentDetected && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          )}
        </div>

        {/* Status message */}
        <p className={`text-lg mb-6 transition-colors duration-300 ${
          documentDetected ? 'text-green-400' : 'text-white'
        }`}>
          {getStatusMessage()}
        </p>

        {/* Action button */}
        <Button
          onClick={documentDetected ? handleManualCapture : undefined}
          disabled={!documentDetected || isCapturing}
          className={`w-full py-3 px-6 font-semibold text-lg rounded-xl transition-all duration-300 ${
            documentDetected && !isCapturing
              ? 'bg-yellow-500 hover:bg-yellow-600 text-primary'
              : 'bg-gray-500 cursor-not-allowed text-gray-300'
          }`}
        >
          {isCapturing ? 'Processando...' : 'Avançar'}
        </Button>

        {/* Manual capture option */}
        {!documentDetected && cameraActive && (
          <Button
            variant="ghost"
            onClick={handleManualCapture}
            disabled={isCapturing}
            className="w-full mt-3 text-white/80 hover:text-white hover:bg-white/10"
          >
            <Camera className="w-5 h-5 mr-2" />
            Capturar manualmente
          </Button>
        )}
      </div>
    </div>
  );
};