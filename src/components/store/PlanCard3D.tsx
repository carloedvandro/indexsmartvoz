
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

interface PlanCard3DProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

export function PlanCard3D({ plan, onSelect }: PlanCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div
      className="relative w-[280px] h-[500px] perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className={`
          relative w-full h-full overflow-hidden 
          bg-gradient-to-br from-purple-600 via-pink-500 to-purple-800
          text-white border-none shadow-2xl
          transform transition-all duration-700 ease-out
          ${isHovered ? 'rotateY-12 translateY-[-20px] scale-105' : 'rotateY-0 translateY-0 scale-100'}
          cursor-pointer preserve-3d
        `}
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered 
            ? 'perspective(1000px) rotateY(12deg) rotateX(-8deg) translateY(-20px) scale(1.05)' 
            : 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)',
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(168, 85, 247, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
            : '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Animated background overlay */}
        <div 
          className={`
            absolute inset-0 opacity-30 transition-opacity duration-500
            bg-gradient-to-br from-white/20 to-transparent
            ${isHovered ? 'opacity-50' : 'opacity-20'}
          `}
        />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-2 h-2 bg-white/30 rounded-full
                animate-pulse transition-all duration-1000
                ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-60'}
              `}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
                animationDelay: `${i * 0.2}s`,
                transform: isHovered ? `translateY(-${i * 5}px)` : 'translateY(0px)',
              }}
            />
          ))}
        </div>

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
                  ${isHovered ? 'scale-110 text-yellow-300' : 'scale-100'}
                `}
                style={{
                  textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
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
                  ${isHovered ? 'scale-105 translateX-2' : 'scale-100'}
                `}
              >
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-yellow-300 text-xl font-bold">+</span>
                <span className="py-2 px-3 bg-white/20 backdrop-blur-sm text-white rounded-lg inline-block font-medium text-sm border border-white/30">
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
              <div className="text-5xl font-black">{Math.floor(plan.price)}</div>
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
                <span className="text-green-400 text-lg">✓</span>
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
              <span className="text-green-400 text-lg">✓</span>
              <span className="text-sm font-medium">Validade: 30 Dias</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 relative z-10">
          <button
            onClick={handleClick}
            className={`
              w-full py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-pink-600 to-red-600
              transition-all duration-300 transform
              ${isHovered 
                ? 'scale-105 shadow-2xl from-pink-500 to-red-500' 
                : 'scale-100 shadow-lg hover:shadow-xl'
              }
              active:scale-95
            `}
            style={{
              boxShadow: isHovered 
                ? '0 10px 25px rgba(219, 39, 119, 0.4)' 
                : '0 4px 15px rgba(219, 39, 119, 0.3)',
            }}
          >
            Recarregue
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
