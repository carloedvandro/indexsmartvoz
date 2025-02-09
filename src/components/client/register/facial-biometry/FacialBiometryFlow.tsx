import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Camera, Clock, FileCheck, ArrowRight, IdCard, RotateCw } from "lucide-react";
import { Steps } from "@/components/client/register/facial-biometry/Steps";
import { Input } from "@/components/ui/input";
import Webcam from "react-webcam";

interface FacialBiometryFlowProps {
  onComplete: (verificationData: {
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

export const FacialBiometryFlow = ({ onComplete, onBack }: FacialBiometryFlowProps) => {
  const [currentStep, setCurrentStep] = useState<Step>('cpf-verification');
  const [cpfPrefix, setCpfPrefix] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<'rg' | 'cnh' | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [isFacingUser, setIsFacingUser] = useState(true);
  const webcamRef = useRef<Webcam>(null);
  const { toast } = useToast();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: isFacingUser ? "user" : "environment"
  };

  const toggleCamera = useCallback(() => {
    setIsFacingUser(prev => !prev);
  }, []);

  const handleCpfVerification = async () => {
    if (cpfPrefix.length !== 5) {
      toast({
        title: "CPF Inválido",
        description: "Por favor, insira os primeiros 5 dígitos do seu CPF.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep('camera-access');
  };

  const simulateProcessing = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
  };

  const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraEnabled(true);
      setCurrentStep('capture-instructions');
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error("Erro ao acessar câmera:", error);
      toast({
        title: "Erro de Acesso",
        description: "Por favor, permita o acesso à câmera para continuar.",
        variant: "destructive",
      });
    }
  };

  const handleFacialCapture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        await simulateProcessing();
        setCurrentStep('facial-analysis');
        setTimeout(() => setCurrentStep('document-instructions'), 2000);
      } else {
        toast({
          title: "Erro na Captura",
          description: "Não foi possível capturar a imagem. Por favor, tente novamente.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDocumentTypeSelection = (type: 'rg' | 'cnh') => {
    setSelectedDocType(type);
    setCurrentStep('document-front');
  };

  const handleDocumentCapture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        await simulateProcessing();
        if (currentStep === 'document-front') {
          setCurrentStep('document-back');
        } else {
          setCurrentStep('document-analysis');
          setTimeout(() => setCurrentStep('completion'), 2000);
        }
      } else {
        toast({
          title: "Erro na Captura",
          description: "Não foi possível capturar a imagem do documento. Por favor, tente novamente.",
          variant: "destructive",
        });
      }
    }
  };

  const handleCompletion = () => {
    onComplete({
      facialVerification: true,
      documentVerification: true,
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'cpf-verification':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">Verificação Biométrica</h2>
            <p className="text-center text-gray-600">
              Insira os primeiros 5 dígitos do seu CPF para iniciar
            </p>
            <div className="max-w-xs mx-auto space-y-4">
              <Input
                type="number"
                placeholder="XXXXX"
                maxLength={5}
                value={cpfPrefix}
                onChange={(e) => setCpfPrefix(e.target.value.slice(0, 5))}
                className="text-center text-lg"
              />
              <Button 
                onClick={handleCpfVerification}
                className="w-full"
                disabled={cpfPrefix.length !== 5}
              >
                Validar CPF
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        );

      case 'camera-access':
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold">Acesso à Câmera</h2>
            <p className="text-gray-600">
              Para iniciar, libere o acesso à câmera do aparelho
            </p>
            <div className="flex justify-center">
              <Button onClick={handleCameraAccess} className="w-full max-w-xs">
                <Camera className="mr-2" />
                Liberar Câmera
              </Button>
            </div>
          </div>
        );

      case 'capture-instructions':
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold">Instruções para Captura</h2>
            <div className="space-y-4 text-gray-600">
              <p>Hora de tirar sua foto de identificação.</p>
              <p>Antes de começar, algumas dicas:</p>
              <ul className="list-disc list-inside text-left max-w-xs mx-auto">
                <li>Ambiente bem iluminado</li>
                <li>Fundo claro e limpo</li>
                <li>Olhe diretamente para a câmera</li>
                <li>Não use óculos ou acessórios</li>
              </ul>
            </div>
            <Button onClick={() => setCurrentStep('facial-capture')} className="w-full max-w-xs">
              Entendi, Vamos Começar
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        );

