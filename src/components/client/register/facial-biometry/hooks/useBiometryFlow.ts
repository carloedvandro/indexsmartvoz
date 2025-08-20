import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCameraManagement } from "@/hooks/useCameraManagement";
import { useToast } from "@/hooks/use-toast";

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
  const [isReleasingCamera, setIsReleasingCamera] = useState(false);
  const { videoConstraints: facialVideoConstraints } = useCameraManagement();
  const { videoConstraints: documentVideoConstraints } = useCameraManagement(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Função para limpar completamente todos os recursos de câmera
  const forceCleanupAllCameras = async (): Promise<boolean> => {
    console.log("🧹 INICIANDO limpeza FORÇADA de todos os recursos de câmera...");
    
    try {
      // 1. Parar todos os streams de mídia ativos globalmente
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log("🛑 Forçando parada de todos os streams ativos...");
        
        // Tentar acessar e imediatamente parar qualquer stream ativo
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log(`📱 ${devices.length} dispositivos encontrados`);
        
        // Para cada tipo de câmera, tentar acessar e parar
        const cameraConfigs = [
          { video: { facingMode: 'user' } },
          { video: { facingMode: 'environment' } },
          { video: true }
        ];
        
        for (const config of cameraConfigs) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia(config);
            console.log(`🎥 Stream obtido para ${JSON.stringify(config)} - parando imediatamente`);
            stream.getTracks().forEach((track, index) => {
              console.log(`🛑 Parando track ${index}: ${track.kind} - ${track.label}`);
              track.stop();
            });
            
            // Aguardar um pouco para garantir que parou
            await new Promise(resolve => setTimeout(resolve, 200));
          } catch (error) {
            console.log(`ℹ️ Não foi possível acessar ${JSON.stringify(config)}:`, error);
          }
        }
      }
      
      // 2. Limpar todos os elementos de vídeo da página
      console.log("🧽 Limpando todos os elementos de vídeo da página...");
      const videoElements = document.querySelectorAll('video');
      videoElements.forEach((video, index) => {
        console.log(`📹 Limpando elemento de vídeo ${index + 1}`);
        if (video.srcObject) {
          const stream = video.srcObject as MediaStream;
          stream.getTracks().forEach(track => {
            console.log(`🛑 Parando track do elemento de vídeo: ${track.kind}`);
            track.stop();
          });
          video.srcObject = null;
        }
        video.pause();
        video.removeAttribute('src');
        video.load();
      });
      
      // 3. Aguardar tempo suficiente para liberação completa
      console.log("⏳ Aguardando 5 segundos para liberação completa...");
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // 4. Verificar se a câmera foi realmente liberada
      console.log("🔍 Verificando se a câmera foi liberada...");
      try {
        // Tentar acessar câmera traseira (que será usada na próxima tela)
        const testStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        console.log("✅ Câmera traseira disponível - liberação confirmada!");
        testStream.getTracks().forEach(track => track.stop());
        return true;
      } catch (error) {
        console.warn("⚠️ Câmera ainda pode estar ocupada, aguardando mais um pouco...", error);
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Segunda tentativa
        try {
          const testStream2 = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
          });
          console.log("✅ Câmera traseira disponível após segunda tentativa!");
          testStream2.getTracks().forEach(track => track.stop());
          return true;
        } catch (error2) {
          console.error("❌ Câmera ainda ocupada após tentativas:", error2);
          return false;
        }
      }
      
    } catch (error) {
      console.error("❌ Erro durante limpeza forçada da câmera:", error);
      return false;
    }
  };

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

  const handleDocumentTypeSelection = async (type: 'rg' | 'cnh') => {
    console.log("📄 Documento selecionado:", type);
    setSelectedDocType(type);
    setIsReleasingCamera(true);
    
    toast({
      title: "Liberando Câmera",
      description: "Aguarde, garantindo que a câmera seja liberada completamente...",
      duration: 8000,
    });
    
    try {
      // Limpar completamente a câmera antes de prosseguir
      console.log("🧹 Iniciando limpeza completa da câmera após seleção do documento...");
      const cameraReleased = await forceCleanupAllCameras();
      
      if (cameraReleased) {
        console.log("✅ Câmera liberada com sucesso - redirecionando...");
        toast({
          title: "Câmera Liberada",
          description: "Redirecionando para verificação de documento...",
        });
        
        // Aguardar mais um pouco antes do redirecionamento
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        navigate("/client/document-verification");
      } else {
        console.warn("⚠️ Não foi possível confirmar liberação da câmera");
        toast({
          title: "Aviso",
          description: "Câmera pode ainda estar ocupada. Prosseguindo mesmo assim...",
          variant: "destructive",
        });
        
        // Aguardar mais tempo antes de tentar
        await new Promise(resolve => setTimeout(resolve, 3000));
        navigate("/client/document-verification");
      }
    } catch (error) {
      console.error("❌ Erro durante liberação da câmera:", error);
      toast({
        title: "Erro",
        description: "Erro ao liberar câmera. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsReleasingCamera(false);
    }
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

  const handleCompletion = () => {
    if (!capturedImages.facial || !capturedImages.documentFront || (selectedDocType === 'rg' && !capturedImages.documentBack)) {
      return;
    }

    // Navegar para a tela de verificação de documentos
    navigate("/client/document-verification");
  };

  return {
    currentStep,
    selectedDocType,
    capturedImages,
    facialVideoConstraints,
    documentVideoConstraints,
    isReleasingCamera,
    handleBack,
    handleContinue,
    handleDocumentTypeSelection,
    handleFacialCapture,
    handleDocumentCapture,
    handleCompletion
  };
};
