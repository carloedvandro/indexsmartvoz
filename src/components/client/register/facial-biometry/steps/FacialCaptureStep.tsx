
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
        description: "Por favor, posicione seu rosto dentro do oval",
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
      {/* Header with title */}
      <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 z-20 text-center">
        <p className="text-sm font-medium">Centralize seu rosto</p>
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
        
        {/* Vivo style face oval - simpler design */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-64 h-80 flex items-center justify-center relative">
            {/* Face oval */}
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 256 320" 
              className="absolute inset-0"
            >
              {/* Oval outline - using red color similar to second image */}
              <ellipse 
                cx="128" 
                cy="160" 
                rx="110" 
                ry="140" 
                fill="none" 
                stroke="#ff3366" 
                strokeWidth="2"
              />
              
              {/* Simplified face guides - subtle eye, nose outlines */}
              <g opacity="0.6" stroke="#ffffff">
                {/* Eyes */}
                <ellipse cx="90" cy="120" rx="18" ry="8" fill="none" strokeWidth="1" />
                <ellipse cx="166" cy="120" rx="18" ry="8" fill="none" strokeWidth="1" />
                
                {/* Nose */}
                <path d="M128,120 L128,170 M118,170 L138,170" fill="none" strokeWidth="1" />
                
                {/* Mouth outline */}
                <path d="M108,190 C118,200 138,200 148,190" fill="none" strokeWidth="1" />
              </g>
              
              {/* Corner guide dots */}
              <circle cx="10" cy="10" r="3" fill="#000" />
              <circle cx="246" cy="10" r="3" fill="#000" />
              <circle cx="10" cy="310" r="3" fill="#000" />
              <circle cx="246" cy="310" r="3" fill="#000" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Centralize seu rosto instruction bar */}
      <div className="absolute top-[35%] left-0 right-0 z-20 flex justify-center">
        <div className="bg-black/70 px-6 py-1 rounded text-white text-sm">
          Centralize seu rosto
        </div>
      </div>
      
      {/* Camera toggle button */}
      <button
        onClick={toggleCamera}
        className="absolute top-2 right-2 z-30 bg-black/20 p-2 rounded-full"
      >
        {cameraActive ? (
          <CameraOff className="h-5 w-5 text-white" />
        ) : (
          <Camera className="h-5 w-5 text-white" />
        )}
      </button>
      
      {/* Capture button - simpler style */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
        <button 
          onClick={handleFacialCapture}
          disabled={isProcessing || !faceDetected || !cameraActive}
          className="focus:outline-none"
        >
          <div className={`w-16 h-16 rounded-full 
              ${faceDetected && cameraActive ? 'bg-green-500' : 'bg-white/30'} 
              flex items-center justify-center relative
              ${isProcessing ? 'opacity-70' : 'opacity-100'}`}
          >
            <div className={`w-12 h-12 rounded-full 
              ${faceDetected && cameraActive ? 'bg-green-600' : 'bg-white/50'} 
              ${isProcessing ? 'animate-pulse' : ''}`}
            ></div>
          </div>
        </button>
      </div>
    </div>
  );
};
