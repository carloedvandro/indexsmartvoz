
import React from "react";

interface ProgressOvalProps {
  faceDetected: boolean;
  faceProximity: "ideal" | "too-close" | "too-far" | "not-detected";
  isCapturing: boolean;
  captureProgress: number;
}

export const ProgressOval = ({ 
  faceDetected, 
  faceProximity, 
  isCapturing, 
  captureProgress 
}: ProgressOvalProps) => {
  if (!faceDetected || faceProximity !== "ideal") return null;

  const ovalCircumference = 2 * Math.PI * 140;
  const dashOffset = ovalCircumference - (ovalCircumference * captureProgress / 100);

  return (
    <ellipse 
      cx="128" 
      cy="160" 
      rx="110" 
      ry="140" 
      fill="none" 
      stroke={isCapturing ? "url(#capturing-gradient)" : "url(#progress-gradient)"}
      strokeWidth={isCapturing ? "8" : "6"}
      strokeDasharray={ovalCircumference}
      strokeDashoffset={dashOffset}
      strokeLinecap="round"
      filter="url(#glow)"
      style={{ 
        transition: "stroke-dashoffset 0.1s linear, stroke-width 0.3s ease",
        animation: isCapturing ? "pulse 0.8s infinite" : "none"
      }}
    />
  );
};
