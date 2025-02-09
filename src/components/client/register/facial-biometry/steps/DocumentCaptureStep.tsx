
import { useRef, useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Webcam from "react-webcam";
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
}

export const DocumentCaptureStep = ({ 
  onNext, 
  selectedDocType, 
  isBackSide = false,
  videoConstraints 
}: DocumentCaptureStepProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const { toast } = useToast();

  const handleDocumentCapture = async () => {
    if (!webcamRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        toast({
          title: "Erro na Captura",
          description: "Não foi possível capturar a imagem do documento. Por favor, tente novamente.",
          variant: "destructive",
        });
        return;
      }

      const file = await fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => new File([blob], `document-${Date.now()}.jpg`, { type: 'image/jpeg' }));

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(`${selectedDocType}/${isBackSide ? 'back' : 'front'}/${Date.now()}.jpg`, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('document_captures')
        .insert({
          document_type: selectedDocType,
          side: isBackSide ? 'back' : 'front',
          image_url: uploadData.path
        });

      if (dbError) throw dbError;

      toast({
        title: "Documento Capturado",
        description: "Imagem do documento capturada com sucesso!",
      });

      onNext(imageSrc);
    } catch (error) {
      console.error('Error saving document capture:', error);
      toast({
        title: "Erro ao Salvar",
        description: "Ocorreu um erro ao salvar a imagem do documento. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsCapturing(false);
    }
  };

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
        
        {/* Document frame overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[85%] h-[80%] border-2 border-white border-opacity-50">
            {/* Corner guides */}
            <div className="absolute left-0 top-0 w-8 h-2 bg-white"></div>
            <div className="absolute left-0 top-0 w-2 h-8 bg-white"></div>
            
            <div className="absolute right-0 top-0 w-8 h-2 bg-white"></div>
            <div className="absolute right-0 top-0 w-2 h-8 bg-white"></div>
            
            <div className="absolute left-0 bottom-0 w-8 h-2 bg-white"></div>
            <div className="absolute left-0 bottom-0 w-2 h-8 bg-white"></div>
            
            <div className="absolute right-0 bottom-0 w-8 h-2 bg-white"></div>
            <div className="absolute right-0 bottom-0 w-2 h-8 bg-white"></div>

            {/* Center icon and text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="w-16 h-16 rounded-full bg-black bg-opacity-60 flex items-center justify-center mb-2">
                <svg 
                  className="w-8 h-8 text-white" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div className="text-white text-sm">
                Encaixe o Documento
              </div>
            </div>
          </div>
        </div>

        {/* Capture button */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <button
            onClick={handleDocumentCapture}
            disabled={isCapturing}
            className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          >
            <span className="sr-only">Capturar documento</span>
          </button>
        </div>
      </div>
    </div>
  );
};

