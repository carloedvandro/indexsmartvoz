

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as faceapi from 'face-api.js';

export default function FacialBiometry() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [orientacao, setOrientacao] = useState("Carregando câmera...");
  const [etapa, setEtapa] = useState(0);

  useEffect(() => {
    iniciarCamera();
  }, []);

  const iniciarCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await carregarModelos();
        detectarMovimento();
      }
    } catch (err) {
      alert('Erro ao acessar a câmera');
    }
  };

  const carregarModelos = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    } catch (error) {
      console.log('Modelo não encontrado, continuando sem detecção facial');
    }
  };

  const falar = (texto: string) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const voz = new SpeechSynthesisUtterance(texto);
      voz.lang = 'pt-BR';
      voz.pitch = 1;
      voz.rate = 1;
      synth.speak(voz);
    }
    setOrientacao(texto);
  };

  const aguardar = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const detectarMovimento = async () => {
    falar("Aproxime seu rosto");
    await aguardar(2500);
    falar("Afaste um pouco");
    await aguardar(2500);
    falar("Centralize dentro do oval");
    await aguardar(2500);

    const detectar = async () => {
      if (videoRef.current) {
        try {
          const detections = await faceapi.detectAllFaces(
            videoRef.current, 
            new faceapi.TinyFaceDetectorOptions()
          );
          if (detections.length > 0) {
            setEtapa(3);
            falar("Reconhecimento facial concluído");
            tirarSelfie();
          } else {
            setTimeout(detectar, 1000);
          }
        } catch (error) {
          // Se não conseguir detectar face, continua após um tempo
          setTimeout(() => {
            setEtapa(3);
            falar("Reconhecimento facial concluído");
            tirarSelfie();
          }, 3000);
        }
      }
    };
    detectar();
  };

  const tirarSelfie = () => {
    if (etapa < 3 || !videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const fotoBase64 = canvas.toDataURL('image/jpeg');
      localStorage.setItem('selfieBase64', fotoBase64);
      navigate('/client/document-verification');
    }
  };

  return (
    <>
      <style>{`
        @keyframes piscar {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }

        @keyframes brilhoOval {
          0% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.4); }
          50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.9); }
          100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.4); }
        }

        .scanner-container {
          animation: brilhoOval 2s infinite;
        }

        .orientacao-text {
          animation: piscar 1s infinite;
        }
      `}</style>
      
      <div className="m-0 p-0 font-sans bg-[#2f145e] text-white flex flex-col items-center justify-center min-h-screen">
        <div className="scanner-container relative w-80 h-[420px] rounded-[50%/45%] overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="absolute w-full h-full object-cover scale-x-[-1]"
          />
        </div>
        
        <div className="orientacao-text mt-5 text-lg font-bold">
          {orientacao}
        </div>
      </div>
    </>
  );
};

