
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

interface PlanCardMinimalProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

export function PlanCardMinimal({ plan, onSelect }: PlanCardMinimalProps) {
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
          relative w-full h-full overflow-hidden border-0
          bg-white text-gray-900 transition-all duration-500 ease-out cursor-pointer
          ${isHovered ? 'scale-105 translateY-[-8px]' : 'scale-100 translateY-0'}
        `}
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          boxShadow: isHovered 
            ? '0 25px 50px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)' 
            : '0 10px 30px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.02)',
          transform: isHovered 
            ? 'translateY(-8px) scale(1.05) rotateX(-2deg)' 
            : 'translateY(0px) scale(1) rotateX(0deg)',
        }}
      >
        {/* Subtle gradient overlay on hover */}
        <div 
          className={`
            absolute inset-0 opacity-0 transition-opacity duration-500
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(168, 85, 247, 0.02) 100%)',
          }}
        />

        {/* Animated accent line */}
        <div 
          className={`
            absolute top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500
            transition-all duration-500
            ${isHovered ? 'w-full' : 'w-0'}
          `}
        />

        <CardHeader className="pb-2 pt-6 relative z-10">
          <div className="text-sm font-medium text-gray-600 mb-2">
            Plano 100% digital.<br/>
            Fácil e flexível.<br/>
            Com Gigas que não expiram.
          </div>
          
          <div className="space-y-3">
            <div 
              className={`
                text-lg font-semibold tracking-wide transition-colors duration-300
                ${isHovered ? 'text-indigo-600' : 'text-gray-700'}
              `}
            >
              {planType}
            </div>
            
            <div className="flex items-baseline">
              <div 
                className={`
                  text-6xl font-black transition-all duration-500
                  ${isHovered ? 'scale-110 text-indigo-600' : 'scale-100 text-gray-900'}
                `}
              >
                {gbNumber}
              </div>
              <div className="ml-2 text-lg font-medium text-gray-600">GIGAS</div>
              <div className="ml-2 text-sm text-gray-500">por mês</div>
            </div>
            
            {plan.cashback && (
              <div 
                className={`
                  relative transition-all duration-500
                  ${isHovered ? 'scale-105' : 'scale-100'}
                `}
              >
                <span 
                  className={`
                    absolute -left-4 top-1/2 -translate-y-1/2 text-xl font-bold transition-colors duration-300
                    ${isHovered ? 'text-indigo-600' : 'text-green-600'}
                  `}
                >
                  +
                </span>
                <span 
                  className={`
                    py-2 px-3 rounded-lg inline-block font-medium text-sm border transition-all duration-300
                    ${isHovered 
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200' 
                      : 'bg-green-50 text-green-700 border-green-200'
                    }
                  `}
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
              <div className="text-lg text-gray-600">R$</div>
              <div 
                className={`
                  text-5xl font-black transition-colors duration-300
                  ${isHovered ? 'text-indigo-600' : 'text-gray-900'}
                `}
              >
                {Math.floor(plan.price)}
              </div>
              <div className="text-2xl text-gray-900">,{(plan.price % 1).toFixed(2).substring(2)}</div>
              <div className="text-lg ml-1 text-gray-600">/mês</div>
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
                    text-lg transition-colors duration-300
                    ${isHovered ? 'text-indigo-500' : 'text-green-500'}
                  `}
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
                  text-lg transition-colors duration-300
                  ${isHovered ? 'text-indigo-500' : 'text-green-500'}
                `}
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
              transition-all duration-300 transform border-0
              ${isHovered 
                ? 'scale-105 bg-gradient-to-r from-indigo-600 to-purple-600' 
                : 'scale-100 bg-gradient-to-r from-indigo-500 to-purple-500'
              }
              active:scale-95
            `}
            style={{
              boxShadow: isHovered 
                ? '0 10px 25px rgba(99, 102, 241, 0.3)' 
                : '0 6px 20px rgba(99, 102, 241, 0.2)',
            }}
          >
            Recarregue
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
