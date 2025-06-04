
import { useRef } from "react";
import Webcam from "react-webcam";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FaceOvalGuide } from "./facial-capture/FaceOvalGuide";
import { CameraToggle } from "./facial-capture/CameraToggle";
import { CameraView } from "./facial-capture/CameraView";
import { useFaceDetection } from "./facial-capture/useFaceDetection";
import { useFacialCapture } from "./facial-capture/useFacialCapture";

interface FacialCaptureStepProps {
  onNext: (imageSrc: string) => void;
  videoConstraints: {
    width: number;
    height: number;
    facingMode: string;
  };
}

export const FacialCaptureStep = ({ onNext, videoConstraints }: FacialCaptureStepProps) => {
  const webcamRef = useRef<Webcam>(null);
  const { toast } = useToast();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        console.error("No active session found in FacialCaptureStep");
        toast({
          title: "Erro de Autenticação",
          description: "Sessão não encontrada. Por favor, faça login novamente.",
          variant: "destructive",
        });
      } else {
        console.log("User session found:", data.session.user.id);
      }
    };
    
    checkSession();
  }, [toast]);

  const { faceDetected, facePosition, faceProximity } = useFaceDetection(webcamRef, false, true);

  const { 
    isProcessing, 
    cameraActive, 
    captureProgress,
    isCapturing,
    toggleCamera 
  } = useFacialCapture({
    webcamRef,
    faceDetected,
    faceProximity,
    onComplete: onNext
  });

  // Enhanced video constraints for better image quality
  const updatedVideoConstraints = {
    ...videoConstraints,
    facingMode: "user",
    width: { ideal: 1280 },
    height: { ideal: 720 },
    advanced: [
      { 
        exposureMode: "continuous",
        whiteBalanceMode: "continuous",
        focusMode: "continuous",
        brightness: { ideal: 1.0 },
        contrast: { ideal: 1.0 }
      }
    ]
  };

  return (
    <div className="relative h-[540px] bg-black overflow-hidden rounded-lg">
      {/* Header with title */}
      <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 z-20 text-center">
        <p className="text-sm font-medium">
          {isCapturing ? "🔴 CAPTURANDO - NÃO MOVA O ROSTO!" : "Centralize seu rosto no oval"}
        </p>
      </div>
      
      <CameraView 
        webcamRef={webcamRef}
        cameraActive={cameraActive}
        videoConstraints={updatedVideoConstraints}
      />
      
      {/* Face oval guide with progress and capture state */}
      <FaceOvalGuide 
        faceDetected={faceDetected} 
        captureProgress={captureProgress}
        faceProximity={faceProximity}
        isCapturing={isCapturing}
      />
      
      {/* Camera toggle button */}
      <CameraToggle 
        cameraActive={cameraActive}
        onToggle={toggleCamera}
      />
      
      {/* Enhanced status indicator with stricter warnings */}
      <div className="absolute bottom-6 w-full flex justify-center items-center">
        {isProcessing && (
          <div className="bg-black bg-opacity-70 text-white px-3 py-2 rounded-full text-sm animate-pulse">
            Processando imagem validada...
          </div>
        )}
        
        {!isProcessing && isCapturing && (
          <div className="bg-red-600 bg-opacity-90 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse border-2 border-red-400">
            🔴 CAPTURANDO ({Math.round(captureProgress)}%) - NÃO SAIA DO OVAL!
          </div>
        )}
        
        {!isProcessing && !isCapturing && faceDetected && faceProximity === "ideal" && (
          <div className="bg-green-600 bg-opacity-70 text-white px-3 py-2 rounded-full text-sm">
            ✅ Posição perfeita - Aguarde iniciar...
          </div>
        )}
        
        {!isProcessing && !isCapturing && faceDetected && faceProximity !== "ideal" && (
          <div className="bg-yellow-600 bg-opacity-70 text-white px-3 py-2 rounded-full text-sm">
            ⚠️ Ajuste a posição do rosto
          </div>
        )}
        
        {!isProcessing && !isCapturing && !faceDetected && (
          <div className="bg-red-600 bg-opacity-70 text-white px-3 py-2 rounded-full text-sm">
            ❌ Rosto não detectado
          </div>
        )}
      </div>
    </div>
  );
};
