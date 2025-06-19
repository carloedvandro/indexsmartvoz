
import { useEffect, useRef, useState } from "react";
import { useZxing } from "react-zxing";

interface BarcodeScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  const {
    ref: videoRef,
  } = useZxing({
    onDecodeResult(result) {
      const barcode = result.getText();
      console.log("Código detectado:", barcode);
      
      // Aceitar códigos de barras com diferentes formatos
      if (barcode.length >= 10 && /^\d+$/.test(barcode)) {
        // Toca o som de beep com volume máximo
        const beepSound = audioRef.current;
        if (beepSound) {
          beepSound.volume = 1.0;
          beepSound.currentTime = 0;
          const playPromise = beepSound.play();
          
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error("Erro ao tocar o som:", error);
            });
          }
        }
        
        setHasScanned(true);
        setIsScanning(false);
        console.log("Código de barras capturado:", barcode);
        onResult(barcode);
        
        // Pequeno delay antes de fechar
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    },
    timeBetweenDecodingAttempts: 100,
    constraints: {
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: "environment"
      }
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Pre-carrega o som do beep
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <audio ref={audioRef} src="/beep.mp3" preload="auto" />
      <div ref={overlayRef} className="relative p-4">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative">
          <video
            ref={videoRef}
            className="w-[354px] h-[200px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 border-2 border-[#8425af] rounded-lg">
            <div className="absolute top-0 left-0 right-0 bg-white/80 text-center py-2 rounded-t-lg font-medium text-sm">
              {isScanning ? "Posicione o código de barras na área" : "Código detectado!"}
            </div>
          </div>
          {isScanning && (
            <div className="absolute left-0 right-0 h-1 bg-red-600 top-1/2 transform -translate-y-1/2 animate-pulse" 
                 style={{ boxShadow: '0 0 8px rgba(255, 0, 0, 0.8)' }} />
          )}
          {hasScanned && (
            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
              <div className="bg-green-500 text-white px-4 py-2 rounded font-medium">
                ✓ Código Capturado
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-center text-white text-sm">
          <p>Mantenha o código de barras bem iluminado</p>
          <p>e dentro da área de escaneamento</p>
        </div>
      </div>
    </div>
  );
}
