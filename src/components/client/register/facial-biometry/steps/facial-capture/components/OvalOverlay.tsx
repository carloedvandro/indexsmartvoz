
import React from "react";

interface OvalOverlayProps {
  strokeColor: string;
}

export const OvalOverlay = ({ strokeColor }: OvalOverlayProps) => {
  return (
    <>
      {/* Removed the semi-transparent overlay outside the oval */}
      
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
