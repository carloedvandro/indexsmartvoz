import React from 'react';

export function ScannerOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Moldura sólida empresarial */}
        <div className="absolute inset-0">
          {/* Borda externa sólida */}
          <div className="absolute inset-0 border-2 border-[#555555] rounded-lg" />
          
          {/* Área de digitalização destacada */}
          <div className="absolute inset-4 border border-[#8E9196] rounded bg-white/5">
            {/* Cantos de destaque */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#333333]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#333333]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#333333]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#333333]" />
          </div>

          {/* Indicadores de progresso */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2">
            {/* Barra de progresso principal */}
            <div className="h-[2px] bg-[#C8C8C9]/20">
              <div className="h-full w-full bg-[#8A898C] animate-scanner-progress" />
            </div>

            {/* Linhas de guia */}
            <div className="absolute inset-y-0 left-1/4 w-[1px] h-8 -translate-y-1/2 bg-[#8A898C]/30" />
            <div className="absolute inset-y-0 right-1/4 w-[1px] h-8 -translate-y-1/2 bg-[#8A898C]/30" />
          </div>

          {/* Indicador central */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6">
              <div className="absolute inset-0 border-2 border-[#555555] rounded-full animate-pulse-subtle" />
              <div className="absolute inset-[6px] bg-[#8A898C] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}