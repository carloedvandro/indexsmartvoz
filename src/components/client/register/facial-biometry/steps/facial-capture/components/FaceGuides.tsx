
import React from "react";

interface FaceGuidesProps {
  faceDetected: boolean;
  faceProximity: "ideal" | "too-close" | "too-far" | "not-detected";
  isCapturing: boolean;
}

export const FaceGuides = ({ faceDetected, faceProximity, isCapturing }: FaceGuidesProps) => {
  return (
    <>
      {/* Face proximity guide with improved visibility */}
      {faceProximity !== "ideal" && faceDetected && !isCapturing && (
        <g>
          {faceProximity === "too-close" && (
            <text 
              x="128" 
              y="70" 
              textAnchor="middle" 
              fill="#ffffff" 
              fontSize="16" 
              fontWeight="bold"
              filter="url(#glow)"
            >
              ⬅️ Afaste um pouco
            </text>
          )}
          {faceProximity === "too-far" && (
            <text 
              x="128" 
              y="70" 
              textAnchor="middle" 
              fill="#ffffff" 
              fontSize="16" 
              fontWeight="bold"
              filter="url(#glow)"
            >
              ➡️ Aproxime um pouco
            </text>
          )}
        </g>
      )}
      
      {/* Center crosshair for better alignment */}
      {!faceDetected && !isCapturing && (
        <g stroke="#ffffff" strokeWidth="2" opacity="0.8">
          <line x1="128" y1="140" x2="128" y2="180" />
          <line x1="108" y1="160" x2="148" y2="160" />
        </g>
      )}
      
      {/* Simplified face guides */}
      <g opacity={faceDetected ? "0.4" : "0.6"} stroke="#ffffff">
        <ellipse cx="90" cy="120" rx="18" ry="8" fill="none" strokeWidth="1.5" />
        <ellipse cx="166" cy="120" rx="18" ry="8" fill="none" strokeWidth="1.5" />
        <path d="M128,120 L128,170 M118,170 L138,170" fill="none" strokeWidth="1.5" />
        <path d="M108,190 C118,200 138,200 148,190" fill="none" strokeWidth="1.5" />
      </g>
    </>
  );
};
