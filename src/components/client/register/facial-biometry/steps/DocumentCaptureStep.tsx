
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Webcam from "react-webcam";

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
  const [isProcessing, setIsProcessing] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const { toast } = useToast();

  const handleDocumentCapture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setIsProcessing(true);
        try {
          // Simulate processing/validation of the document image
          await new Promise(resolve => setTimeout(resolve, 2000));
          onNext(imageSrc);
        } catch (error) {
          toast({
            title: "Erro na Captura",
            description: "Ocorreu um erro ao processar a imagem do documento. Por favor, tente novamente.",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Captura de Documento - {isBackSide ? 'Verso' : 'Frente'}
      </h2>
      <p className="text-gray-600 text-center">
        Alinhe seu {selectedDocType === 'rg' ? 'RG' : 'CNH'} dentro da área demarcada
      </p>
      <div className={`relative mx-auto ${isBackSide ? 'w-[300px] h-[400px]' : 'w-[400px] h-[300px]'}`}>
        <div className="absolute inset-0 border-2 border-primary border-dashed rounded-lg z-10"></div>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            ...videoConstraints,
            aspectRatio: isBackSide ? 3/4 : 4/3
          }}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-primary/30 -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-primary/30 -translate-y-1/2"></div>
          <div className="absolute left-0 top-0 w-8 h-8 border-t-2 border-l-2 border-white"></div>
          <div className="absolute right-0 top-0 w-8 h-8 border-t-2 border-r-2 border-white"></div>
          <div className="absolute left-0 bottom-0 w-8 h-8 border-b-2 border-l-2 border-white"></div>
          <div className="absolute right-0 bottom-0 w-8 h-8 border-b-2 border-r-2 border-white"></div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <Button
          onClick={handleDocumentCapture}
          disabled={isProcessing}
          className="w-full max-w-xs bg-primary hover:bg-primary/90"
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
};

