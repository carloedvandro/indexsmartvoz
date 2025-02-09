
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Webcam from "react-webcam";

interface FacialCaptureStepProps {
  onNext: () => void;
  videoConstraints: {
    width: number;
    height: number;
    facingMode: string;
  };
}

export const FacialCaptureStep = ({ onNext, videoConstraints }: FacialCaptureStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const { toast } = useToast();

  const handleFacialCapture = async () => {
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
          description: "Não foi possível capturar a imagem. Por favor, tente novamente.",
          variant: "destructive",
        });
      }
    }
  };

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
};
