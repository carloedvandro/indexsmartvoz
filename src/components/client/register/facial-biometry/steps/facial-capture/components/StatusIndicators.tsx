
import React from "react";

interface StatusIndicatorsProps {
  faceDetected: boolean;
  faceProximity: "ideal" | "too-close" | "too-far" | "not-detected";
  isCapturing: boolean;
  captureProgress: number;
}

export const StatusIndicators = ({ 
  faceDetected, 
  faceProximity, 
  isCapturing, 
  captureProgress 
}: StatusIndicatorsProps) => {
  return (
    <>
      {/* Corner guide dots with status colors */}
      <circle cx="10" cy="10" r="3" fill={isCapturing ? "#dc2626" : (faceDetected ? "#16a34a" : "#ffffff")} />
      <circle cx="246" cy="10" r="3" fill={isCapturing ? "#dc2626" : (faceDetected ? "#16a34a" : "#ffffff")} />
      <circle cx="10" cy="310" r="3" fill={isCapturing ? "#dc2626" : (faceDetected ? "#16a34a" : "#ffffff")} />
      <circle cx="246" cy="310" r="3" fill={isCapturing ? "#dc2626" : (faceDetected ? "#16a34a" : "#ffffff")} />
      
      {/* Text indicator when no face is detected */}
      {!faceDetected && !isCapturing && (
        <text 
          x="128" 
          y="270" 
          textAnchor="middle" 
          fill="#ef4444" 
          fontSize="16" 
          fontWeight="bold"
          filter="url(#glow)"
        >
          ❌ Centralize o rosto no oval
        </text>
      )}
      
      {/* Progress feedback during capture - removed text overlays */}
      {faceDetected && faceProximity === "ideal" && !isCapturing && (
        <text 
          x="128" 
          y="285" 
          textAnchor="middle" 
          fill="#ffffff" 
          fontSize="14" 
          fontWeight="bold"
          filter="url(#glow)"
        >
          ✅ Posição perfeita
        </text>
      )}
    </>
  );
};
