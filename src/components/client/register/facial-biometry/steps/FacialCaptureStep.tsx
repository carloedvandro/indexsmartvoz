
import { useRef, useState, useEffect } from "react";
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
  const [faceDetected, setFaceDetected] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const { toast } = useToast();

  const checkFace = async (imageData: ImageData) => {
    // Simplified face detection - checks for skin-tone pixels in the center
    const data = imageData.data;
    let skinTonePixels = 0;
    const totalPixels = data.length / 4;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Basic skin tone detection
      if (r > 60 && g > 40 && b > 20 && r > g && g > b) {
        skinTonePixels++;
      }
    }
    
    return (skinTonePixels / totalPixels) > 0.1;
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (webcamRef.current && !isProcessing) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          const img = new Image();
          img.src = imageSrc;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              const imageData = ctx.getImageData(
                img.width * 0.25, 
                img.height * 0.25, 
                img.width * 0.5, 
                img.height * 0.5
              );
              checkFace(imageData).then(detected => setFaceDetected(detected));
            }
          };
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleFacialCapture = async () => {
    if (!faceDetected) {
      toast({
        title: "Rosto não detectado",
        description: "Por favor, posicione seu rosto dentro do círculo",
        variant: "destructive",
      });
      return;
    }

    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setIsProcessing(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
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
      }
    }
  };

  // Forçar o uso da câmera frontal
  const updatedVideoConstraints = {
    ...videoConstraints,
    facingMode: "user",
    width: { ideal: 1280 },
    height: { ideal: 720 }
  };

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold">Captura Facial</h2>
      <p className="text-gray-600">Posicione seu rosto dentro do círculo</p>
      <div className="relative w-64 h-64 mx-auto">
        <div className={`absolute inset-0 rounded-full border-4 ${
          faceDetected ? 'border-green-500' : 'border-dashed border-primary/70'
        } z-10 transition-colors duration-300`}></div>
        <div className="w-full h-full overflow-hidden rounded-full">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={updatedVideoConstraints}
            className="w-full h-full object-cover"
            mirrored={true}
          />
        </div>
      </div>
      <p className="text-sm text-gray-500">
        {faceDetected ? 'Rosto detectado! Você pode capturar a foto.' : 'Mantenha uma distância adequada e certifique-se que seu rosto está bem iluminado'}
      </p>
      <Button 
        onClick={handleFacialCapture}
        disabled={isProcessing || !faceDetected}
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
