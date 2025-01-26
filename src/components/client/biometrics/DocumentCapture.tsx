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
    if (countdown !== null || !isAligned) return; // Prevent multiple countdowns and ensure document is aligned
    
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
      // Get the center region of the frame where we expect the document
      const centerX = canvas.width * 0.2;
      const centerY = canvas.height * 0.2;
      const centerWidth = canvas.width * 0.6;
      const centerHeight = canvas.height * 0.6;
      
      const imageData = context.getImageData(centerX, centerY, centerWidth, centerHeight);
      const data = imageData.data;
      
      // Calculate edge detection in the center region
      let edges = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Convert to grayscale and check for significant changes in intensity
        const gray = (r + g + b) / 3;
        if (i > 0 && Math.abs(gray - ((data[i - 4] + data[i - 3] + data[i - 2]) / 3)) > 30) {
          edges++;
        }
      }
      
      // Check if we have enough edges to indicate a document
      const isNowAligned = edges > (data.length / 4) * 0.01;
      
      if (isNowAligned && !isAligned) {
        console.log("Document aligned, starting countdown");
        setIsAligned(true);
        startCountdown(); // Start countdown immediately when document is detected
        toast({
          title: "Documento alinhado",
          description: "Mantenha o documento parado para a captura automática",
        });
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
  }, [isAligned, startCountdown, toast]);

  useEffect(() => {
    const interval = setInterval(checkAlignment, 500);
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
          <div className={`border-4 ${isAligned ? 'border-green-500' : 'border-white'} w-4/5 h-3/5 rounded-lg`}>
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