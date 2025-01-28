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
              {/* Guia de posicionamento */}
              <svg className="w-full h-full">
                {/* Círculo externo */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                {/* Linhas de guia verticais */}
                <line
                  x1="50%"
                  y1="10%"
                  x2="50%"
                  y2="90%"
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  opacity="0.5"
                />
                {/* Linhas de guia horizontais */}
                <line
                  x1="10%"
                  y1="50%"
                  x2="90%"
                  y2="50%"
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  opacity="0.5"
                />
                {/* Marcadores de canto */}
                <path
                  d="M 30% 35% L 30% 30% L 35% 30%"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M 70% 35% L 70% 30% L 65% 30%"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M 30% 65% L 30% 70% L 35% 70%"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M 70% 65% L 70% 70% L 65% 70%"
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
          <Button onClick={capture} className="gap-2 bg-purple-600 hover:bg-purple-700">
            <Camera className="h-4 w-4" />
            Capturar
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={retake} className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Repetir
            </Button>
            <Button onClick={confirm} className="bg-purple-600 hover:bg-purple-700">
              Confirmar
            </Button>
          </>
        )}
      </div>

      {!capturedImage && (
        <div className="space-y-2 text-center">
          <p className="text-sm text-gray-500">
            Posicione seu rosto dentro do círculo e mantenha:
          </p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Rosto centralizado e bem iluminado</li>
            <li>• Expressão neutra, olhos abertos</li>
            <li>• Sem óculos ou acessórios</li>
            <li>• Fundo claro e sem reflexos</li>
          </ul>
        </div>
      )}
    </div>
  );
}