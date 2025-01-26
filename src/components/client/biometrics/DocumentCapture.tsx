import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCcw, Timer } from "lucide-react";

interface DocumentCaptureProps {
  onCapture: (imageData: string) => void;
  side: "front" | "back";
}

export function DocumentCapture({ onCapture, side }: DocumentCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAligned, setIsAligned] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const alignmentCheckInterval = useRef<number>();
  const countdownInterval = useRef<number>();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      onCapture(imageSrc);
      setCountdown(null);
      if (alignmentCheckInterval.current) {
        window.clearInterval(alignmentCheckInterval.current);
      }
      if (countdownInterval.current) {
        window.clearInterval(countdownInterval.current);
      }
    }
  }, [webcamRef, onCapture]);

  const retake = () => {
    setCapturedImage(null);
    setIsAligned(false);
    setCountdown(null);
    if (countdownInterval.current) {
      window.clearInterval(countdownInterval.current);
    }
    startAlignmentDetection();
  };

  const startCountdown = useCallback(() => {
    console.log("Starting countdown");
    setCountdown(5);
    
    if (countdownInterval.current) {
      window.clearInterval(countdownInterval.current);
    }
    
    countdownInterval.current = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          if (countdownInterval.current) {
            window.clearInterval(countdownInterval.current);
          }
          capture();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, [capture]);

  const checkAlignment = useCallback(() => {
    const video = webcamRef.current?.video;
    if (!video) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const sampleSize = 100;
    
    const imageData = context.getImageData(
      centerX - sampleSize / 2,
      centerY - sampleSize / 2,
      sampleSize,
      sampleSize
    );

    let totalBrightness = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      totalBrightness += (r + g + b) / 3;
    }
    const averageBrightness = totalBrightness / (sampleSize * sampleSize);

    const isNowAligned = averageBrightness > 100 && averageBrightness < 200;
    
    if (isNowAligned && !isAligned) {
      console.log("Document aligned, starting countdown");
      setIsAligned(true);
      startCountdown();
    } else if (!isNowAligned && isAligned) {
      console.log("Document misaligned, resetting");
      setIsAligned(false);
      setCountdown(null);
      if (countdownInterval.current) {
        window.clearInterval(countdownInterval.current);
      }
    }
  }, [isAligned, startCountdown]);

  const startAlignmentDetection = useCallback(() => {
    if (alignmentCheckInterval.current) {
      window.clearInterval(alignmentCheckInterval.current);
    }
    alignmentCheckInterval.current = window.setInterval(checkAlignment, 200);
  }, [checkAlignment]);

  useEffect(() => {
    startAlignmentDetection();
    return () => {
      if (alignmentCheckInterval.current) {
        window.clearInterval(alignmentCheckInterval.current);
      }
      if (countdownInterval.current) {
        window.clearInterval(countdownInterval.current);
      }
    };
  }, [startAlignmentDetection]);

  const videoConstraints = {
    width: 720,
    height: 480,
    facingMode: { exact: "environment" }
  };

  return (
    <div className="space-y-4">
      <div className="relative w-[300px] h-[200px] mx-auto overflow-hidden rounded-lg">
        {!capturedImage ? (
          <>
            <div className="absolute inset-0 z-10 pointer-events-none">
              <svg className="w-full h-full">
                <rect
                  x="5%"
                  y="5%"
                  width="90%"
                  height="90%"
                  fill="none"
                  stroke={isAligned ? "green" : "white"}
                  strokeWidth="2"
                  rx="4"
                />
              </svg>
              {countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 w-24 h-24 rounded-full flex items-center justify-center">
                    <Timer className="w-6 h-6 text-white absolute" />
                    <span className="text-6xl font-bold text-white">
                      {countdown}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-full object-cover"
            />
          </>
        ) : (
          <img 
            src={capturedImage} 
            alt="captured" 
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </div>

      <div className="flex justify-center gap-2">
        {capturedImage && (
          <Button 
            variant="outline" 
            onClick={retake} 
            className="gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Repetir
          </Button>
        )}
      </div>

      <p className="text-center text-sm text-gray-500">
        {!capturedImage ? (
          isAligned ? (
            countdown !== null ? 
              `Mantenha o documento parado. Capturando em ${countdown} segundos...` :
              "Mantenha o documento parado..."
          ) : (
            side === "front" 
              ? "Centralize a frente do documento no retângulo"
              : "Agora centralize o verso do documento"
          )
        ) : (
          "Clique em repetir caso a imagem não esteja legível"
        )}
      </p>
    </div>
  );
}