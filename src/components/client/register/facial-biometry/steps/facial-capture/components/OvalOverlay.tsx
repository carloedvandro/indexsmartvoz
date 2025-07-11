
import React from "react";

interface OvalOverlayProps {
  strokeColor: string;
}

export const OvalOverlay = ({ strokeColor }: OvalOverlayProps) => {
  return (
    <>
      {/* Máscara semi-transparente que cobre toda a tela */}
      <defs>
        <mask id="ovalMask">
          {/* Fundo branco (visível) */}
          <rect width="100%" height="100%" fill="white" />
          {/* Oval preto (invisível) para criar o buraco */}
          <ellipse 
            cx="128" 
            cy="160" 
            rx="130" 
            ry="170" 
            fill="black"
          />
        </mask>
      </defs>
      
      {/* Fundo escuro que cobre toda a área, exceto o oval */}
      <rect 
        width="100%" 
        height="100%" 
        fill="rgba(0, 0, 0, 0.65)" 
        mask="url(#ovalMask)"
      />
      
      {/* Contorno do oval com cor dinâmica */}
      <ellipse 
        cx="128" 
        cy="160" 
        rx="130" 
        ry="170" 
        fill="none" 
        stroke={strokeColor}
        strokeWidth="2" 
        strokeOpacity="1"
      />
    </>
  );
};
