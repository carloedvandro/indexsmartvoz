
import React from "react";

interface FaceOvalGuideProps {
  faceDetected: boolean;
}

export const FaceOvalGuide = ({ faceDetected }: FaceOvalGuideProps) => {
  // Use red when no face detected, green when detected
  const strokeColor = faceDetected ? "#22c55e" : "#ff3366";
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="w-64 h-80 flex items-center justify-center relative">
        {/* Face oval */}
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 256 320" 
          className="absolute inset-0"
        >
          {/* Oval outline - changes color based on face detection */}
          <ellipse 
            cx="128" 
            cy="160" 
            rx="110" 
            ry="140" 
            fill="none" 
            stroke={strokeColor} 
            strokeWidth="2"
          />
          
          {/* Simplified face guides - subtle eye, nose outlines */}
          <g opacity="0.6" stroke="#ffffff">
            {/* Eyes */}
            <ellipse cx="90" cy="120" rx="18" ry="8" fill="none" strokeWidth="1" />
            <ellipse cx="166" cy="120" rx="18" ry="8" fill="none" strokeWidth="1" />
            
            {/* Nose */}
            <path d="M128,120 L128,170 M118,170 L138,170" fill="none" strokeWidth="1" />
            
            {/* Mouth outline */}
            <path d="M108,190 C118,200 138,200 148,190" fill="none" strokeWidth="1" />
          </g>
          
          {/* Corner guide dots */}
          <circle cx="10" cy="10" r="3" fill="#000" />
          <circle cx="246" cy="10" r="3" fill="#000" />
          <circle cx="10" cy="310" r="3" fill="#000" />
          <circle cx="246" cy="310" r="3" fill="#000" />
        </svg>
      </div>
    </div>
  );
};
