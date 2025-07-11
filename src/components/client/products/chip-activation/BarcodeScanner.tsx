
import { useEffect, useRef, useState } from "react";
import { useZxing } from "react-zxing";
import { X } from "lucide-react";

interface BarcodeScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  

  const {
    ref: videoRef,
  } = useZxing({
    onDecodeResult(result) {
      const barcode = result.getText();
      console.log("🔍 [BARCODE-SCANNER] Código detectado:", barcode);
      
      // Validar código com exatamente 20 dígitos que comece com 8955
      if (barcode.length === 20 && /^8955\d{16}$/.test(barcode)) {
        console.log("✅ [BARCODE-SCANNER] Código válido aceito:", barcode);
        
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
        onResult(barcode);
        
        // Pequeno delay antes de fechar
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        console.log("❌ [BARCODE-SCANNER] Código rejeitado:", { barcode, length: barcode.length, isValid: /^8955\d{16}$/.test(barcode) });
        
        // Mostrar mensagem de erro específica
        if (barcode.length !== 20) {
          setErrorMessage(`Código inválido: deve ter 20 dígitos (detectado: ${barcode.length})`);
        } else if (!barcode.startsWith('8955')) {
          setErrorMessage('Código inválido: deve começar com 8955');
        } else {
          setErrorMessage('Código de barras inválido');
        }
        
        // Limpar mensagem de erro após 3 segundos
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    },
    timeBetweenDecodingAttempts: 50,
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" style={{ paddingTop: '80px' }}>
      <audio ref={audioRef} src="/beep.mp3" preload="auto" />
      
        {/* Modal do scanner */}
        <div 
          ref={overlayRef} 
          className="relative w-full max-w-[344px] rounded-xl border-2 border-[#9b30d9] overflow-hidden bg-black"
          style={{ 
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)'
          }}
        >
        {/* Header do scanner */}
        <div className="absolute top-0 w-full bg-white/95 text-center py-2.5 font-bold z-20">
          Posicione o código de barras do chip
        </div>

        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2.5 bg-white rounded-full border-none w-7 h-7 text-lg cursor-pointer z-20 flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Container da câmera */}
        <div className="relative w-full h-[95px] overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
          />
          
          {/* Linha laser */}
          {isScanning && (
            <div 
              className="absolute left-0 w-full h-[2px] bg-red-500 z-10 opacity-90"
              style={{ 
                animation: 'laser-scan 1.5s infinite alternate ease-in-out'
              }}
            />
          )}

          {/* Overlay de sucesso quando escaneado */}
          {hasScanned && (
            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center z-20">
              <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg text-sm">
                ✓ Código Capturado
              </div>
            </div>
          )}
          
          {/* Overlay de erro quando código inválido */}
          {errorMessage && (
            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center z-20">
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg text-sm text-center">
                {errorMessage}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
