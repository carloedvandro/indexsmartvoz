import React from 'react';

interface ScannerResultProps {
  code: string | null;
}

export function ScannerResult({ code }: ScannerResultProps) {
  if (!code) return null;
  
  return (
    <div className="mt-4 p-3 bg-gray-50 rounded">
      <p className="text-sm font-medium text-gray-700">Código escaneado:</p>
      <p className="text-sm font-mono">{code}</p>
    </div>
  );
}