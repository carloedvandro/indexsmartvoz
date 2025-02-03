import React from 'react';

interface ScannerErrorProps {
  error: string | null;
}

export function ScannerError({ error }: ScannerErrorProps) {
  return error ? (
    <div className="mt-2 text-sm text-red-500 text-center">
      {error}
    </div>
  ) : null;
}