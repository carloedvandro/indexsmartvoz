
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format";

type Plan = {
  id: string;
  name: string;
  gb: string;
  price: number;
  originalPrice?: number;
  isHighlighted?: boolean;
  features: string[];
  cashback?: number;
};

interface PlanCardHolographicProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

export function PlanCardHolographic({ plan, onSelect }: PlanCardHolographicProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const filteredFeatures = plan.features.filter(feature => 
    !feature.includes("Portabilidade:") && 
    !feature.includes("portabilidade") &&
    !feature.includes("Frete Grátis") &&
    !feature.includes("WhatsApp Grátis") &&
    !feature.includes("Skeelo") &&
    !feature.includes("Waze")
  );

  const getPlanType = (gb: string) => {
    const value = parseInt(gb);
    if (value <= 80) return "Oferta Basic";
    if (value <= 100) return "Oferta Prime";
    if (value <= 120) return "Oferta Premium";
    if (value <= 140) return "Oferta Gold";
    return "Oferta Master";
  };

  const planType = getPlanType(plan.gb);
  const gbNumber = plan.gb.replace("GB", "");
  
  const handleClick = () => {
    onSelect(plan);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="relative w-[280px] h-[500px] perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <Card 
        className={`
          relative w-full h-full overflow-hidden border-0
          bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
          text-white transition-all duration-700 ease-out cursor-pointer
          ${isHovered ? 'scale-105' : 'scale-100'}
        `}
        style={{
          background: `
            linear-gradient(135deg, #0f0f23 0%, #1a1a3e 25%, #2d1b69 50%, #1a1a3e 75%, #0f0f23 100%),
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(147, 51, 234, 0.3) 0%, 
              transparent 50%
            )
          `,
          transform: isHovered 
            ? `perspective(1000px) rotateX(${(mousePosition.y - 250) * 0.02}deg) rotateY(${(mousePosition.x - 140) * 0.02}deg) scale(1.05)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        }}
      >
        {/* Holographic shimmer effect */}
        <div 
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background: isHovered 
              ? `linear-gradient(45deg, 
                  transparent 30%, 
                  rgba(255, 255, 255, 0.1) 50%, 
                  transparent 70%
                ), 
                linear-gradient(-45deg, 
                  transparent 30%, 
                  rgba(147, 51, 234, 0.2) 50%, 
                  transparent 70%
                )`
              : 'none',
            animation: isHovered ? 'shimmer 2s ease-in-out infinite' : 'none',
          }}
        />

        {/* Animated border gradient */}
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: isHovered 
              ? `linear-gradient(45deg, #8b5cf6, #06b6d4, #8b5cf6, #06b6d4)` 
              : 'linear-gradient(45deg, #4c1d95, #1e293b)',
            backgroundSize: '400% 400%',
            animation: isHovered ? 'gradientShift 3s ease infinite' : 'none',
            padding: '2px',
          }}
        >
          <div className="w-full h-full bg-slate-900 rounded-lg" />
        </div>

        <div className="relative z-10 p-6 h-full flex flex-col">
          <CardHeader className="pb-2 pt-0 px-0">
            <div className="text-sm font-medium opacity-90 mb-2">
              Plano 100% digital.<br/>
              Fácil e flexível.<br/>
              Com Gigas que não expiram.
            </div>
            
            <div className="space-y-3">
              <div 
                className="text-lg font-semibold tracking-wide"
                style={{
                  background: 'linear-gradient(45deg, #8b5cf6, #06b6d4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {planType}
              </div>
              
              <div className="flex items-baseline">
                <div 
                  className={`
                    text-6xl font-black transition-all duration-500
                    ${isHovered ? 'scale-110' : 'scale-100'}
                  `}
                  style={{
                    background: isHovered 
                      ? 'linear-gradient(45deg, #ffffff, #8b5cf6, #06b6d4)' 
                      : 'linear-gradient(45deg, #e2e8f0, #8b5cf6)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% 200%',
                    animation: isHovered ? 'textGlow 2s ease-in-out infinite' : 'none',
                  }}
                >
                  {gbNumber}
                </div>
                <div className="ml-2 text-lg font-medium text-slate-300">GIGAS</div>
                <div className="ml-2 text-sm text-slate-400">por mês</div>
              </div>
              
              {plan.cashback && (
                <div 
                  className={`
                    relative transition-all duration-500
                    ${isHovered ? 'scale-105' : 'scale-100'}
                  `}
                >
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-purple-400 text-xl font-bold">+</span>
                  <span 
                    className="py-2 px-3 text-white rounded-lg inline-block font-medium text-sm border border-purple-500/30"
                    style={{
                      background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    R${plan.cashback.toFixed(2).replace(".", ",")} CASHBACK
                  </span>
                </div>
              )}
              
              <div 
                className={`
                  flex items-baseline transition-all duration-500
                  ${isHovered ? 'scale-110' : 'scale-100'}
                `}
              >
                <div className="text-lg text-slate-300">R$</div>
                <div 
                  className="text-5xl font-black"
                  style={{
                    background: 'linear-gradient(45deg, #ffffff, #8b5cf6)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {Math.floor(plan.price)}
                </div>
                <div className="text-2xl text-white">,{(plan.price % 1).toFixed(2).substring(2)}</div>
                <div className="text-lg ml-1 text-slate-300">/mês</div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-grow px-0 pt-2">
            <div className="space-y-3">
              {filteredFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className={`
                    flex items-center gap-3 transition-all duration-300
                    ${isHovered ? 'translateX-2' : 'translateX-0'}
                  `}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  <span className="text-purple-400 text-lg">✓</span>
                  <span className="text-sm font-medium text-slate-200">{feature}</span>
                </div>
              ))}
              
              <div 
                className={`
                  flex items-center gap-3 transition-all duration-300
                  ${isHovered ? 'translateX-2' : 'translateX-0'}
                `}
                style={{
                  transitionDelay: `${filteredFeatures.length * 50}ms`,
                }}
              >
                <span className="text-purple-400 text-lg">✓</span>
                <span className="text-sm font-medium text-slate-200">Validade: 30 Dias</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="px-0 pt-0">
            <button
              onClick={handleClick}
              className={`
                w-full py-3 rounded-xl font-semibold text-white
                transition-all duration-300 transform border border-purple-500/30
                ${isHovered 
                  ? 'scale-105' 
                  : 'scale-100'
                }
                active:scale-95
              `}
              style={{
                background: isHovered 
                  ? 'linear-gradient(45deg, #8b5cf6, #06b6d4)' 
                  : 'linear-gradient(45deg, #7c3aed, #0891b2)',
                boxShadow: isHovered 
                  ? '0 8px 25px rgba(139, 92, 246, 0.3)' 
                  : '0 4px 15px rgba(124, 58, 237, 0.2)',
              }}
            >
              Recarregue
            </button>
          </CardFooter>
        </div>
      </Card>

      <style>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%) translateY(-100%); }
          50% { transform: translateX(100%) translateY(100%); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes textGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
