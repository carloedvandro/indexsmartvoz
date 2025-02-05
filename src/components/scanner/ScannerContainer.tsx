import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (lastScannedCode) {
      const timer = setTimeout(() => {
        onResult(lastScannedCode);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [lastScannedCode, onResult]);

  return (
    <div className="w-full max-w-[340px] mx-auto bg-white rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold text-center p-4">
        Escaneie o código de barra do chip
      </h2>
      
      <div className="relative h-[300px] bg-black">
        <div className="absolute inset-0">
          <ScannerCamera
            onValidCode={onValidCode}
            onError={onError}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[280px] h-[100px] border-2 border-red-500 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-[2px] bg-red-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-500 text-center">
          Posicione o código de barras do chip dentro da área destacada
        </p>
        
        <ScannerError error={error} />
        <ScannerResult code={lastScannedCode} />
        
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}