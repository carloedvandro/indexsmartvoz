
import React from "react";
import { 
  SvgDefinitions, 
  OvalOverlay, 
  ProgressOval
} from "./components";

interface FaceOvalGuideProps {
  faceDetected: boolean;
  captureProgress: number; // 0-100 progress for animation
  faceProximity: "ideal" | "too-close" | "too-far" | "not-detected";
  isCapturing?: boolean; // Prop para indicar se está capturando
}

export const FaceOvalGuide = ({ 
  faceDetected, 
  captureProgress, 
  faceProximity,
  isCapturing = false
}: FaceOvalGuideProps) => {
  // Cores mais rigorosas baseadas no estado
  const getStrokeColor = () => {
    if (isCapturing) return "#dc2626"; // Vermelho durante captura ativa
    if (faceDetected && faceProximity === "ideal") return "#16a34a"; // Verde quando ideal
    if (faceDetected) return "#eab308"; // Amarelo quando detectado mas não ideal
    return "#ef4444"; // Vermelho quando não detectado
  };
  
  const strokeColor = getStrokeColor();
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="w-64 h-80 flex items-center justify-center relative" style={{ transform: 'translateY(-10px)' }}>
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 256 320" 
          className="absolute inset-0"
        >
          <SvgDefinitions />
          
          <OvalOverlay strokeColor={strokeColor} />
          
          <ProgressOval 
            faceDetected={faceDetected}
            faceProximity={faceProximity}
            isCapturing={isCapturing}
            captureProgress={captureProgress}
          />
        </svg>
      </div>
    </div>
  );
};
