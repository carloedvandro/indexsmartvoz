
import { useEffect, useRef, useState } from "react";
import { useZxing } from "react-zxing";
import { toast } from "@/hooks/use-toast";

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
      
      // Validação específica: deve ter 20 dígitos e começar com 8955
      if (barcode.length === 20 && /^8955\d{16}$/.test(barcode)) {
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
        const scanLine = document.querySelector('.laser-line, [data-laser-line]');
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
      } else {
        // Mostra aviso para ICCID inválido
        console.warn("ICCID inválido:", barcode);
        toast({
          title: "ICCID inválido",
          description: "O código deve ter 20 dígitos e começar com 8955.",
          variant: "destructive",
        });
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
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <audio ref={audioRef} src="/beep.mp3" preload="auto" />
      <div ref={overlayRef} className="relative">
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

        <div className="relative bg-white rounded-lg p-2">
          <div className="relative">
            <video
              ref={videoRef}
              className="w-[360px] h-[90px] object-cover rounded-lg overflow-hidden"
            />
            
            {/* Área de escaneamento otimizada para código de barras */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              {/* Título do modal */}
              <div className="absolute top-0 left-0 right-0 bg-[#8425af] text-white text-center py-2 rounded-t-lg font-medium text-sm z-20">
                Posicione o código de barras do chip
              </div>
              
              {/* Área de escaneamento do código de barras */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[45px] border-2 border-[#8425af] bg-transparent rounded z-10">
                {/* Linha laser vermelha animada */}
                <div 
                  data-laser-line
                  className={`absolute left-0 right-0 h-0.5 bg-red-600 z-30 ${!hasScanned ? 'animate-laser-scan' : ''}`}
                  style={{ 
                    boxShadow: '0 0 8px rgba(255, 0, 0, 0.8)',
                    top: hasScanned && lastScanPosition ? `${lastScanPosition}px` : '0%',
                    animation: !hasScanned ? 'laser-scan 1.2s linear infinite' : 'none'
                  }}
                />
              </div>
              
              {/* Overlay escuro nas bordas */}
              <div className="absolute inset-0 bg-black/30 rounded-lg pointer-events-none" style={{
                mask: 'radial-gradient(ellipse 320px 45px at center, transparent 50%, black 52%)'
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
