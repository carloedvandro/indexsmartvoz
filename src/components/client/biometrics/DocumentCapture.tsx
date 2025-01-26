import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCcw } from "lucide-react";

interface DocumentCaptureProps {
  onCapture: (imageData: string) => void;
  side: "front" | "back";
}

export function DocumentCapture({ onCapture, side }: DocumentCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAligned, setIsAligned] = useState(false);
  const alignmentCheckInterval = useRef<number>();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      // Clear the interval when image is captured
      if (alignmentCheckInterval.current) {
        window.clearInterval(alignmentCheckInterval.current);
      }
    }
  }, [webcamRef]);

  const retake = () => {
    setCapturedImage(null);
    setIsAligned(false);
    // Restart alignment detection
    startAlignmentDetection();
  };

  const confirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  const checkAlignment = useCallback(() => {
    const video = webcamRef.current?.video;
    if (!video) return;

    // Create a canvas to analyze the video frame
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    // Get the image data from the center of the frame
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const sampleSize = 100; // Size of the area to check
    
    const imageData = context.getImageData(
      centerX - sampleSize / 2,
      centerY - sampleSize / 2,
      sampleSize,
      sampleSize
    );

    // Calculate average brightness in the center area
    let totalBrightness = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      totalBrightness += (r + g + b) / 3;
    }
    const averageBrightness = totalBrightness / (sampleSize * sampleSize);

    // If the center area has good contrast (indicating a document)
    const isNowAligned = averageBrightness > 100 && averageBrightness < 200;
    
    if (isNowAligned && !isAligned) {
      setIsAligned(true);
      // Wait a short moment before capturing to ensure stability
      setTimeout(capture, 500);
    } else if (!isNowAligned && isAligned) {
      setIsAligned(false);
    }
  }, [capture, isAligned]);

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
          <>
            <Button 
              variant="outline" 
              onClick={retake} 
              className="gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Repetir
            </Button>
            <Button 
              onClick={confirm} 
              className="bg-purple-600 hover:bg-purple-700"
            >
              Confirmar
            </Button>
          </>
        )}
      </div>

      <p className="text-center text-sm text-gray-500">
        {!capturedImage ? (
          side === "front" 
            ? "Centralize a frente do documento no retângulo"
            : "Agora centralize o verso do documento"
        ) : (
          "Verifique se a imagem está legível antes de confirmar"
        )}
      </p>
    </div>
  );
}