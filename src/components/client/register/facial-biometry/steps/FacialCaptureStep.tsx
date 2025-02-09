
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Webcam from "react-webcam";

interface FacialCaptureStepProps {
  onNext: (imageSrc: string) => void;
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
        try {
          // Simulate processing/validation of the facial image
          await new Promise(resolve => setTimeout(resolve, 2000));
          onNext(imageSrc);
        } catch (error) {
          toast({
            title: "Erro na Captura",
            description: "Ocorreu um erro ao processar a imagem. Por favor, tente novamente.",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
        }
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
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary/70 z-10"></div>
        <div className="w-full h-full overflow-hidden rounded-full">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute left-1/2 top-[40%] bottom-[40%] w-[2px] bg-primary/70 -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-[40%] right-[40%] h-[2px] bg-primary/70 -translate-y-1/2"></div>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Mantenha uma distância adequada e certifique-se que seu rosto está bem iluminado
      </p>
      <Button 
        onClick={handleFacialCapture}
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
  );
};
