import React from 'react';
import { ScannerCamera } from './ScannerCamera';
import { ScannerOverlay } from './ScannerOverlay';
import { ScannerError } from './ScannerError';
import { ScannerResult } from './ScannerResult';
import { ScannerControls } from './ScannerControls';

interface ScannerContainerProps {
  onResult: (result: string) => void;
  onClose: () => void;
  error: string | null;
  lastScannedCode: string | null;
  onValidCode: (code: string) => void;
  onError: (error: string) => void;
}

export function ScannerContainer({ 
  onResult, 
  onClose, 
  error, 
  lastScannedCode,
  onValidCode,
  onError
}: ScannerContainerProps) {
  const handleConfirm = () => {
    if (lastScannedCode) {
      onResult(lastScannedCode);
    }
  };

  return (
    <div className="w-full max-w-[380px] mx-auto">
      <div className={`relative ${lastScannedCode ? 'h-[60vh]' : 'h-[40vh]'} flex items-center justify-center`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <ScannerCamera
            onValidCode={onValidCode}
            onError={onError}
          />
        </div>
        <ScannerOverlay />
      </div>
      
      <ScannerError error={error} />
      <ScannerResult code={lastScannedCode} />
      
      {lastScannedCode ? (
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="bg-[#8425af] hover:bg-[#6c1e8f] text-white px-4 py-2 rounded"
          >
            Continuar
          </button>
        </div>
      ) : (
        <div className="mt-4 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Posicione o código de barras do chip dentro da área
          </p>
          <button
            onClick={onClose}
            className="border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}