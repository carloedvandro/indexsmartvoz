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
    <div className="w-full max-w-[420px] mx-auto">
      <div className="relative h-[10vh] flex items-center justify-center">
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
        onConfirm={handleConfirm}
        showConfirm={!!lastScannedCode}
      />
    </div>
  );
}