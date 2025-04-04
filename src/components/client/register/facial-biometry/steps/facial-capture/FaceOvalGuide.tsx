
import React from "react";

interface FaceOvalGuideProps {
  faceDetected: boolean;
  captureProgress: number; // 0-100 progress for animation
  faceProximity: "ideal" | "too-close" | "too-far" | "not-detected";
}

export const FaceOvalGuide = ({ 
  faceDetected, 
  captureProgress, 
  faceProximity 
}: FaceOvalGuideProps) => {
  // Base colors
  const strokeColor = faceDetected ? "#22c55e" : "#ff3366";
  
  // Animation stroke dash offset calculation
  const ovalCircumference = 2 * Math.PI * 140; // Approximate circumference of the oval
  const dashOffset = ovalCircumference - (ovalCircumference * captureProgress / 100);
  
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
          {/* Overlay to darken outside the oval */}
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
            
            {/* Add a glow effect filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Semi-transparent overlay outside the oval */}
          <rect 
            width="100%" 
            height="100%" 
            fill="rgba(0,0,0,0.4)" 
            mask="url(#oval-mask)" 
          />
          
          {/* Static oval outline - changes color based on face detection */}
          <ellipse 
            cx="128" 
            cy="160" 
            rx="110" 
            ry="140" 
            fill="none" 
            stroke={faceDetected ? "#22c55e" : "#ff3366"} 
            strokeWidth="1.5" 
            strokeOpacity="0.4"
          />
          
          {/* Animated progress oval that runs around the outline */}
          {faceDetected && (
            <ellipse 
              cx="128" 
              cy="160" 
              rx="110" 
              ry="140" 
              fill="none" 
              stroke="#22c55e" 
              strokeWidth="5" 
              strokeDasharray={ovalCircumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              filter="url(#glow)"
              style={{ 
                transition: "stroke-dashoffset 0.1s linear",
                animation: captureProgress > 0 ? "pulse 2s infinite" : "none"
              }}
            />
          )}
          
          {/* Face proximity guide with improved visibility */}
          {faceProximity !== "ideal" && faceDetected && (
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
                  Afaste um pouco
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
                  Aproxime um pouco
                </text>
              )}
            </g>
          )}
          
          {/* Center crosshair for better alignment */}
          {!faceDetected && (
            <g stroke="#ffffff" strokeWidth="1.5" opacity="0.7">
              <line x1="128" y1="140" x2="128" y2="180" />
              <line x1="108" y1="160" x2="148" y2="160" />
            </g>
          )}
          
          {/* Simplified face guides - subtle eye, nose outlines */}
          <g opacity={faceDetected ? "0.3" : "0.5"} stroke="#ffffff">
            {/* Eyes */}
            <ellipse cx="90" cy="120" rx="18" ry="8" fill="none" strokeWidth="1" />
            <ellipse cx="166" cy="120" rx="18" ry="8" fill="none" strokeWidth="1" />
            
            {/* Nose */}
            <path d="M128,120 L128,170 M118,170 L138,170" fill="none" strokeWidth="1" />
            
            {/* Mouth outline */}
            <path d="M108,190 C118,200 138,200 148,190" fill="none" strokeWidth="1" />
          </g>
          
          {/* Corner guide dots */}
          <circle cx="10" cy="10" r="3" fill={faceDetected ? "#22c55e" : "#ffffff"} />
          <circle cx="246" cy="10" r="3" fill={faceDetected ? "#22c55e" : "#ffffff"} />
          <circle cx="10" cy="310" r="3" fill={faceDetected ? "#22c55e" : "#ffffff"} />
          <circle cx="246" cy="310" r="3" fill={faceDetected ? "#22c55e" : "#ffffff"} />
          
          {/* Text indicator when no face is detected */}
          {!faceDetected && (
            <text 
              x="128" 
              y="255" 
              textAnchor="middle" 
              fill="#ff3366" 
              fontSize="16" 
              fontWeight="bold"
              filter="url(#glow)"
            >
              Centralize o rosto no oval
            </text>
          )}
          
          {/* Progress percentage for user feedback - made larger and more visible */}
          {faceDetected && faceProximity === "ideal" && captureProgress > 0 && (
            <text 
              x="128" 
              y="255" 
              textAnchor="middle" 
              fill="#22c55e" 
              fontSize="18" 
              fontWeight="bold"
              filter="url(#glow)"
            >
              {Math.round(captureProgress)}%
            </text>
          )}
          
          {/* Added message for ideal positioning */}
          {faceDetected && faceProximity === "ideal" && captureProgress > 0 && (
            <text 
              x="128" 
              y="280" 
              textAnchor="middle" 
              fill="#ffffff" 
              fontSize="14" 
              fontWeight="bold"
              filter="url(#glow)"
            >
              Mantenha-se imóvel
            </text>
          )}
        </svg>
      </div>
    </div>
  );
};
