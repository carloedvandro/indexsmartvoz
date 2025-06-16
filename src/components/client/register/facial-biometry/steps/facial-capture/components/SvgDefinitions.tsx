
import React from "react";

export const SvgDefinitions = () => {
  return (
    <defs>
      <mask id="oval-mask">
        <rect width="100%" height="100%" fill="white" />
        <ellipse 
          cx="128" 
          cy="160" 
          rx="110" 
          ry="140" 
          fill="black" 
        />
      </mask>
      
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* Gradiente para captura ativa com cores mais chamativas */}
      <linearGradient id="capturing-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dc2626" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>

      {/* Gradiente para progresso normal */}
      <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#22c55e" />
      </linearGradient>
    </defs>
  );
};
