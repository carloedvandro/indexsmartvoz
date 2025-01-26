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
  const [countdown, setCountdown] = useState<number | null>(null);
  const countdownInterval = useRef<number | null>(null);
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
    setCountdown(null);
    if (countdownInterval.current) {
      window.clearInterval(countdownInterval.current);
      countdownInterval.current = null;
    }
  };

  const startCountdown = useCallback(() => {
    if (countdown !== null || !isAligned) return;
    
    console.log("Starting countdown");
    setCountdown(3);
    
    if (countdownInterval.current) {
      window.clearInterval(countdownInterval.current);
    }

    countdownInterval.current = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          if (countdownInterval.current) {
            window.clearInterval(countdownInterval.current);
            countdownInterval.current = null;
          }
          capture();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, [capture, countdown, isAligned]);

  const checkAlignment = useCallback(() => {
    if (!webcamRef.current) return;
    
    const video = webcamRef.current.video;
    if (!video) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    try {
      // Ajuste das dimensões para corresponder melhor ao tamanho do documento
      const centerX = canvas.width * 0.15;  // Reduzido para 15% da margem
      const centerY = canvas.height * 0.15; // Reduzido para 15% da margem
      const centerWidth = canvas.width * 0.7;  // Aumentado para 70% da largura
      const centerHeight = canvas.height * 0.7; // Aumentado para 70% da altura
      
      const imageData = context.getImageData(centerX, centerY, centerWidth, centerHeight);
      const data = imageData.data;
      
      // Melhorar a detecção de bordas
      let edges = 0;
      let totalPixels = 0;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Converter para escala de cinza e verificar mudanças significativas
        const gray = (r + g + b) / 3;
        if (i > 0) {
          const prevGray = (data[i - 4] + data[i - 3] + data[i - 2]) / 3;
          if (Math.abs(gray - prevGray) > 25) { // Reduzido o limiar para melhor detecção
            edges++;
          }
        }
        totalPixels++;
      }
      
      // Ajuste do limiar de detecção
      const edgeRatio = edges / totalPixels;
      const isNowAligned = edgeRatio > 0.05 && edgeRatio < 0.2; // Ajuste dos limiares
      
      if (isNowAligned && !isAligned) {
        console.log("Document aligned, starting countdown");
        setIsAligned(true);
        startCountdown(); // Iniciar contagem quando documento é detectado
      } else if (!isNowAligned && isAligned) {
        console.log("Document misaligned, resetting");
        setIsAligned(false);
        setCountdown(null);
        if (countdownInterval.current) {
          window.clearInterval(countdownInterval.current);
          countdownInterval.current = null;
        }
      }
    } catch (error) {
      console.error("Error checking alignment:", error);
    }
  }, [isAligned, startCountdown]);

  useEffect(() => {
    const interval = setInterval(checkAlignment, 200); // Aumentada a frequência de verificação
    return () => {
      clearInterval(interval);
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
      }
    };
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