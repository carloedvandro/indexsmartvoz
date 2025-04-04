
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Webcam from "react-webcam";
import { supabase } from "@/integrations/supabase/client";
import { Camera, CameraOff } from "lucide-react";

interface FacialCaptureStepProps {
  onNext: (imageSrc: string) => void;
  videoConstraints: {
    width: number;
    height: number;
    facingMode: string;
  };
}

export const FacialCaptureStep = ({ onNext, videoConstraints }: FacialCaptureStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);
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

  const checkFace = async (imageData: ImageData) => {
    // Simplified face detection - checks for skin-tone pixels in the center
    const data = imageData.data;
    let skinTonePixels = 0;
    const totalPixels = data.length / 4;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Basic skin tone detection
      if (r > 60 && g > 40 && b > 20 && r > g && g > b) {
        skinTonePixels++;
      }
    }
    
    return (skinTonePixels / totalPixels) > 0.1;
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (webcamRef.current && !isProcessing && cameraActive) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          const img = new Image();
          img.src = imageSrc;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              const imageData = ctx.getImageData(
                img.width * 0.25, 
                img.height * 0.25, 
                img.width * 0.5, 
                img.height * 0.5
              );
              checkFace(imageData).then(detected => setFaceDetected(detected));
            }
          };
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isProcessing, cameraActive]);

  const handleFacialCapture = async () => {
    if (!faceDetected) {
      toast({
        title: "Rosto não detectado",
        description: "Por favor, posicione seu rosto dentro do círculo",
        variant: "destructive",
      });
      return;
    }

    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setIsProcessing(true);
        try {
          // Check if user is authenticated before proceeding
          const { data: sessionData } = await supabase.auth.getSession();
          if (!sessionData.session?.user) {
            toast({
              title: "Erro de Autenticação",
              description: "Usuário não está autenticado. Por favor, faça login novamente.",
              variant: "destructive",
            });
            return;
          }
          
          // Save the facial image to Supabase Storage
          const userId = sessionData.session.user.id;
          const blob = await fetch(imageSrc).then(res => res.blob());
          const file = new File([blob], `facial-${Date.now()}.jpg`, { type: 'image/jpeg' });
          const filePath = `${userId}/facial/${Date.now()}.jpg`;
          
          const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, file);
            
          if (uploadError) {
            console.error('Error uploading facial image:', uploadError);
            throw uploadError;
          }
          
          // Add a small delay for better UX
          await new Promise(resolve => setTimeout(resolve, 1000));
          onNext(imageSrc);
        } catch (error) {
          console.error('Error during facial capture:', error);
          toast({
            title: "Erro na Captura",
            description: "Ocorreu um erro ao processar a imagem. Por favor, tente novamente.",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
        }
      }
    }
  };

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
  };

  // Forçar o uso da câmera frontal
  const updatedVideoConstraints = {
    ...videoConstraints,
    facingMode: "user",
    width: { ideal: 1280 },
    height: { ideal: 720 }
  };

  return (
    <div className="relative h-[540px] bg-black overflow-hidden rounded-lg">
      <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 z-20 text-center">
        <p className="text-xl font-medium">Centralize seu rosto</p>
      </div>
      
      <div className="relative h-full">
        {cameraActive ? (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={updatedVideoConstraints}
            className="w-full h-full object-cover"
            mirrored={true}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <CameraOff className="h-16 w-16 text-white/50" />
            <p className="text-white/70 mt-4">Câmera desativada</p>
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          {/* Face oval guide */}
          <div className={`w-64 h-80 flex items-center justify-center relative`}>
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 256 320" 
              className="absolute inset-0"
            >
              {/* Outer oval */}
              <ellipse 
                cx="128" 
                cy="160" 
                rx="110" 
                ry="140" 
                fill="none" 
                stroke={faceDetected ? "#22c55e" : "rgba(34, 197, 94, 0.5)"}
                strokeWidth="2"
                className={faceDetected ? "animate-pulse" : ""}
              />
              
              {/* Inner face guides */}
              {faceDetected && (
                <>
                  {/* Eyes level line */}
                  <path 
                    d="M70,120 L186,120" 
                    stroke="#22c55e" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 2"
                  />
                  
                  {/* Nose line */}
                  <path 
                    d="M128,120 L128,200" 
                    stroke="#22c55e" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 2"
                  />
                  
                  {/* Mouth level line */}
                  <path 
                    d="M90,200 L166,200" 
                    stroke="#22c55e" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 2"
                  />
                  
                  {/* Left eye circle */}
                  <circle 
                    cx="96" 
                    cy="120" 
                    r="12" 
                    fill="none" 
                    stroke="#22c55e" 
                    strokeWidth="1.5"
                  />
                  
                  {/* Right eye circle */}
                  <circle 
                    cx="160" 
                    cy="120" 
                    r="12" 
                    fill="none" 
                    stroke="#22c55e" 
                    strokeWidth="1.5"
                  />
                  
                  {/* Nose circle */}
                  <circle 
                    cx="128" 
                    cy="160" 
                    r="8" 
                    fill="none" 
                    stroke="#22c55e" 
                    strokeWidth="1.5"
                  />
                </>
              )}
            </svg>
          </div>
        </div>
      </div>
      
      {/* Camera toggle button */}
      <button
        onClick={toggleCamera}
        className="absolute top-4 right-4 z-30 bg-white/10 p-2 rounded-full"
      >
        {cameraActive ? (
          <CameraOff className="h-6 w-6 text-white" />
        ) : (
          <Camera className="h-6 w-6 text-white" />
        )}
      </button>
      
      {/* Capture button */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <button 
          onClick={handleFacialCapture}
          disabled={isProcessing || !faceDetected || !cameraActive}
          className="focus:outline-none"
        >
          <div className={`w-16 h-16 rounded-full border-4 
              ${faceDetected && cameraActive ? 'border-green-500' : 'border-white/50'} 
              flex items-center justify-center relative
              ${isProcessing ? 'opacity-70' : 'opacity-100'}`}
          >
            <div className={`w-12 h-12 rounded-full 
              ${faceDetected && cameraActive ? 'bg-green-500' : 'bg-white/50'} 
              ${isProcessing ? 'animate-pulse' : ''}`}
            ></div>
            
            {faceDetected && cameraActive && (
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-white text-sm px-2 py-1 bg-green-500/80 rounded-full">
                  Pronto para capturar
                </span>
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};
