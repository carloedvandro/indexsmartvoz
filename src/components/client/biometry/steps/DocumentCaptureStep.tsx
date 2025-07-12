import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

interface DocumentCaptureStepProps {
  onCapture: (imageSrc: string) => void;
  onBack: () => void;
}

export const DocumentCaptureStep = ({ onCapture, onBack }: DocumentCaptureStepProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    // Verificar permissão da câmera (preferir traseira)
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } } })
      .then(() => setHasPermission(true))
      .catch(() => {
        // Fallback para câmera frontal se traseira não disponível
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(() => setHasPermission(true))
          .catch(() => setHasPermission(false));
      });
  }, []);

  const capture = () => {
    if (webcamRef.current) {
      setIsCapturing(true);
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setTimeout(() => {
          onCapture(imageSrc);
        }, 1000);
      }
    }
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: { ideal: 'environment' } // Prefer câmera traseira
  };

  if (hasPermission === false) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#5f0889] to-[#9b30ff] flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <Camera className="w-16 h-16 mx-auto mb-4 text-white/70" />
          <h2 className="text-xl font-bold mb-4 text-white">Acesso à Câmera Necessário</h2>
          <p className="text-white/90 mb-6">
            Para continuar com a verificação do documento, precisamos acessar sua câmera.
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="w-full bg-white text-[#5f0889] hover:bg-white/90"
          >
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5f0889] to-[#9b30ff] flex flex-col">
      
      {/* Área da câmera ocupando toda a tela */}
      <div className="flex-1 relative">
        {hasPermission && (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          />
        )}
        
        {/* Moldura retangular para documento - igual à imagem de referência */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-80 h-52 border-4 border-white rounded-2xl relative"
            style={{
              boxShadow: `
                0 0 30px rgba(255, 255, 255, 0.8),
                inset 0 0 30px rgba(255, 255, 255, 0.1)
              `
            }}
          >
            {/* Cantos destacados mais grossos */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl" />
            <div className="absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl" />
          </div>
        </div>

        {/* Textos de instrução - posicionados como na imagem de referência */}
        <div className="absolute bottom-32 left-0 right-0 text-center px-6">
          <h2 className="text-white text-lg font-semibold mb-2">
            Posicione o documento na área visível
          </h2>
          <p className="text-white/80 text-sm">
            {isCapturing ? 'Processando...' : 'Aguardando documento...'}
          </p>
        </div>

        {/* Loading overlay durante captura */}
        {isCapturing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-white">Escaneando documento...</p>
            </div>
          </div>
        )}
      </div>

      {/* Botão fixado na parte inferior - igual à imagem de referência */}
      <div className="p-6">
        <Button
          onClick={capture}
          disabled={isCapturing || !hasPermission}
          className="w-full py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 font-bold text-lg rounded-lg"
        >
          {isCapturing ? 'Escaneando...' : 'Escanear documento'}
        </Button>
      </div>
    </div>
  );
};