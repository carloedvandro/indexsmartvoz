
import { Button } from "@/components/ui/button";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { ChipInstructions } from "./chip-activation/ChipInstructions";
import { BarcodeInstructions } from "./chip-activation/BarcodeInstructions";
import { BarcodeScannerComponent } from "./chip-activation/BarcodeScanner";
import { useEffect } from "react";

interface ChipActivationFlowProps {
  currentStep: number;
  selectedLines: Line[];
  scanningIndex: number | null;
  onBack: () => void;
  onContinue: () => void;
  onStartScanning: (index: number) => void;
  onUpdateBarcode: (index: number, barcode: string) => void;
  onScanningClose: () => void;
}

export type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  barcode?: string;
};

export function ChipActivationFlow({
  currentStep,
  selectedLines,
  scanningIndex,
  onBack,
  onContinue,
  onStartScanning,
  onUpdateBarcode,
  onScanningClose,
}: ChipActivationFlowProps) {
  // Verifica se todos os códigos de barras foram escaneados
  const allBarcodesScanned = selectedLines.every(line => line.barcode);
  
  // Adiciona a animação do scanner à folha de estilo global se ainda não existir
  useEffect(() => {
    if (!document.getElementById('scan-line-animation')) {
      const style = document.createElement('style');
      style.id = 'scan-line-animation';
      style.innerHTML = `
        @keyframes scan-line {
          0% {
            top: 20%;
          }
          50% {
            top: 80%;
          }
          100% {
            top: 20%;
          }
        }
        .animate-scan-line {
          animation: scan-line 1.5s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      const styleElement = document.getElementById('scan-line-animation');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  return (
    <>
      {scanningIndex !== null && (
        <BarcodeScanner
          onResult={(result) => onUpdateBarcode(scanningIndex, result)}
          onClose={onScanningClose}
        />
      )}
      
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-[340px] mx-auto">
          <div className="pt-16 space-y-8">
            {currentStep === 4 && <ChipInstructions />}
            {currentStep === 5 && <BarcodeInstructions onBack={onBack} onContinue={onContinue} />}
            {currentStep === 6 && (
              <div className="flex flex-col space-y-6">
                <BarcodeScannerComponent
                  selectedLines={selectedLines}
                  onStartScanning={onStartScanning}
                />
                <div className="flex justify-between gap-4 w-full">
                  <Button 
                    variant="outline" 
                    className="flex-1 bg-white border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white px-4 h-[42px] flex items-center justify-center"
                    onClick={onBack}
                  >
                    Voltar
                  </Button>
                  <Button 
                    className="flex-1 bg-[#8425af] hover:bg-[#6c1e8f] text-white px-4 h-[42px] flex items-center justify-center"
                    onClick={onContinue}
                    disabled={!allBarcodesScanned}
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
