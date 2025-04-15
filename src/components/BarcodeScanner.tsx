
import { useEffect, useRef, useState } from "react";
import { useZxing } from "react-zxing";

interface BarcodeScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

// Define extended interfaces to handle the custom camera properties
interface ExtendedMediaTrackCapabilities extends MediaTrackCapabilities {
  focusMode?: string[];
  zoom?: {
    max: number;
    min: number;
    step: number;
  };
}

interface ExtendedMediaTrackConstraintSet extends MediaTrackConstraintSet {
  focusMode?: string;
  zoom?: number;
}

export function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [lastScanPosition, setLastScanPosition] = useState<number | null>(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [constraints, setConstraints] = useState<MediaStreamConstraints>({
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
      facingMode: "environment",
      advanced: [{ } as ExtendedMediaTrackConstraintSet]
    }
  });

  const {
    ref: videoRef,
  } = useZxing({
    onDecodeResult(result) {
      const barcode = result.getText();
      
      // Relaxando a validação para aceitar códigos de 20 dígitos que começam com 8955
      if (barcode.length === 20 && /^8955\d+$/.test(barcode)) {
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
        console.log("Código de barras capturado:", barcode);
        onResult(barcode);
        
        // Pequeno delay antes de fechar para mostrar a linha fixa
        setTimeout(() => {
          onClose();
        }, 1500); // 1.5 segundos para dar tempo de ver e ouvir o feedback
      }
    },
    timeBetweenDecodingAttempts: 100, // Aumento na frequência de tentativas
    constraints: constraints,
  });

  // Tenta ajustar o foco e o zoom da câmera quando disponível
  useEffect(() => {
    const setupCamera = async () => {
      try {
        if (videoRef.current && videoRef.current.srcObject) {
          const track = (videoRef.current.srcObject as MediaStream)
            .getVideoTracks()[0];
            
          if (track) {
            const capabilities = track.getCapabilities() as ExtendedMediaTrackCapabilities;
            const settings = track.getSettings();
            
            console.log("Camera capabilities:", capabilities);
            
            // Ajustar configurações da câmera se disponíveis
            const newConstraints: Partial<ExtendedMediaTrackConstraintSet> = {};
            
            if (capabilities.focusMode && capabilities.focusMode.includes('continuous')) {
              newConstraints.focusMode = 'continuous';
            }
            
            if (capabilities.zoom) {
              newConstraints.zoom = Math.min(capabilities.zoom.max, 2);
            }
            
            if (Object.keys(newConstraints).length > 0) {
              try {
                await track.applyConstraints({ advanced: [newConstraints] });
                console.log("Applied camera constraints:", newConstraints);
              } catch (error) {
                console.error("Error applying camera constraints:", error);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error setting up camera:", error);
      }
    };
    
    setupCamera();
  }, [videoRef.current?.srcObject]);

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
            className="w-[354px] h-[120px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 border-2 border-[#8425af] rounded-lg">
            <div className="absolute top-0 left-0 right-0 bg-white/80 text-center py-2 rounded-t-lg font-medium text-sm">
              Posicione o código de barras do chip
            </div>
          </div>
          <div 
            className={`absolute left-0 right-0 h-1 bg-red-600 scan-line ${!hasScanned ? 'animate-scan-line' : ''}`}
            style={{ 
              boxShadow: '0 0 8px rgba(255, 0, 0, 0.8)',
              top: hasScanned && lastScanPosition ? `${lastScanPosition}px` : '45%',
              animation: !hasScanned ? 'scan-line 1.5s ease-in-out infinite' : 'none',
              transform: 'translateY(-50%)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
