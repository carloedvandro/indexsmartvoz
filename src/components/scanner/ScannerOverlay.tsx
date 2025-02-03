import React from 'react';

export function ScannerOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Container principal com borda e cantos */}
      <div className="relative w-full h-full border border-[#8425af] rounded-lg">
        {/* Cantos superiores */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-[#8425af]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-[#8425af]" />
        
        {/* Cantos inferiores */}
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-[#8425af]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-[#8425af]" />
        
        {/* Linha de scanner com animação */}
        <div className="absolute left-0 w-full h-0.5 bg-red-600 animate-scanner" />
      </div>
    </div>
  );
}