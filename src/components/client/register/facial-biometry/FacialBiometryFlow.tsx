
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Camera, Clock, FileCheck, ArrowRight, IdCard } from "lucide-react";
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
  | 'document-capture'
  | 'document-analysis'
  | 'completion';

export const FacialBiometryFlow = ({ onComplete, onBack }: FacialBiometryFlowProps) => {
  const [currentStep, setCurrentStep] = useState<Step>('cpf-verification');
  const [cpfPrefix, setCpfPrefix] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<'rg' | 'cnh' | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const { toast } = useToast();

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
      // Importante: liberar a stream após obter acesso
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
    setCurrentStep('document-capture');
  };

  const handleDocumentCapture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        await simulateProcessing();
        setCurrentStep('document-analysis');
        setTimeout(() => setCurrentStep('completion'), 2000);
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
            <p className="text-gray-600">Centralize seu rosto</p>
            <div className="w-64 h-64 mx-auto overflow-hidden rounded-full">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
              />
            </div>
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

      case 'document-capture':
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold">Captura de Documento</h2>
            <p className="text-gray-600">
              Enquadre seu {selectedDocType === 'rg' ? 'RG' : 'CNH'} dentro da área demarcada
            </p>
            <div className="w-full max-w-sm mx-auto aspect-[4/3] overflow-hidden rounded-lg">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              onClick={handleDocumentCapture}
              disabled={isProcessing}
              className="w-full max-w-xs"
            >
              {isProcessing ? (
                <>
                  <Clock className="mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                "Capturar Documento"
              )}
            </Button>
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

