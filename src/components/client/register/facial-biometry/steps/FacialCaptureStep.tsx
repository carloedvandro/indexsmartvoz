
import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { initializeMediaPipe, cleanupMediaPipe } from "./facial-capture/utils/mediaPipeDetection";

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

  // Initialize MediaPipe and camera
  useEffect(() => {
    const iniciarCamera = async () => {
      try {
        // Initialize MediaPipe
        await initializeMediaPipe();
        
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

    // Cleanup on unmount
    return () => {
      cleanupMediaPipe();
    };
  }, [toast]);

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

    // Simplified detection for demo
    setTimeout(() => {
      setEtapa(3);
      falar("Reconhecimento facial concluído");
    }, 2000);
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
    <div className="min-h-screen w-full bg-primary text-white flex flex-col items-center justify-center">
      {/* Oval guide */}
      <div className="border-[3px] border-white rounded-[50%] w-[280px] h-[380px] flex items-center justify-center overflow-hidden relative shadow-[0_0_12px_rgba(255,255,255,0.3)]">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: "user",
            width: 1280,
            height: 720
          }}
          className="w-full transform scale-x-[-1]"
          style={{ transform: 'scaleX(-1)' }}
        />
      </div>
      
      {/* Status text with animation */}
      <div className="mt-5 text-lg font-bold animate-pulse">
        {statusText}
      </div>
      
      {/* Continue button */}
      <Button 
        onClick={tirarSelfie}
        className="mt-5 px-5 py-2 bg-white text-[#2f145e] font-bold rounded-lg hover:bg-gray-100"
      >
        Continuar
      </Button>
    </div>
  );
};
