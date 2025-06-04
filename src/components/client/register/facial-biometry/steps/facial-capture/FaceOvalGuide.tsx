
import React from "react";

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

            {/* Gradiente para captura ativa com cores mais chamativas */}
            <linearGradient id="capturing-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>

            {/* Gradiente para progresso normal */}
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          
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
          
          {/* Animated progress oval - MAIS VISÍVEL durante captura */}
          {(faceDetected && faceProximity === "ideal") && (
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
          )}
          
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
        </svg>
      </div>
    </div>
  );
};
