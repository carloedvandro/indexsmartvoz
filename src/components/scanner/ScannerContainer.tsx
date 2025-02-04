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
      // Confirma automaticamente após 1.5 segundos
      const timer = setTimeout(() => {
        onResult(lastScannedCode);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [lastScannedCode, onResult]);

  return (
    <div className="w-full max-w-[340px] mx-auto">
      <div className="relative h-[80vh] flex items-center justify-center">
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
      <ScannerControls 
        onClose={onClose}
        onConfirm={() => lastScannedCode && onResult(lastScannedCode)}
        showConfirm={!!lastScannedCode}
      />
    </div>
  );
}