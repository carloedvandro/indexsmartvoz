import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera } from "lucide-react";

interface DocumentScannerCombinedProps {
  onComplete: (frontImage: string, backImage: string) => void;
  onBack: () => void;
  selectedDocType: 'rg' | 'cnh';
}

export const DocumentScannerCombined = ({ 
  onComplete, 
  onBack,
  selectedDocType
}: DocumentScannerCombinedProps) => {
  const webcamRef = useRef<Webcam>(null);
  const { toast } = useToast();
  const [cameraActive, setCameraActive] = useState(true);
  const [currentStep, setCurrentStep] = useState<'front' | 'back' | 'validating'>('front');
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Check user session when component mounts
  useEffect(() => {
    const checkSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        console.error("No active session found in DocumentScannerCombined");
        toast({
          title: "Erro de Autenticação",
          description: "Sessão não encontrada. Por favor, faça login novamente.",
          variant: "destructive",
        });
      }
    };
    
    checkSession();
  }, [toast]);

  const getDocumentTypeName = () => {
    if (selectedDocType === 'rg') return 'RG';
    if (selectedDocType === 'cnh') return 'CNH';
    return 'Documento';
  };

  const getStepText = () => {
    switch (currentStep) {
      case 'front':
        return `Posicione a frente do ${getDocumentTypeName()} na câmera`;
      case 'back':
        return `Agora, posicione o verso do ${getDocumentTypeName()}`;
      case 'validating':
        return 'Validando com inteligência artificial...';
      default:
        return '';
    }
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 'front':
        return 'Capturar Frente';
      case 'back':
        return 'Capturar Verso';
      case 'validating':
        return 'Processando...';
      default:
        return '';
    }
  };

  const captureImage = async () => {
    if (!webcamRef.current) {
      toast({
        title: "Erro na Captura",
        description: "Câmera não disponível",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        throw new Error("Não foi possível capturar a imagem");
      }

      if (currentStep === 'front') {
        setFrontImage(imageSrc);
        setCurrentStep('back');
        setStatusMessage("Frente capturada com sucesso!");
        
        // Clear message after a moment
        setTimeout(() => setStatusMessage(""), 2000);
        
      } else if (currentStep === 'back') {
        setBackImage(imageSrc);
        setCurrentStep('validating');
        setStatusMessage("Validando com inteligência artificial...");
        
        // Simulate validation process
        await validateDocument(frontImage!, imageSrc);
      }
    } catch (error: any) {
      console.error("Erro na captura:", error);
      toast({
        title: "Erro na Captura",
        description: error.message || "Erro ao capturar imagem",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const validateDocument = async (frontImg: string, backImg: string) => {
    try {
      // Simulate AI validation delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // For now, always approve (in real app, this would call AI validation)
      const validationApproved = true;
      
      if (validationApproved) {
        setStatusMessage("✅ Documentos validados com sucesso!");
        toast({
          title: "Sucesso",
          description: "Documentos validados com sucesso!",
        });
        
        // Complete the process
        setTimeout(() => {
          onComplete(frontImg, backImg);
        }, 1500);
      } else {
        setStatusMessage("❌ Dados ou foto não conferem. Cadastro reprovado.");
        toast({
          title: "Validação Falhou",
          description: "Os documentos não passaram na validação.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro na validação:", error);
      setStatusMessage("Erro na validação. Tente novamente.");
      toast({
        title: "Erro na Validação",
        description: "Ocorreu um erro durante a validação.",
        variant: "destructive",
      });
    }
  };

  // Force environment camera for document capture
  const videoConstraints = {
    facingMode: "environment",
    width: { ideal: 1280 },
    height: { ideal: 720 }
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
          disabled={currentStep === 'validating'}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      {/* Main scanner container */}
      <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-white mb-4 text-center">
          Escaneie seu {getDocumentTypeName()}
        </h2>
        
        <p className="text-white/90 text-center mb-4">
          {getStepText()}
        </p>

        {/* Camera container */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4">
          {cameraActive ? (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-full object-cover"
              onUserMedia={() => console.log("📷 Câmera do scanner inicializada")}
              onUserMediaError={(error) => {
                console.error("❌ Erro na câmera do scanner:", error);
                setCameraActive(false);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black rounded-2xl">
              <Camera className="w-12 h-12 text-white/50" />
            </div>
          )}
          
          {/* Step indicators */}
          <div className="absolute top-3 left-3 bg-black/70 px-3 py-1 rounded-full text-white text-sm">
            {currentStep === 'front' ? '1/2 Frente' : currentStep === 'back' ? '2/2 Verso' : 'Validando'}
          </div>
          
          {/* Success indicators */}
          {frontImage && (
            <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          )}
        </div>

        {/* Capture button */}
        <Button
          onClick={captureImage}
          disabled={!cameraActive || isProcessing || currentStep === 'validating'}
          className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-primary font-bold text-lg rounded-xl transition-colors"
        >
          {isProcessing ? 'Capturando...' : getButtonText()}
        </Button>

        {/* Status message */}
        {statusMessage && (
          <div className={`mt-4 text-center font-medium ${
            statusMessage.includes('❌') 
              ? 'text-red-400' 
              : statusMessage.includes('✅')
              ? 'text-green-400'
              : 'text-yellow-400'
          }`}>
            {statusMessage}
          </div>
        )}

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-4">
          <div className={`w-3 h-3 rounded-full ${frontImage ? 'bg-green-500' : 'bg-white/30'}`}></div>
          <div className={`w-3 h-3 rounded-full ${backImage ? 'bg-green-500' : 'bg-white/30'}`}></div>
        </div>
      </div>
    </div>
  );
};