
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Webcam from "react-webcam";
import { supabase } from "@/integrations/supabase/client";

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
      if (webcamRef.current && !isProcessing) {
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
  }, [isProcessing]);

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

  // Forçar o uso da câmera frontal
  const updatedVideoConstraints = {
    ...videoConstraints,
    facingMode: "user",
    width: { ideal: 1280 },
    height: { ideal: 720 }
  };

  return (
    <div className="relative h-[540px] bg-gray-100 overflow-hidden">
      <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 z-20 text-center">
        <p className="text-sm">Centralize seu rosto</p>
      </div>
      
      <div className="relative h-full">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={updatedVideoConstraints}
          className="w-full h-full object-cover"
          mirrored={true}
        />
        
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className={`w-64 h-80 border-2 rounded-full ${faceDetected ? 'border-green-500' : 'border-[#8425af]'}`}>
            <div className="relative w-full h-full">
              {/* Face outline */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 120" width="100%" height="100%" className="opacity-50">
                  <path d="M50,10 C70,10 85,30 85,55 C85,75 70,90 50,90 C30,90 15,75 15,55 C15,30 30,10 50,10 Z" 
                    fill="none" 
                    stroke={faceDetected ? "#22c55e" : "#8425af"} 
                    strokeWidth="1"
                  />
                  <circle cx="35" cy="45" r="5" fill="none" stroke={faceDetected ? "#22c55e" : "#8425af"} strokeWidth="1" />
                  <circle cx="65" cy="45" r="5" fill="none" stroke={faceDetected ? "#22c55e" : "#8425af"} strokeWidth="1" />
                  <path d="M40,65 C43,70 47,72 50,72 C53,72 57,70 60,65" 
                    fill="none" 
                    stroke={faceDetected ? "#22c55e" : "#8425af"} 
                    strokeWidth="1" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleFacialCapture}
        disabled={isProcessing || !faceDetected}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className={`w-16 h-16 rounded-full border-4 ${faceDetected ? 'border-green-500' : 'border-white'} flex items-center justify-center`}>
          <div className={`w-12 h-12 rounded-full ${faceDetected ? 'bg-green-500' : 'bg-white'}`}></div>
        </div>
      </button>
    </div>
  );
};
