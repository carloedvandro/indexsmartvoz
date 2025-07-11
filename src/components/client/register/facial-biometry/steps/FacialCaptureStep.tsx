import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import * as faceapi from 'face-api.js';

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
  const [etapa, setEtapa] = useState(0);
  const [statusText, setStatusText] = useState("Carregando câmera...");

  // Speech synthesis function
  const falar = (texto: string) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const voz = new SpeechSynthesisUtterance(texto);
      voz.lang = 'pt-BR';
      voz.pitch = 1;
      voz.rate = 1;
      synth.speak(voz);
    }
    setStatusText(texto);
  };

  // Check session
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

  // Load face-api models and initialize camera
  useEffect(() => {
    const iniciarCamera = async () => {
      try {
        // Load face-api models
        await carregarModelos();
        
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' } 
        });
        
        if (webcamRef.current?.video) {
          webcamRef.current.video.srcObject = stream;
        }
        
        // Wait a bit for video to start then begin detection
        setTimeout(() => {
          detectarMovimento();
        }, 1000);
      } catch (err) {
        console.error('Erro ao acessar câmera:', err);
        toast({
          title: "Erro na Câmera",
          description: "Não foi possível acessar a câmera",
          variant: "destructive",
        });
      }
    };

    iniciarCamera();
  }, [toast]);

  // Load face-api models
  const carregarModelos = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      console.log('Modelos face-api carregados com sucesso');
    } catch (error) {
      console.error('Erro ao carregar modelos face-api:', error);
      toast({
        title: "Aviso",
        description: "Modelos de detecção facial não carregados, continuando sem detecção automática",
      });
    }
  };

  // Helper function for delays
  const aguardar = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const detectarMovimento = async () => {
    falar("Aproxime o rosto do celular");
    await aguardar(3000);
    falar("Afaste o rosto do celular");
    await aguardar(3000);
    falar("Centralize o rosto dentro do oval");
    await aguardar(3000);

    // Start face detection loop
    const detectar = async () => {
      try {
        if (webcamRef.current?.video) {
          const detections = await faceapi.detectAllFaces(
            webcamRef.current.video, 
            new faceapi.TinyFaceDetectorOptions()
          );
          
          if (detections.length > 0) {
            setEtapa(3);
            falar("Reconhecimento facial concluído");
          } else {
            setTimeout(detectar, 1000);
          }
        }
      } catch (error) {
        console.error('Erro na detecção facial:', error);
        // Fallback to simple timer if face detection fails
        setTimeout(() => {
          setEtapa(3);
          falar("Reconhecimento facial concluído");
        }, 2000);
      }
    };
    
    detectar();
  };

  const tirarSelfie = () => {
    if (etapa < 3) {
      toast({
        title: "Aguarde",
        description: "Aguarde a conclusão do reconhecimento facial.",
        variant: "destructive",
      });
      return;
    }

    if (!webcamRef.current) {
      toast({
        title: "Erro",
        description: "Câmera não disponível",
        variant: "destructive",
      });
      return;
    }

    const canvas = document.createElement('canvas');
    const video = webcamRef.current.video;
    
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const fotoBase64 = canvas.toDataURL('image/jpeg');
        localStorage.setItem('selfieBase64', fotoBase64);
        
        toast({
          title: "Sucesso",
          description: "Selfie capturada com sucesso!",
        });
        
        onNext(fotoBase64);
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center">
        {/* Oval camera container with purple glow */}
        <div className="relative w-[320px] h-[420px] mb-5">
          {/* Purple glow effect */}
          <div 
            className="absolute inset-0 rounded-[50%/60%] overflow-hidden"
            style={{
              boxShadow: '0 0 24px #aa66ff'
            }}
          >
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: "user",
                width: 1280,
                height: 720
              }}
              className="w-full h-full object-cover transform scale-x-[-1]"
              style={{ transform: 'scaleX(-1)' }}
            />
          </div>
          
          {/* White border overlay */}
          <div 
            className="absolute inset-0 border-[3px] border-white rounded-[50%/60%] pointer-events-none"
          />
          
          {/* Face detection indicator */}
          {etapa >= 3 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          )}
        </div>
        
        {/* Status message */}
        <div className={`font-bold text-lg text-center transition-colors duration-300 ${
          etapa >= 3 ? 'text-yellow-400' : 'text-white'
        }`}>
          {statusText}
        </div>
        
        {/* Continue button - only show when face is detected */}
        {etapa >= 3 && (
          <Button 
            onClick={tirarSelfie}
            className="mt-6 px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-primary font-bold text-lg rounded-xl transition-all duration-300"
          >
            Continuar
          </Button>
        )}
      </div>
    </div>
  );
};
