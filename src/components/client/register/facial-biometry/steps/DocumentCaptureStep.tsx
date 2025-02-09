
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
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
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold">
        Captura de Documento - {isBackSide ? 'Verso' : 'Frente'}
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
          videoConstraints={videoConstraints}
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
      <div className="flex justify-center">
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
            "Capturar"
          )}
        </Button>
      </div>
    </div>
  );
};
