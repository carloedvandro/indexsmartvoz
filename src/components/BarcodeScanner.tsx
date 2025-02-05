import { useEffect, useRef } from "react";
import { useZxing } from "react-zxing";

interface BarcodeScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    ref: videoRef,
  } = useZxing({
    onDecodeResult(result) {
      const barcode = result.getText();
      // Só aceita códigos com exatamente 20 dígitos
      if (barcode.length === 20 && /^\d+$/.test(barcode)) {
        // Toca o som de beep
        if (audioRef.current) {
          audioRef.current.play().catch(error => {
            console.error("Erro ao tocar o som:", error);
          });
        }
        onResult(barcode);
        onClose();
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <audio ref={audioRef} src="/beep.mp3" />
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
            className="absolute left-0 right-0 h-0.5 bg-red-500 animate-scan-line"
            style={{ 
              boxShadow: '0 0 4px rgba(255, 0, 0, 0.5)',
              animation: 'scan-line 0.8s ease-in-out infinite',
              top: '45%',
              transform: 'translateY(-50%)'
            }}
          />
        </div>
      </div>
    </div>
  );
}