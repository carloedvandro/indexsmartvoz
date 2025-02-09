
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, RotateCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Webcam from "react-webcam";

interface DocumentCaptureStepProps {
  onNext: () => void;
  selectedDocType: 'rg' | 'cnh';
  isBackSide?: boolean;
  onToggleCamera: () => void;
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
  onToggleCamera,
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
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsProcessing(false);
        onNext();
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
      <div className="flex justify-center gap-4">
        <Button 
          onClick={onToggleCamera}
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
};
