
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
      
      {/* Progress feedback during capture */}
      {faceDetected && faceProximity === "ideal" && (
        <>
          <text 
            x="128" 
            y="260" 
            textAnchor="middle" 
            fill={isCapturing ? "#dc2626" : "#16a34a"} 
            fontSize="20" 
            fontWeight="bold"
            filter="url(#glow)"
            style={{ animation: isCapturing ? "pulse 1s infinite" : "none" }}
          >
            {Math.round(captureProgress)}%
          </text>
          
          <text 
            x="128" 
            y="285" 
            textAnchor="middle" 
            fill="#ffffff" 
            fontSize="14" 
            fontWeight="bold"
            filter="url(#glow)"
          >
            {isCapturing ? "🔴 NÃO SAIA DO OVAL!" : "✅ Posição perfeita"}
          </text>
        </>
      )}
      
      {/* Aviso CRÍTICO durante captura ativa */}
      {isCapturing && (
        <text 
          x="128" 
          y="40" 
          textAnchor="middle" 
          fill="#dc2626" 
          fontSize="16" 
          fontWeight="bold"
          filter="url(#glow)"
          style={{ animation: "pulse 0.5s infinite" }}
        >
          🚨 CAPTURANDO - NÃO MOVA!
        </text>
      )}
      
      {/* Status de proximidade durante captura */}
      {isCapturing && faceProximity !== "ideal" && (
        <text 
          x="128" 
          y="300" 
          textAnchor="middle" 
          fill="#dc2626" 
          fontSize="14" 
          fontWeight="bold"
          filter="url(#glow)"
          style={{ animation: "pulse 0.3s infinite" }}
        >
          ⚠️ VOLTA PARA O CENTRO!
        </text>
      )}
    </>
  );
};
