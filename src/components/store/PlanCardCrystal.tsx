
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

interface PlanCardCrystalProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

export function PlanCardCrystal({ plan, onSelect }: PlanCardCrystalProps) {
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
          relative w-full h-full overflow-hidden border-2
          bg-gradient-to-br from-emerald-50 to-teal-50
          text-gray-800 transition-all duration-700 ease-out cursor-pointer
          ${isHovered ? 'scale-105' : 'scale-100'}
        `}
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(240, 253, 250, 0.9) 0%, 
              rgba(236, 254, 255, 0.9) 50%, 
              rgba(240, 253, 250, 0.9) 100%
            )
          `,
          borderColor: isHovered ? '#14b8a6' : '#5eead4',
          borderWidth: '2px',
          borderStyle: 'solid',
          boxShadow: isHovered 
            ? `
              0 20px 40px rgba(20, 184, 166, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.9),
              inset 0 -1px 0 rgba(20, 184, 166, 0.1)
            `
            : `
              0 10px 25px rgba(20, 184, 166, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.7)
            `,
          transform: isHovered 
            ? `perspective(1000px) rotateX(${(mousePosition.y - 250) * 0.015}deg) rotateY(${(mousePosition.x - 140) * 0.015}deg) scale(1.05)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        }}
      >
        {/* Crystal facets effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className={`
              absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent
              transition-opacity duration-500
              ${isHovered ? 'opacity-100' : 'opacity-50'}
            `}
          />
          <div 
            className={`
              absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-teal-400 to-transparent
              transition-opacity duration-500 delay-100
              ${isHovered ? 'opacity-100' : 'opacity-50'}
            `}
          />
          <div 
            className={`
              absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-teal-400 to-transparent
              transition-opacity duration-500 delay-200
              ${isHovered ? 'opacity-100' : 'opacity-50'}
            `}
          />
          <div 
            className={`
              absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-transparent via-teal-400 to-transparent
              transition-opacity duration-500 delay-300
              ${isHovered ? 'opacity-100' : 'opacity-50'}
            `}
          />
        </div>

        {/* Prismatic light effect */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-500"
          style={{
            background: isHovered 
              ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                  rgba(20, 184, 166, 0.3) 0%, 
                  rgba(52, 211, 153, 0.2) 30%, 
                  transparent 60%
                )`
              : 'none',
          }}
        />

        <CardHeader className="pb-2 pt-6 relative z-10">
          <div className="text-sm font-medium text-teal-700 mb-2">
            Plano 100% digital.<br/>
            Fácil e flexível.<br/>
            Com Gigas que não expiram.
          </div>
          
          <div className="space-y-3">
            <div 
              className={`
                text-lg font-semibold tracking-wide transition-all duration-300
                ${isHovered ? 'text-teal-600 scale-105' : 'text-emerald-700'}
              `}
            >
              {planType}
            </div>
            
            <div className="flex items-baseline">
              <div 
                className={`
                  text-6xl font-black transition-all duration-500
                  ${isHovered ? 'scale-110 text-teal-600' : 'scale-100 text-emerald-600'}
                `}
                style={{
                  textShadow: isHovered ? '0 0 20px rgba(20, 184, 166, 0.3)' : 'none',
                }}
              >
                {gbNumber}
              </div>
              <div className="ml-2 text-lg font-medium text-emerald-700">GIGAS</div>
              <div className="ml-2 text-sm text-emerald-600">por mês</div>
            </div>
            
            {plan.cashback && (
              <div 
                className={`
                  relative transition-all duration-500
                  ${isHovered ? 'scale-105' : 'scale-100'}
                `}
              >
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-teal-500 text-xl font-bold">+</span>
                <span 
                  className={`
                    py-2 px-3 rounded-lg inline-block font-medium text-sm border transition-all duration-300
                    ${isHovered 
                      ? 'bg-teal-100 text-teal-700 border-teal-300' 
                      : 'bg-emerald-100 text-emerald-700 border-emerald-300'
                    }
                  `}
                  style={{
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
              <div className="text-lg text-emerald-700">R$</div>
              <div 
                className={`
                  text-5xl font-black transition-all duration-300
                  ${isHovered ? 'text-teal-600' : 'text-emerald-600'}
                `}
                style={{
                  textShadow: isHovered ? '0 0 15px rgba(20, 184, 166, 0.2)' : 'none',
                }}
              >
                {Math.floor(plan.price)}
              </div>
              <div className="text-2xl text-emerald-600">,{(plan.price % 1).toFixed(2).substring(2)}</div>
              <div className="text-lg ml-1 text-emerald-700">/mês</div>
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
                  className={`
                    text-lg transition-all duration-300
                    ${isHovered ? 'text-teal-500 scale-110' : 'text-emerald-500'}
                  `}
                  style={{
                    textShadow: isHovered ? '0 0 8px rgba(20, 184, 166, 0.4)' : 'none',
                  }}
                >
                  ✓
                </span>
                <span className="text-sm font-medium text-gray-700">{feature}</span>
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
                className={`
                  text-lg transition-all duration-300
                  ${isHovered ? 'text-teal-500 scale-110' : 'text-emerald-500'}
                `}
                style={{
                  textShadow: isHovered ? '0 0 8px rgba(20, 184, 166, 0.4)' : 'none',
                }}
              >
                ✓
              </span>
              <span className="text-sm font-medium text-gray-700">Validade: 30 Dias</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 relative z-10">
          <button
            onClick={handleClick}
            className={`
              w-full py-3 rounded-xl font-semibold text-white
              transition-all duration-300 transform border border-teal-400/30
              ${isHovered 
                ? 'scale-105 bg-gradient-to-r from-teal-500 to-emerald-500' 
                : 'scale-100 bg-gradient-to-r from-emerald-500 to-teal-500'
              }
              active:scale-95
            `}
            style={{
              boxShadow: isHovered 
                ? '0 10px 25px rgba(20, 184, 166, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                : '0 6px 20px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            Recarregue
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
