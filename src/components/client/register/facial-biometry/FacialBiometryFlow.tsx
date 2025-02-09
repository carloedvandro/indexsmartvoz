import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Camera, FileCheck, ArrowRight } from "lucide-react";
import { Steps } from "@/components/client/register/facial-biometry/Steps";
import { CaptureInstructions } from "@/components/client/register/facial-biometry/CaptureInstructions";
import { DocumentVerification } from "@/components/client/register/facial-biometry/DocumentVerification";

interface FacialBiometryFlowProps {
  onComplete: (verificationData: {
    facialVerification: boolean;
    documentVerification: boolean;
  }) => void;
  onBack: () => void;
}

type Step = 'instructions' | 'facial-capture' | 'document-upload' | 'document-verification';

export const FacialBiometryFlow = ({ onComplete, onBack }: FacialBiometryFlowProps) => {
  const [currentStep, setCurrentStep] = useState<Step>('instructions');
  const [isCapturing, setIsCapturing] = useState(false);
  const { toast } = useToast();
  const [verificationStatus, setVerificationStatus] = useState({
    facialVerification: false,
    documentVerification: false,
  });

  const handleCaptureComplete = async () => {
    try {
      setIsCapturing(true);
      // Simulate facial biometry capture
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setVerificationStatus(prev => ({
        ...prev,
        facialVerification: true
      }));
      
      toast({
        title: "Biometria facial coletada",
        description: "Por favor, prossiga com o envio dos documentos.",
      });

      setCurrentStep('document-upload');
    } catch (error) {
      console.error("Erro na captura biométrica:", error);
      toast({
        title: "Erro na verificação",
        description: "Ocorreu um erro durante a verificação biométrica. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  const handleDocumentUploadComplete = async () => {
    try {
      setVerificationStatus(prev => ({
        ...prev,
        documentVerification: true
      }));
      
      // Complete the registration process
      onComplete(verificationStatus);
    } catch (error) {
      console.error("Erro na verificação de documentos:", error);
      toast({
        title: "Erro na verificação",
        description: "Ocorreu um erro durante a verificação dos documentos. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'instructions':
        return (
          <CaptureInstructions 
            onNext={() => setCurrentStep('facial-capture')}
            onBack={onBack}
          />
        );
      case 'facial-capture':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Verificação Biométrica</h2>
              <p className="text-gray-600">
                Posicione seu rosto no centro da câmera e mantenha-se imóvel.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <Camera className="w-24 h-24 text-gray-400" />
              </div>

              <div className="flex flex-col gap-2 w-full max-w-xs">
                <Button
                  onClick={handleCaptureComplete}
                  disabled={isCapturing}
                  className="w-full"
                >
                  {isCapturing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Capturando...
                    </>
                  ) : (
                    "Capturar Imagem"
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep('instructions')}
                  disabled={isCapturing}
                >
                  Voltar
                </Button>
              </div>
            </div>
          </div>
        );
      case 'document-upload':
        return (
          <DocumentVerification
            onComplete={handleDocumentUploadComplete}
            onBack={() => setCurrentStep('facial-capture')}
          />
        );
      case 'document-verification':
        return (
          <div>Verificando documentos...</div>
        );
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
