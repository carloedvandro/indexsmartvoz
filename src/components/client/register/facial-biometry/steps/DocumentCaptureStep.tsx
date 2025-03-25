
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const [isCapturing, setIsCapturing] = useState(false);
  const { toast } = useToast();

  const handleCapture = async () => {
    try {
      setIsCapturing(true);
      
      if (!webcamRef.current) {
        throw new Error("Câmera não disponível");
      }
      
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        throw new Error("Falha ao capturar imagem");
      }
      
      // Check if user is authenticated before proceeding
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.user) {
        throw new Error("Usuário não está autenticado");
      }
      
      // Save the document image to Supabase Storage
      const userId = sessionData.session.user.id;
      const blob = await fetch(imageSrc).then(res => res.blob());
      const fileName = `${selectedDocType}-${isBackSide ? 'back' : 'front'}-${Date.now()}.jpg`;
      const file = new File([blob], fileName, { type: 'image/jpeg' });
      const filePath = `${userId}/documents/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);
        
      if (uploadError) {
        console.error('Error uploading document image:', uploadError);
        throw uploadError;
      }
      
      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onNext(imageSrc);
    } catch (error: any) {
      console.error('Error during document capture:', error);
      toast({
        title: "Erro na Captura",
        description: error.message || "Ocorreu um erro ao capturar o documento. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  // Forçar o uso da câmera traseira
  const updatedVideoConstraints = {
    ...videoConstraints,
    facingMode: "environment",
    width: { ideal: 1280 },
    height: { ideal: 720 }
  };
  
  return (
    <div className="relative h-[540px] bg-gray-100 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-black bg-opacity-70 text-white p-4">
        <div className="text-sm">
          vivo
        </div>
        <div className="text-sm">
          Passo {step} de {totalSteps}
        </div>
      </div>

      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={updatedVideoConstraints}
        className="w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-4/5 h-2/5 border-2 border-white border-opacity-70 rounded-md"></div>
      </div>
      
      <button 
        onClick={handleCapture}
        disabled={isCapturing}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white"></div>
        </div>
      </button>
    </div>
  );
};
