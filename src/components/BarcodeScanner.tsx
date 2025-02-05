
import { useEffect, useRef, useState } from "react";
import { useZxing } from "react-zxing";

interface BarcodeScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [lastScanPosition, setLastScanPosition] = useState<number | null>(null);
  const [hasScanned, setHasScanned] = useState(false);

  const {
    ref: videoRef,
  } = useZxing({
    onDecodeResult(result) {
      const barcode = result.getText();
      // Só aceita códigos com exatamente 20 dígitos
      if (barcode.length === 20 && /^\d+$/.test(barcode)) {
        // Toca o som de beep com volume máximo
        const beepSound = audioRef.current;
        if (beepSound) {
          beepSound.volume = 1.0; // Volume máximo
          beepSound.currentTime = 0; // Garante que o som começa do início
          const playPromise = beepSound.play();
          
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error("Erro ao tocar o som:", error);
            });
          }
        }
        
        // Captura a posição atual da linha de scan
        const scanLine = document.querySelector('.scan-line');
        if (scanLine) {
          const rect = scanLine.getBoundingClientRect();
          setLastScanPosition(rect.top);
        }
        
        setHasScanned(true);
        onResult(barcode);
        
        // Pequeno delay antes de fechar para mostrar a linha fixa
        setTimeout(() => {
          onClose();
        }, 1500); // Aumentado para 1.5 segundos para dar tempo de ver e ouvir o feedback
      }
    },
    timeBetweenDecodingAttempts: 150,
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <audio ref={audioRef} src="/beep.mp3" preload="auto" />
      <div ref={overlayRef} className="relative p-4">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg"
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
            className="w-[340px] h-[100px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 border-2 border-[#8425af] rounded-lg" />
          <div 
            className={`absolute left-0 right-0 h-0.5 bg-red-500 scan-line ${!hasScanned ? 'animate-scan-line' : ''}`}
            style={{ 
              boxShadow: '0 0 4px rgba(255, 0, 0, 0.5)',
              top: hasScanned && lastScanPosition ? `${lastScanPosition}px` : '45%',
              animation: !hasScanned ? 'scan-line 0.8s ease-in-out infinite' : 'none',
              transform: 'translateY(-50%)'
            }}
          />
        </div>
      </div>
    </div>
  );
}

