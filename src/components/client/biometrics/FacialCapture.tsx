import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCcw, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FacialCaptureProps {
  onCapture: (imageData: string) => void;
}

export function FacialCapture({ onCapture }: FacialCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAligned, setIsAligned] = useState(false);
  const [stableFrames, setStableFrames] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const { toast } = useToast();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      onCapture(imageSrc);
    }
  }, [onCapture]);

  const retake = () => {
    setCapturedImage(null);
    setIsAligned(false);
    setStableFrames(0);
    setCountdown(null);
  };

  const startCountdown = useCallback(() => {
    if (countdown !== null) return;
    
    console.log("Iniciando contagem regressiva para captura facial");
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
      // Define a região central onde esperamos encontrar o rosto
      const centerX = canvas.width * 0.25;
      const centerY = canvas.height * 0.15;
      const centerWidth = canvas.width * 0.5;
      const centerHeight = canvas.height * 0.7;
      
      const imageData = context.getImageData(centerX, centerY, centerWidth, centerHeight);
      const data = imageData.data;
      
      let edges = 0;
      let totalPixels = 0;
      
      // Detectar bordas na região central
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        const gray = (r + g + b) / 3;
        if (i > 0) {
          const prevGray = (data[i - 4] + data[i - 3] + data[i - 2]) / 3;
          if (Math.abs(gray - prevGray) > 30) { // Aumentado o limiar para melhor detecção
            edges++;
          }
        }
        totalPixels++;
      }
      
      const edgeRatio = edges / totalPixels;
      const isNowAligned = edgeRatio > 0.05 && edgeRatio < 0.3;
      
      if (isNowAligned) {
        setStableFrames(prev => prev + 1);
        if (stableFrames >= 45) { // 1.5 segundos de estabilidade
          if (!isAligned) {
            console.log("Rosto detectado e estável");
            setIsAligned(true);
            startCountdown();
            toast({
              title: "Rosto detectado",
              description: "Mantenha-se parado para a captura",
            });
          }
        }
      } else {
        if (stableFrames > 0 || isAligned) {
          console.log("Rosto desalinhado, reiniciando");
          setIsAligned(false);
          setStableFrames(0);
          setCountdown(null);
        }
      }
    } catch (error) {
      console.error("Erro ao verificar alinhamento:", error);
    }
  }, [isAligned, startCountdown, stableFrames, toast]);

  useEffect(() => {
    const interval = setInterval(checkAlignment, 33); // ~30fps
    return () => clearInterval(interval);
  }, [checkAlignment]);

  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className="space-y-4">
      <div className="relative w-[300px] h-[300px] mx-auto">
        {!capturedImage ? (
          <>
            <div className="absolute inset-0 z-10 pointer-events-none">
              <svg className="w-full h-full">
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx="45%"
                  ry="60%"
                  fill="none"
                  stroke={isAligned ? "#22c55e" : "white"}
                  strokeWidth="2"
                />
              </svg>
            </div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="rounded-lg"
            />
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 w-16 h-16 rounded-full flex items-center justify-center">
                  <Timer className="w-4 h-4 text-white absolute top-3" />
                  <span className="text-4xl font-bold text-white">
                    {countdown}
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <img src={capturedImage} alt="captured" className="rounded-lg" />
        )}
      </div>

      <div className="flex justify-center gap-2">
        {capturedImage && (
          <Button variant="outline" onClick={retake} className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Repetir
          </Button>
        )}
      </div>

      {!capturedImage && (
        <p className="text-center text-sm text-gray-500">
          {isAligned 
            ? "Mantenha o rosto parado para a captura" 
            : "Posicione seu rosto dentro do círculo"}
        </p>
      )}
    </div>
  );
}