import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCcw } from "lucide-react";

interface FacialCaptureProps {
  onCapture: (imageData: string) => void;
}

export function FacialCapture({ onCapture }: FacialCaptureProps) {
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
                  stroke="white"
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
          </>
        ) : (
          <img src={capturedImage} alt="captured" className="rounded-lg" />
        )}
      </div>

      <div className="flex justify-center gap-2">
        {!capturedImage ? (
          <Button onClick={capture} className="gap-2">
            <Camera className="h-4 w-4" />
            Capturar
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={retake} className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Repetir
            </Button>
            <Button onClick={confirm}>Confirmar</Button>
          </>
        )}
      </div>

      {!capturedImage && (
        <p className="text-center text-sm text-gray-500">
          Posicione seu rosto dentro do círculo e clique em Capturar
        </p>
      )}
    </div>
  );
}