      case 'facial-capture':
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold">Captura Facial</h2>
            <p className="text-gray-600">Posicione seu rosto dentro do círculo</p>
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary animate-pulse"></div>
              <div className="w-full h-full overflow-hidden rounded-full">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-primary"
                  />
                  <line
                    x1="25"
                    y1="50"
                    x2="75"
                    y2="50"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-primary"
                  />
                  <line
                    x1="50"
                    y1="25"
                    x2="50"
                    y2="75"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-primary"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Mantenha uma distância adequada e certifique-se que seu rosto está bem iluminado
            </p>
            <Button 
              onClick={handleFacialCapture}
              disabled={isProcessing}
              className="w-full max-w-xs"
            >
              {isProcessing ? (
                <>
                  <Clock className="mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                "Capturar"
              )}
            </Button>
          </div>
        );

      case 'facial-analysis':
      case 'document-analysis':
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold">Em análise</h2>
            <p className="text-gray-600">Aguarde um instante</p>
            <div className="flex justify-center">
              <Clock className="w-16 h-16 text-purple-500 animate-spin" />
            </div>
          </div>
        );

      case 'document-instructions':
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold">Verificação de Documento</h2>
            <p className="text-gray-600">
              Tenha em mãos seu RG, CNH ou Documento oficial de identificação com foto.
            </p>
            <Button 
              onClick={() => setCurrentStep('document-type')}
              className="w-full max-w-xs"
            >
              Continuar
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        );

      case 'document-type':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Selecione o tipo de documento</h2>
            <div className="grid gap-4 max-w-xs mx-auto">
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center"
                onClick={() => handleDocumentTypeSelection('rg')}
              >
                <IdCard className="w-8 h-8 mb-2" />
                USAR MEU RG
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center"
                onClick={() => handleDocumentTypeSelection('cnh')}
              >
                <IdCard className="w-8 h-8 mb-2" />
                USAR MINHA CNH
              </Button>
            </div>
          </div>
        );

      case 'document-front':
      case 'document-back':
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold">
              Captura de Documento - {currentStep === 'document-front' ? 'Frente' : 'Verso'}
            </h2>
            <p className="text-gray-600">
              Alinhe seu {selectedDocType === 'rg' ? 'RG' : 'CNH'} dentro da área demarcada
            </p>
            <div className="relative w-full max-w-sm mx-auto aspect-[4/3]">
              <div className="absolute inset-0 border-2 border-dashed border-primary animate-pulse rounded-lg"></div>
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  ...videoConstraints,
                  facingMode: "environment"
                }}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 75">
                  <rect
                    x="5"
                    y="5"
                    width="90"
                    height="65"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-primary"
                  />
                  <line
                    x1="5"
                    y1="37.5"
                    x2="95"
                    y2="37.5"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-primary"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={toggleCamera}
                variant="outline"
                className="flex-1 max-w-[120px]"
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Girar
              </Button>
              <Button
                onClick={handleDocumentCapture}
                disabled={isProcessing}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <Clock className="mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Capturar"
                )}
              </Button>
            </div>
          </div>
        );

      case 'completion':
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold">Biometria Concluída!</h2>
            <p className="text-gray-600">
              Você finalizou o processo de coleta de documentos.
            </p>
            <div className="flex justify-center">
              <FileCheck className="w-16 h-16 text-green-500" />
            </div>
            <Button onClick={handleCompletion} className="w-full max-w-xs">
              Finalizar
              <ArrowRight className="ml-2" />
            </Button>
          </div>
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
