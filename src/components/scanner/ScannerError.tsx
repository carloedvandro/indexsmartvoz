import React from 'react';

interface ScannerErrorProps {
  error: string | null;
}

export function ScannerError({ error }: ScannerErrorProps) {
  if (!error) return null;
  
  return (
    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-sm text-red-600 text-center font-medium">
        {error}
      </p>
      <p className="text-xs text-red-500 text-center mt-1">
        Tente posicionar o código mais próximo à câmera e garantir boa iluminação
      </p>
    </div>
  );
}