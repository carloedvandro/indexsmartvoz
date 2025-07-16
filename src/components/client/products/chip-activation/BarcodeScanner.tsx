
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
  const [iccidDisplay, setIccidDisplay] = useState("ICCID: Aguardando leitura...");
  

  const {
    ref: videoRef,
  } = useZxing({
    onDecodeResult(result) {
      const barcode = result.getText();
      
      // Remove todos os caracteres não numéricos
      const iccidRaw = barcode.replace(/[^\d]/g, '');
      console.log("🔍 [BARCODE-SCANNER] ICCID detectado:", iccidRaw);
      
      // Validar ICCID: deve ter 19 ou 20 dígitos
      if (/^\d{19,20}$/.test(iccidRaw)) {
        console.log("✅ [BARCODE-SCANNER] ICCID válido aceito:", iccidRaw);
        
        // Atualiza o display do ICCID
        setIccidDisplay(`ICCID: ${iccidRaw}`);
        
        // Toca o som de beep com volume máximo
        try {
          const beepSound = audioRef.current;
          if (beepSound) {
            beepSound.volume = 1.0;
            beepSound.currentTime = 0;
            
            console.log("🔊 [BARCODE-SCANNER] Tentando tocar o beep...");
            
            const playPromise = beepSound.play();
            playPromise.then(() => {
              console.log("✅ [BARCODE-SCANNER] Beep tocado com sucesso!");
            }).catch(error => {
              console.error("❌ [BARCODE-SCANNER] Erro ao tocar o beep:", error);
              
              // Fallback: criar novo áudio e tocar
              const fallbackBeep = new Audio('/beep.mp3');
              fallbackBeep.volume = 1.0;
              fallbackBeep.play().catch(e => {
                console.error("❌ [BARCODE-SCANNER] Fallback beep também falhou:", e);
              });
            });
          } else {
            console.error("❌ [BARCODE-SCANNER] Referência do áudio não encontrada");
            
            // Fallback: criar novo áudio
            const fallbackBeep = new Audio('/beep.mp3');
            fallbackBeep.volume = 1.0;
            fallbackBeep.play().catch(e => {
              console.error("❌ [BARCODE-SCANNER] Fallback beep falhou:", e);
            });
          }
        } catch (error) {
          console.error("❌ [BARCODE-SCANNER] Erro geral no áudio:", error);
        }
        
        setHasScanned(true);
        setIsScanning(false);
        setErrorMessage('');
        onResult(iccidRaw);
        
        // Delay maior para mostrar o ICCID capturado
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        console.log("❌ [BARCODE-SCANNER] ICCID rejeitado:", { iccid: iccidRaw, length: iccidRaw.length });
        
        // Mostrar mensagem de erro mais específica
        setErrorMessage("Código inválido. Tente novamente.");
        setIccidDisplay("ICCID: Código inválido");
        
        // Limpar mensagem de erro após 3 segundos
        setTimeout(() => {
          setErrorMessage('');
          setIccidDisplay("ICCID: Aguardando leitura...");
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
        <div className="absolute top-0 w-full text-center py-2.5 font-bold z-20 text-sm text-white" style={{ backgroundColor: '#5f0889' }}>
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
                top: '50%',
                transform: 'translateY(-50%)',
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
        
        {/* Display do ICCID */}
        <div className="absolute top-0 w-full bg-white/95 text-center py-2.5 font-bold z-20 text-sm">
          <div className="text-lg font-bold">
            {iccidDisplay}
          </div>
          {hasScanned && (
            <button
              onClick={() => {
                setHasScanned(false);
                setIsScanning(true);
                setIccidDisplay("ICCID: Aguardando leitura...");
              }}
              className="mt-2 bg-[#7f3cff] hover:bg-[#985bff] text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Escanear novamente
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
