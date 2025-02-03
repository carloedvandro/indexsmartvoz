import React from 'react';

export function ScannerOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Container principal com borda fina */}
      <div className="relative w-full h-full">
        {/* Moldura minimalista */}
        <div className="absolute inset-0 border border-[#333333] rounded-lg">
          {/* Ponto central */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#8E9196]" />
          
          {/* Linha de scanner com animação */}
          <div className="absolute left-0 w-full h-[1px] bg-[#8E9196]/50 animate-scanner" />
        </div>
      </div>
    </div>
  );
}