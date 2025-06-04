
import React from "react";

interface FaceOvalGuideProps {
  faceDetected: boolean;
  captureProgress: number; // 0-100 progress for animation
  faceProximity: "ideal" | "too-close" | "too-far" | "not-detected";
  isCapturing?: boolean; // Novo prop para indicar se está capturando
}

export const FaceOvalGuide = ({ 
  faceDetected, 
  captureProgress, 
  faceProximity,
  isCapturing = false
}: FaceOvalGuideProps) => {
  // Base colors - mais rigoroso durante a captura
  const strokeColor = faceDetected && faceProximity === "ideal" ? "#22c55e" : "#ff3366";
  const capturingColor = isCapturing ? "#0ea5e9" : strokeColor; // Azul durante captura ativa
  
  // Animation stroke dash offset calculation
  const ovalCircumference = 2 * Math.PI * 140;
  const dashOffset = ovalCircumference - (ovalCircumference * captureProgress / 100);
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="w-64 h-80 flex items-center justify-center relative">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 256 320" 
          className="absolute inset-0"
        >
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
            
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Gradiente para indicar captura ativa */}
            <linearGradient id="capturing-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          
          {/* Semi-transparent overlay outside the oval */}
          <rect 
            width="100%" 
            height="100%" 
            fill="rgba(0,0,0,0.4)" 
            mask="url(#oval-mask)" 
          />
          
          {/* Static oval outline */}
          <ellipse 
            cx="128" 
            cy="160" 
            rx="110" 
            ry="140" 
            fill="none" 
            stroke={capturingColor} 
            strokeWidth="1.5" 
            strokeOpacity="0.4"
          />
          
          {/* Animated progress oval */}
          {(faceDetected && faceProximity === "ideal") && (
            <ellipse 
              cx="128" 
              cy="160" 
              rx="110" 
              ry="140" 
              fill="none" 
              stroke={isCapturing ? "url(#capturing-gradient)" : "#22c55e"}
              strokeWidth={isCapturing ? "6" : "5"}
              strokeDasharray={ovalCircumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              filter="url(#glow)"
              style={{ 
                transition: "stroke-dashoffset 0.1s linear, stroke-width 0.3s ease",
                animation: isCapturing ? "pulse 1.5s infinite" : "none"
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
          
          {/* Simplified face guides */}
          <g opacity={faceDetected ? "0.3" : "0.5"} stroke="#ffffff">
            <ellipse cx="90" cy="120" rx="18" ry="8" fill="none" strokeWidth="1" />
            <ellipse cx="166" cy="120" rx="18" ry="8" fill="none" strokeWidth="1" />
            <path d="M128,120 L128,170 M118,170 L138,170" fill="none" strokeWidth="1" />
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
          
          {/* Progress feedback during capture */}
          {faceDetected && faceProximity === "ideal" && (
            <>
              <text 
                x="128" 
                y="255" 
                textAnchor="middle" 
                fill={isCapturing ? "#0ea5e9" : "#22c55e"} 
                fontSize="18" 
                fontWeight="bold"
                filter="url(#glow)"
              >
                {Math.round(captureProgress)}%
              </text>
              
              <text 
                x="128" 
                y="280" 
                textAnchor="middle" 
                fill="#ffffff" 
                fontSize="14" 
                fontWeight="bold"
                filter="url(#glow)"
              >
                {isCapturing ? "Capturando... Mantenha-se imóvel!" : "Mantenha-se imóvel"}
              </text>
            </>
          )}
          
          {/* Aviso especial durante captura ativa */}
          {isCapturing && (
            <text 
              x="128" 
              y="50" 
              textAnchor="middle" 
              fill="#0ea5e9" 
              fontSize="14" 
              fontWeight="bold"
              filter="url(#glow)"
              style={{ animation: "pulse 1s infinite" }}
            >
              ⚠️ NÃO MOVA O ROSTO
            </text>
          )}
        </svg>
      </div>
    </div>
  );
};
