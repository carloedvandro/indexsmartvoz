
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

interface PlanCardGlassProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

export function PlanCardGlass({ plan, onSelect }: PlanCardGlassProps) {
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
          relative w-full h-full overflow-hidden border
          bg-gradient-to-br from-white/10 to-white/5
          backdrop-blur-xl text-white
          transition-all duration-500 ease-out cursor-pointer
          ${isHovered ? 'scale-105 translateY-[-10px]' : 'scale-100 translateY-0'}
        `}
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.1) 0%, 
              rgba(255, 255, 255, 0.05) 100%
            ),
            linear-gradient(45deg, 
              #667eea 0%, 
              #764ba2 50%, 
              #f093fb 100%
            )
          `,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: isHovered 
            ? `0 20px 40px rgba(102, 126, 234, 0.15)`
            : `0 10px 25px rgba(0, 0, 0, 0.1)`,
          transform: isHovered 
            ? `translateY(-10px) scale(1.05) rotateX(${(mousePosition.y - 250) * 0.01}deg) rotateY(${(mousePosition.x - 140) * 0.01}deg)`
            : 'translateY(0px) scale(1) rotateX(0deg) rotateY(0deg)',
        }}
      >
        {/* Dynamic light reflection */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300"
          style={{
            background: isHovered 
              ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 40%)`
              : 'none',
          }}
        />

        <CardHeader className="pb-2 pt-6 relative z-10">
          <div className="text-sm font-medium opacity-90 mb-2">
            Plano 100% digital.<br/>
            Fácil e flexível.<br/>
            Com Gigas que não expiram.
          </div>
          
          <div className="space-y-3">
            <div className="text-lg font-semibold tracking-wide">{planType}</div>
            
            <div className="flex items-baseline">
              <div 
                className={`
                  text-6xl font-black transition-all duration-500
                  ${isHovered ? 'scale-110 text-cyan-300' : 'scale-100'}
                `}
                style={{
                  textShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                }}
              >
                {gbNumber}
              </div>
              <div className="ml-2 text-lg font-medium">GIGAS</div>
              <div className="ml-2 text-sm opacity-90">por mês</div>
            </div>
            
            {plan.cashback && (
              <div 
                className={`
                  relative transition-all duration-500
                  ${isHovered ? 'scale-105' : 'scale-100'}
                `}
              >
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-cyan-300 text-xl font-bold">+</span>
                <span 
                  className="py-2 px-3 bg-white/20 backdrop-blur-sm text-white rounded-lg inline-block font-medium text-sm border border-white/30"
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
              <div className="text-lg">R$</div>
              <div 
                className="text-5xl font-black"
                style={{
                  textShadow: isHovered ? '0 0 15px rgba(255, 255, 255, 0.3)' : 'none',
                }}
              >
                {Math.floor(plan.price)}
              </div>
              <div className="text-2xl">,{(plan.price % 1).toFixed(2).substring(2)}</div>
              <div className="text-lg ml-1">/mês</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow p-4 pt-2 relative z-10">
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
                <span 
                  className="text-cyan-400 text-lg"
                  style={{
                    textShadow: isHovered ? '0 0 8px rgba(0, 255, 255, 0.4)' : 'none',
                  }}
                >
                  ✓
                </span>
                <span className="text-sm font-medium">{feature}</span>
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
              <span 
                className="text-cyan-400 text-lg"
                style={{
                  textShadow: isHovered ? '0 0 8px rgba(0, 255, 255, 0.4)' : 'none',
                }}
              >
                ✓
              </span>
              <span className="text-sm font-medium">Validade: 30 Dias</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 relative z-10">
          <button
            onClick={handleClick}
            className={`
              w-full py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-cyan-600/80 to-blue-600/80
              backdrop-blur-sm transition-all duration-300 transform
              border border-white/20
              ${isHovered 
                ? 'scale-105 from-cyan-500/90 to-blue-500/90' 
                : 'scale-100 hover:shadow-xl'
              }
              active:scale-95
            `}
            style={{
              boxShadow: isHovered 
                ? '0 8px 20px rgba(6, 182, 212, 0.2)' 
                : '0 4px 10px rgba(6, 182, 212, 0.1)',
            }}
          >
            Recarregue
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
