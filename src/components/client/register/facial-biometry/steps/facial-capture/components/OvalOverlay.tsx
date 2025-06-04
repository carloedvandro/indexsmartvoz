
import React from "react";

interface OvalOverlayProps {
  strokeColor: string;
}

export const OvalOverlay = ({ strokeColor }: OvalOverlayProps) => {
  return (
    <>
      {/* Semi-transparent overlay outside the oval */}
      <rect 
        width="100%" 
        height="100%" 
        fill="rgba(0,0,0,0.5)" 
        mask="url(#oval-mask)" 
      />
      
      {/* Static oval outline */}
      <ellipse 
        cx="128" 
        cy="160" 
        rx="110" 
        ry="140" 
        fill="none" 
        stroke={strokeColor} 
        strokeWidth="2" 
        strokeOpacity="0.6"
      />
    </>
  );
};
