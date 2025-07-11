
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

  const {
    ref: videoRef,
  } = useZxing({
    onDecodeResult(result) {
      const barcode = result.getText();
      console.log("🔍 [BARCODE-SCANNER] Código detectado:", barcode);
      
      // Aceitar códigos de barras com diferentes formatos - relaxar validação
      if (barcode.length >= 8 && /^\d+$/.test(barcode)) {
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
        console.log("❌ [BARCODE-SCANNER] Código rejeitado:", { barcode, length: barcode.length, isNumeric: /^\d+$/.test(barcode) });
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
    <div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50 p-4">
      <audio ref={audioRef} src="/beep.mp3" preload="auto" />
      
      {/* Modal com bordas arredondadas e borda roxa */}
      <div 
        ref={overlayRef} 
        className="relative bg-white rounded-xl border-2 border-purple-700 w-full max-w-sm mb-16 overflow-hidden shadow-2xl"
        style={{ borderRadius: '12px' }}
      >
        {/* Botão de fechar (X) no canto superior direito */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg z-20 border border-gray-200"
        >
          <X className="w-5 h-5 text-black" />
        </button>

        {/* Título superior da caixa */}
        <div className="bg-white p-4 text-center border-b border-gray-100">
          <h3 className="text-base font-normal text-black">
            Posicione o código de barras do chip
          </h3>
        </div>

        {/* Área da câmera */}
        <div className="relative bg-gray-900">
          <video
            ref={videoRef}
            className="w-full h-48 object-cover"
            style={{ aspectRatio: '4/3' }}
          />
          
          {/* Linha vermelha horizontal como guia */}
          {isScanning && (
            <div 
              className="absolute left-0 right-0 bg-red-500 animate-scan-line"
              style={{ 
                height: '4px',
                top: '55%',
                boxShadow: '0 0 10px rgba(255, 0, 0, 0.8)',
                borderRadius: '2px'
              }} 
            />
          )}

          {/* Overlay de sucesso quando escaneado */}
          {hasScanned && (
            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
              <div className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium shadow-lg">
                ✓ Código Capturado
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
