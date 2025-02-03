import React from 'react';

export function ScannerOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Interface holográfica principal */}
        <div className="absolute inset-0 bg-gradient-to-r from-scanner-primary/10 to-scanner-secondary/10 animate-hologram">
          {/* Moldura 3D */}
          <div className="absolute inset-4 border-2 border-scanner-highlight/30 rounded-lg transform-gpu perspective-1000 rotate-x-1 backdrop-blur-sm">
            {/* Área de escaneamento */}
            <div className="absolute inset-0 bg-gradient-to-tr from-scanner-core/5 to-scanner-glow/5">
              {/* Linhas de escaneamento */}
              <div className="absolute inset-x-0 h-px bg-scanner-highlight/50 animate-scan-line" />
              <div className="absolute inset-x-0 h-px bg-scanner-secondary/30 animate-scan-line [animation-delay:0.5s]" />
              <div className="absolute inset-x-0 h-px bg-scanner-accent/30 animate-scan-line [animation-delay:1s]" />
            </div>

            {/* Cantos holográficos */}
            {[
              'top-0 left-0',
              'top-0 right-0',
              'bottom-0 left-0',
              'bottom-0 right-0'
            ].map((position, index) => (
              <div
                key={index}
                className={`absolute w-8 h-8 ${position} flex items-center justify-center`}
              >
                <div className="absolute w-full h-full border-2 border-scanner-highlight/50 rounded-lg transform rotate-45" />
                <div className="absolute w-2 h-2 bg-scanner-core rounded-full animate-core-pulse" />
              </div>
            ))}

            {/* Partículas */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="absolute w-1 h-1 bg-scanner-glow rounded-full animate-particle-flow"
                style={{
                  left: `${20 + index * 12}%`,
                  animationDelay: `${index * 0.5}s`
                }}
              />
            ))}

            {/* Núcleo central */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Anéis do núcleo */}
                <div className="absolute -inset-8 bg-gradient-to-r from-scanner-primary/20 to-scanner-secondary/20 rounded-full animate-core-pulse" />
                <div className="absolute -inset-6 bg-gradient-to-r from-scanner-secondary/30 to-scanner-accent/30 rounded-full animate-core-pulse [animation-delay:0.5s]" />
                <div className="absolute -inset-4 bg-gradient-to-r from-scanner-accent/40 to-scanner-highlight/40 rounded-full animate-core-pulse [animation-delay:1s]" />
                
                {/* Centro do núcleo */}
                <div className="w-4 h-4 bg-scanner-core rounded-full animate-core-pulse shadow-lg shadow-scanner-core/50">
                  <div className="absolute inset-0 bg-scanner-glow/50 rounded-full blur-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}