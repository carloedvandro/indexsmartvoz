import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { CaptureGuide } from "./capture/CaptureGuide";
import { CaptureStatus } from "./capture/CaptureStatus";
import { checkDocumentAlignment } from "./capture/DocumentAlignment";

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
      clearIntervals();
    }
  }, [onCapture]);

  const clearIntervals = () => {
    if (alignmentCheckInterval.current) {
      window.clearInterval(alignmentCheckInterval.current);
    }
    if (countdownInterval.current) {
      window.clearInterval(countdownInterval.current);
    }
  };

  const startCountdown = useCallback(() => {
    setCountdown(3);
    
    if (countdownInterval.current) {
      window.clearInterval(countdownInterval.current);
    }
    
    countdownInterval.current = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearIntervals();
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

    const { isAligned: newIsAligned } = checkDocumentAlignment(video);
    
    if (newIsAligned && !isAligned) {
      setIsAligned(true);
      startCountdown();
    } else if (!newIsAligned && isAligned) {
      setIsAligned(false);
      setCountdown(null);
      if (countdownInterval.current) {
        window.clearInterval(countdownInterval.current);
      }
    }
  }, [isAligned, startCountdown]);

  useEffect(() => {
    alignmentCheckInterval.current = window.setInterval(checkAlignment, 200);
    return clearIntervals;
  }, [checkAlignment]);

  const retake = () => {
    setCapturedImage(null);
    setIsAligned(false);
    setCountdown(null);
    clearIntervals();
    alignmentCheckInterval.current = window.setInterval(checkAlignment, 200);
  };

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
            <CaptureGuide 
              isAligned={isAligned} 
              countdown={countdown}
              side={side}
            />
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

      <CaptureStatus 
        isAligned={isAligned}
        countdown={countdown}
        side={side}
        isCaptured={!!capturedImage}
      />
    </div>
  );
}