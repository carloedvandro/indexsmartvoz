import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCcw, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentCaptureProps {
  onCapture: (imageData: string) => void;
  side: "front" | "back";
}

export function DocumentCapture({ onCapture, side }: DocumentCaptureProps) {
  const webcamRef = useRef<Webcam | null>(null);
  const [isAligned, setIsAligned] = useState(false);
  const [stableFrames, setStableFrames] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const { toast } = useToast();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: { exact: "environment" },
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        console.log(`Capturing ${side} of document`);
        onCapture(imageSrc);
        toast({
          title: "Imagem capturada com sucesso!",
          description: `Lado ${side === 'front' ? 'frontal' : 'traseiro'} do documento foi capturado.`,
        });
      }
    }
  }, [onCapture, side, toast]);

  const retake = () => {
    setIsAligned(false);
    setStableFrames(0);
    setCountdown(null);
  };

  const startCountdown = useCallback(() => {
    if (countdown !== null) return;
    
    console.log("Iniciando contagem regressiva");
    setCountdown(3);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          if (prev === 1) {
            capture();
          }
          return null;
        }
        console.log("Contagem:", prev - 1);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [capture, countdown]);

  const checkAlignment = useCallback(() => {
    if (!webcamRef.current?.video) return;
    
    const video = webcamRef.current.video;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    try {
      const centerX = canvas.width * 0.15;
      const centerY = canvas.height * 0.15;
      const centerWidth = canvas.width * 0.7;
      const centerHeight = canvas.height * 0.7;
      
      const imageData = context.getImageData(centerX, centerY, centerWidth, centerHeight);
      const data = imageData.data;
      
      let edges = 0;
      let totalPixels = 0;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        const gray = (r + g + b) / 3;
        if (i > 0) {
          const prevGray = (data[i - 4] + data[i - 3] + data[i - 2]) / 3;
          if (Math.abs(gray - prevGray) > 20) {
            edges++;
          }
        }
        totalPixels++;
      }
      
      const edgeRatio = edges / totalPixels;
      const isNowAligned = edgeRatio > 0.03 && edgeRatio < 0.3;
      
      if (isNowAligned) {
        setStableFrames(prev => prev + 1);
        if (stableFrames >= 30) { // Aumentado para 30 frames (1 segundo) para maior estabilidade
          if (!isAligned) {
            console.log("Documento detectado e estável, iniciando contagem");
            setIsAligned(true);
            startCountdown();
            toast({
              title: "Documento detectado",
              description: `Mantenha o ${side === 'front' ? 'frente' : 'verso'} do documento parado para a captura`,
            });
          }
        }
      } else {
        if (stableFrames > 0 || isAligned) {
          console.log("Documento desalinhado, reiniciando");
          setIsAligned(false);
          setStableFrames(0);
          setCountdown(null);
        }
      }
    } catch (error) {
      console.error("Erro ao verificar alinhamento:", error);
    }
  }, [isAligned, startCountdown, toast, countdown, side, stableFrames]);

  useEffect(() => {
    const interval = setInterval(checkAlignment, 33); // ~30fps
    return () => clearInterval(interval);
  }, [checkAlignment]);

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[60vh]">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className={`
              border-4 
              ${isAligned ? 'border-green-500' : 'border-white'} 
              w-[85%] 
              h-[70%] 
              rounded-lg
              transition-colors
              duration-300
            `}
          >
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 w-24 h-24 rounded-full flex items-center justify-center">
                  <Timer className="w-6 h-6 text-white absolute top-4" />
                  <span className="text-6xl font-bold text-white">
                    {countdown}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 left-0 right-0 px-4 z-50">
        <Button
          type="button"
          variant="outline"
          onClick={retake}
          className="w-full bg-white"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}