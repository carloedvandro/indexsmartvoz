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

  const { faceDetected, facePosition, faceProximity, lightingQuality } = useFaceDetection(webcamRef, true, true);

  const { 
    isProcessing, 
    cameraActive, 
    captureProgress,
    isCapturing,
    isStable,
    toggleCamera 
  } = useFacialCapture({
    webcamRef,
    faceDetected,
    faceProximity,
    facePosition,
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
        brightness: { ideal: 1.2 }, // Aumentado para melhor iluminação
        contrast: { ideal: 1.1 }, // Ligeiramente aumentado
        saturation: { ideal: 1.0 }
      }
    ]
  };

  const getLightingMessage = () => {
    switch (lightingQuality) {
      case "too-dark":
        return "💡 Muito escuro - Procure mais luz";
      case "too-bright":
        return "☀️ Muito claro - Diminua a luz";
      case "poor":
        return "⚠️ Iluminação inadequada";
      case "good":
        return "✅ Iluminação ideal";
      default:
        return "";
    }
  };

  return (
    <div className="relative h-[420px] mx-4 rounded-lg overflow-hidden">
      {/* Removido o cabeçalho com o texto e ícone da câmera */}
      {isCapturing && (
        <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 z-20 text-center">
          <p className="text-xs text-yellow-300">
            Capturando... {Math.round(captureProgress)}% - Mantenha a posição
          </p>
        </div>
      )}
      
      <CameraView 
        webcamRef={webcamRef}
        cameraActive={cameraActive}
        videoConstraints={updatedVideoConstraints}
      />
      
      <FaceOvalGuide 
        faceDetected={faceDetected} 
        captureProgress={captureProgress}
        faceProximity={faceProximity}
        isCapturing={isCapturing}
      />
      
      <CameraToggle 
        cameraActive={cameraActive}
        onToggle={toggleCamera}
      />
      
      <div className="absolute bottom-6 w-full flex justify-center items-center">
        {isProcessing && (
          <div className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm animate-pulse">
            Processando imagem com segurança...
          </div>
        )}
        
        {!isProcessing && isCapturing && (
          <div className="bg-red-600 bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
            🔴 Capturando... {Math.round(captureProgress)}%
          </div>
        )}
        
        {!isProcessing && !isCapturing && faceDetected && faceProximity === "ideal" && lightingQuality === "good" && isStable && (
          <div className="bg-green-600 bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
            ✅ Pronto para capturar
          </div>
        )}
        
        {!isProcessing && !isCapturing && faceDetected && faceProximity === "ideal" && lightingQuality === "good" && !isStable && (
          <div className="bg-yellow-600 bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
            ⏳ Estabilizando posição...
          </div>
        )}
        
        {!isProcessing && !isCapturing && lightingQuality !== "good" && (
          <div className="bg-orange-600 bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
            {getLightingMessage()}
          </div>
        )}
        
        {!isProcessing && !isCapturing && !faceDetected && lightingQuality === "good" && (
          <div className="bg-red-600 bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
            ❌ Rosto não detectado
          </div>
        )}
        
        {!isProcessing && !isCapturing && faceDetected && faceProximity !== "ideal" && lightingQuality === "good" && (
          <div className="bg-orange-600 bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
            ⚠️ Ajuste a posição no oval
          </div>
        )}
      </div>
    </div>
  );
};
