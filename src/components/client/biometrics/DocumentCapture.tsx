import { useRef, useState, useCallback } from "react";
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

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => {
    setCapturedImage(null);
  };

  const confirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
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
            <div className="absolute inset-0 z-10 pointer-events-none">
              <svg className="w-full h-full">
                <rect
                  x="5%"
                  y="5%"
                  width="90%"
                  height="90%"
                  fill="none"
                  stroke="white"
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
        {!capturedImage ? (
          <Button 
            onClick={capture} 
            className="gap-2 bg-purple-600 hover:bg-purple-700"
          >
            <Camera className="h-4 w-4" />
            Capturar
          </Button>
        ) : (
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
        {side === "front" 
          ? "Posicione a frente do documento dentro do retângulo"
          : "Agora posicione o verso do documento"
        }
      </p>
    </div>
  );
}