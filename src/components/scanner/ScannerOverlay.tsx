import React from 'react';

export function ScannerOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Interface principal com bordas roxas */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10">
          {/* Moldura com cantos destacados */}
          <div className="absolute inset-4 border-2 border-accent rounded-lg">
            {/* Área de escaneamento com linhas guia semitransparentes */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5">
              {/* Linha de laser vermelha animada */}
              <div className="absolute inset-x-0 h-0.5 bg-red-500/70 animate-scan-line" />
              
              {/* Linhas guia semitransparentes */}
              <div className="absolute inset-y-0 left-1/3 w-px bg-primary/20" />
              <div className="absolute inset-y-0 right-1/3 w-px bg-primary/20" />
              <div className="absolute inset-x-0 top-1/3 h-px bg-primary/20" />
              <div className="absolute inset-x-0 bottom-1/3 h-px bg-primary/20" />
            </div>

            {/* Cantos destacados */}
            {[
              'top-0 left-0',
              'top-0 right-0',
              'bottom-0 left-0',
              'bottom-0 right-0'
            ].map((position, index) => (
              <div
                key={index}
                className={`absolute w-6 h-6 ${position}`}
              >
                <div className="absolute w-full h-full">
                  <div className="absolute w-full h-2 bg-accent/50" />
                  <div className="absolute w-2 h-full bg-accent/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}