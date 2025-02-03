import React from 'react';

export function ScannerOverlay() {
  return (
    <div className="absolute inset-0 border-2 border-[#8425af] rounded pointer-events-none">
      <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#8425af]/30" />
      <div className="absolute inset-y-0 left-1/4 w-0.5 bg-[#8425af]/30" />
      <div className="absolute inset-y-0 right-1/4 w-0.5 bg-[#8425af]/30" />
    </div>
  );
}