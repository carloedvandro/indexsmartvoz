import React from 'react';

export function ScannerOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Moldura tecnológica com cantos angulares */}
        <div className="absolute inset-0">
          {/* Cantos superiores */}
          <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-[#0EA5E9] rounded-tl transform -skew-x-12 animate-pulse" />
          <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-[#0EA5E9] rounded-tr transform skew-x-12 animate-pulse" />
          
          {/* Cantos inferiores */}
          <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-[#0EA5E9] rounded-bl transform skew-x-12 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-[#0EA5E9] rounded-br transform -skew-x-12 animate-pulse" />

          {/* Linhas de digitalização múltiplas */}
          <div className="absolute left-0 w-full h-[1px] bg-[#0EA5E9] opacity-50 animate-scanner" 
               style={{ top: '30%', animationDelay: '0s' }} />
          <div className="absolute left-0 w-full h-[1px] bg-[#0EA5E9] opacity-50 animate-scanner" 
               style={{ top: '45%', animationDelay: '0.2s' }} />
          <div className="absolute left-0 w-full h-[1px] bg-[#0EA5E9] opacity-50 animate-scanner" 
               style={{ top: '60%', animationDelay: '0.4s' }} />

          {/* Grade de digitalização */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#0EA5E9]/20" />
          <div className="absolute inset-y-0 left-1/4 w-[1px] bg-[#0EA5E9]/20" />
          <div className="absolute inset-y-0 right-1/4 w-[1px] bg-[#0EA5E9]/20" />

          {/* Núcleo neon central */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 rounded-full bg-[#0EA5E9]/20 animate-pulse">
              <div className="absolute inset-0 w-2 h-2 bg-[#0EA5E9] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}