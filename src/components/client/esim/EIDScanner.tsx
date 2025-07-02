
import { useEffect, useRef, useState } from "react";
import { useZxing } from "react-zxing";
import { Button } from "@/components/ui/button";
import { validateDeviceIdentifier } from "@/services/esim/deviceValidationService";
import { useToast } from "@/hooks/use-toast";

interface EIDScannerProps {
  onResult: (eid: string) => void;
  onBack: () => void;
  deviceType: 'android' | 'ios';
}

export function EIDScanner({ onResult, onBack, deviceType }: EIDScannerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const {
    ref: videoRef,
  } = useZxing({
    onDecodeResult(result) {
      const eidCode = result.getText().toUpperCase().replace(/[^0-9A-F]/g, '');
      console.log("🔍 [EID-SCANNER] EID detectado:", eidCode);
      
      // Validar EID - deve ter exatamente 32 caracteres hexadecimais
      if (eidCode.length === 32 && /^[0-9A-F]+$/.test(eidCode)) {
        console.log("✅ [EID-SCANNER] EID válido detectado:", eidCode);
        
        // Toca o som de beep
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
        
        // Validar o EID com o serviço
        validateEID(eidCode);
      } else {
        console.log("❌ [EID-SCANNER] EID rejeitado:", { 
          eid: eidCode, 
          length: eidCode.length, 
          isHex: /^[0-9A-F]+$/.test(eidCode) 
        });
      }
    },
    timeBetweenDecodingAttempts: 300,
    constraints: {
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: "environment"
      }
    },
  });

  const validateEID = async (eid: string) => {
    setIsValidating(true);
    
    try {
      console.log("Validando EID escaneado:", eid);
      const validation = await validateDeviceIdentifier(deviceType, 'eid', eid);
      
      if (validation.isValid && validation.deviceInfo) {
        console.log("✅ EID validado com sucesso:", validation.deviceInfo);
        
        toast({
          title: "EID Validado",
          description: `${validation.deviceInfo.brand} ${validation.deviceInfo.model}`,
        });
        
        // Pequeno delay antes de continuar
        setTimeout(() => {
          onResult(eid);
        }, 1500);
      } else {
        console.log("❌ EID não autorizado");
        setHasScanned(false);
        setIsScanning(true);
        
        toast({
          variant: "destructive",
          title: "EID não autorizado",
          description: "O EID escaneado não corresponde a um dispositivo compatível com eSIM.",
        });
      }
    } catch (error) {
      console.error('Erro na validação do EID:', error);
      setHasScanned(false);
      setIsScanning(true);
      
      toast({
        variant: "destructive",
        title: "Erro na validação",
        description: "Ocorreu um erro ao validar o EID. Tente escanear novamente.",
      });
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onBack();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBack]);

  // Pre-carrega o som do beep
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, []);

  return (
    <div className="w-full max-w-[90%] md:max-w-[400px] mx-auto space-y-6 pt-20">
      <div className="text-center space-y-2">
      
        <h2 className="text-xl font-semibold text-gray-800">Escaneie o EID</h2>
        <p className="text-gray-600 text-sm">
          Posicione a câmera sobre o código EID que aparece na tela do seu celular
        </p>
      </div>

      <div className="relative">
        <audio ref={audioRef} src="/beep.mp3" preload="auto" />
        
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-[280px] object-cover"
          />
          
          <div className="absolute inset-0 border-2 border-[#8425af] rounded-lg">
            <div className="absolute top-0 left-0 right-0 bg-white/90 text-center py-2 rounded-t-lg font-medium text-sm">
              {isValidating ? "Validando EID..." : 
               hasScanned ? "EID Detectado!" : 
               "Posicione o EID na área de escaneamento"}
            </div>
          </div>
          
          {isScanning && (
            <div className="absolute left-0 right-0 h-1 bg-red-600 top-1/2 transform -translate-y-1/2 animate-pulse" 
                 style={{ boxShadow: '0 0 8px rgba(255, 0, 0, 0.8)' }} />
          )}
          
          {hasScanned && !isValidating && (
            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
              <div className="bg-green-500 text-white px-4 py-2 rounded font-medium">
                ✓ EID Capturado
              </div>
            </div>
          )}
          
          {isValidating && (
            <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
              <div className="bg-blue-500 text-white px-4 py-2 rounded font-medium">
                🔄 Validando...
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-sm text-gray-600 space-y-2">
        <p>• Ligue para *#06# no seu celular</p>
        <p>• Procure pela linha "EID" na tela</p>
        <p>• Posicione a câmera sobre o código de 32 dígitos</p>
        <p className="text-[#8425af] font-medium">O EID deve ter exatamente 32 caracteres</p>
      </div>

      <Button 
        variant="outline"
        className="w-full border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white rounded-lg py-3"
        onClick={onBack}
        disabled={isValidating}
      >
        Voltar
      </Button>
    </div>
  );
}
