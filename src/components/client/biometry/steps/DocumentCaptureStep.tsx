import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { FileText, Camera } from 'lucide-react';

interface DocumentCaptureStepProps {
  onCapture: (imageSrc: string) => void;
  onBack: () => void;
}

export const DocumentCaptureStep = ({ onCapture, onBack }: DocumentCaptureStepProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    // Verificar permissão da câmera
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
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <Camera className="w-16 h-16 mx-auto mb-4 text-white/70" />
          <h2 className="text-xl font-bold mb-4">Acesso à Câmera Necessário</h2>
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
    <div className="min-h-screen flex flex-col">
      {/* Área da câmera */}
      <div className="flex-1 relative overflow-hidden">
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
        
        {/* Moldura retangular brilhante para documento */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-80 h-52 border-4 border-white/40 rounded-lg relative"
            style={{
              boxShadow: `
                0 0 25px rgba(255, 255, 255, 0.6),
                inset 0 0 25px rgba(255, 255, 255, 0.1)
              `
            }}
          >
            {/* Cantos destacados */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg" />
            
            {/* Efeito de brilho animado */}
            <div 
              className="absolute inset-0 rounded-lg"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
                animation: 'shimmer 2s infinite'
              }}
            />
            
            {/* Ícone de documento no centro */}
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className="w-12 h-12 text-white/60" />
            </div>
          </div>
        </div>

        {/* Instruções */}
        <div className="absolute top-20 left-0 right-0 px-6">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-center">
            <h1 className="text-xl font-bold mb-2">Captura do Documento</h1>
            <p className="text-sm text-white/90">
              Posicione o documento na área indicada, com foto e dados legíveis
            </p>
            <p className="text-xs text-white/70 mt-2">
              • Mantenha o documento reto e bem iluminado<br />
              • Certifique-se de que todos os dados estão visíveis<br />
              • RG ou CNH são aceitos
            </p>
          </div>
        </div>

        {/* Loading overlay durante captura */}
        {isCapturing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-white">Analisando documento...</p>
            </div>
          </div>
        )}
      </div>

      {/* Botões fixados na parte inferior */}
      <div className="p-6 bg-gradient-to-t from-black/50 to-transparent">
        <div className="space-y-3">
          <Button
            onClick={capture}
            disabled={isCapturing || !hasPermission}
            className="w-full py-4 bg-white text-[#5f0889] hover:bg-white/90 font-bold text-lg rounded-full"
          >
            {isCapturing ? 'Escaneando...' : 'Escanear Documento'}
          </Button>
          
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full py-3 bg-transparent border-white/30 text-white hover:bg-white/10 rounded-full"
          >
            Voltar
          </Button>
        </div>
      </div>

      {/* CSS para animação shimmer */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
      `}</style>
    </div>
  );
};