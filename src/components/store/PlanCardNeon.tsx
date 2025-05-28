
import React, { useState, useEffect } from "react";
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

interface PlanCardNeonProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

export function PlanCardNeon({ plan, onSelect }: PlanCardNeonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-[280px] h-[500px] perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className={`
          relative w-full h-full overflow-hidden
          bg-black text-white border-2
          transition-all duration-500 ease-out cursor-pointer
          ${isHovered ? 'scale-105 translateY-[-15px]' : 'scale-100 translateY-0'}
        `}
        style={{
          borderColor: isHovered ? '#ff0080' : '#00ffff',
          boxShadow: isHovered 
            ? `
              0 0 30px #ff0080,
              0 0 60px #ff0080,
              0 25px 50px rgba(255, 0, 128, 0.3),
              inset 0 0 20px rgba(255, 0, 128, 0.1)
            `
            : `
              0 0 20px #00ffff,
              0 0 40px #00ffff,
              0 15px 35px rgba(0, 255, 255, 0.2),
              inset 0 0 15px rgba(0, 255, 255, 0.05)
            `,
          background: `
            radial-gradient(circle at 50% 0%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
            linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)
          `,
        }}
      >
        {/* Animated neon lines */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top line */}
          <div 
            className={`
              absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent
              transition-all duration-1000
              ${pulseAnimation ? 'w-full opacity-100' : 'w-0 opacity-60'}
            `}
            style={{
              boxShadow: '0 0 10px #00ffff',
            }}
          />
          
          {/* Right line */}
          <div 
            className={`
              absolute top-0 right-0 w-0.5 bg-gradient-to-b from-transparent via-pink-400 to-transparent
              transition-all duration-1000 delay-300
              ${pulseAnimation ? 'h-full opacity-100' : 'h-0 opacity-60'}
            `}
            style={{
              boxShadow: '0 0 10px #ff0080',
            }}
          />
          
          {/* Bottom line */}
          <div 
            className={`
              absolute bottom-0 right-0 h-0.5 bg-gradient-to-l from-transparent via-cyan-400 to-transparent
              transition-all duration-1000 delay-600
              ${pulseAnimation ? 'w-full opacity-100' : 'w-0 opacity-60'}
            `}
            style={{
              boxShadow: '0 0 10px #00ffff',
            }}
          />
          
          {/* Left line */}
          <div 
            className={`
              absolute bottom-0 left-0 w-0.5 bg-gradient-to-t from-transparent via-pink-400 to-transparent
              transition-all duration-1000 delay-900
              ${pulseAnimation ? 'h-full opacity-100' : 'h-0 opacity-60'}
            `}
            style={{
              boxShadow: '0 0 10px #ff0080',
            }}
          />
        </div>

        {/* Circuit board pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <pattern id="circuit" patternUnits="userSpaceOnUse" width="50" height="50">
              <path d="M10 10h30v30h-30z" stroke="#00ffff" strokeWidth="1" fill="none" opacity="0.3"/>
              <circle cx="25" cy="25" r="3" fill="#ff0080" opacity="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>

        <CardHeader className="pb-2 pt-6 relative z-10">
          <div 
            className="text-sm font-medium mb-2"
            style={{
              color: isHovered ? '#ff0080' : '#00ffff',
              textShadow: `0 0 10px ${isHovered ? '#ff0080' : '#00ffff'}`,
            }}
          >
            Plano 100% digital.<br/>
            Fácil e flexível.<br/>
            Com Gigas que não expiram.
          </div>
          
          <div className="space-y-3">
            <div 
              className="text-lg font-semibold tracking-wide"
              style={{
                color: isHovered ? '#ff0080' : '#00ffff',
                textShadow: `0 0 15px ${isHovered ? '#ff0080' : '#00ffff'}`,
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
                  color: '#ffffff',
                  textShadow: `
                    0 0 20px ${isHovered ? '#ff0080' : '#00ffff'},
                    0 0 40px ${isHovered ? '#ff0080' : '#00ffff'},
                    0 0 60px ${isHovered ? '#ff0080' : '#00ffff'}
                  `,
                }}
              >
                {gbNumber}
              </div>
              <div className="ml-2 text-lg font-medium text-gray-300">GIGAS</div>
              <div className="ml-2 text-sm text-gray-400">por mês</div>
            </div>
            
            {plan.cashback && (
              <div 
                className={`
                  relative transition-all duration-500
                  ${isHovered ? 'scale-105' : 'scale-100'}
                `}
              >
                <span 
                  className="absolute -left-4 top-1/2 -translate-y-1/2 text-xl font-bold"
                  style={{
                    color: isHovered ? '#ff0080' : '#00ffff',
                    textShadow: `0 0 10px ${isHovered ? '#ff0080' : '#00ffff'}`,
                  }}
                >
                  +
                </span>
                <span 
                  className="py-2 px-3 text-white rounded-lg inline-block font-medium text-sm border"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderColor: isHovered ? '#ff0080' : '#00ffff',
                    boxShadow: `
                      0 0 15px ${isHovered ? '#ff0080' : '#00ffff'},
                      inset 0 0 10px rgba(${isHovered ? '255, 0, 128' : '0, 255, 255'}, 0.1)
                    `,
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
              <div className="text-lg text-gray-300">R$</div>
              <div 
                className="text-5xl font-black text-white"
                style={{
                  textShadow: `0 0 20px ${isHovered ? '#ff0080' : '#00ffff'}`,
                }}
              >
                {Math.floor(plan.price)}
              </div>
              <div className="text-2xl text-white">,{(plan.price % 1).toFixed(2).substring(2)}</div>
              <div className="text-lg ml-1 text-gray-300">/mês</div>
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
                  className="text-lg font-bold"
                  style={{
                    color: isHovered ? '#ff0080' : '#00ff00',
                    textShadow: `0 0 8px ${isHovered ? '#ff0080' : '#00ff00'}`,
                  }}
                >
                  ✓
                </span>
                <span className="text-sm font-medium text-gray-200">{feature}</span>
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
                className="text-lg font-bold"
                style={{
                  color: isHovered ? '#ff0080' : '#00ff00',
                  textShadow: `0 0 8px ${isHovered ? '#ff0080' : '#00ff00'}`,
                }}
              >
                ✓
              </span>
              <span className="text-sm font-medium text-gray-200">Validade: 30 Dias</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 relative z-10">
          <button
            onClick={handleClick}
            className={`
              w-full py-3 rounded-xl font-semibold text-white
              transition-all duration-300 transform border-2
              ${isHovered 
                ? 'scale-105 shadow-2xl' 
                : 'scale-100 shadow-lg hover:shadow-xl'
              }
              active:scale-95
            `}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderColor: isHovered ? '#ff0080' : '#00ffff',
              boxShadow: `
                0 0 20px ${isHovered ? '#ff0080' : '#00ffff'},
                0 10px 25px rgba(${isHovered ? '255, 0, 128' : '0, 255, 255'}, 0.3),
                inset 0 0 15px rgba(${isHovered ? '255, 0, 128' : '0, 255, 255'}, 0.1)
              `,
              textShadow: `0 0 10px ${isHovered ? '#ff0080' : '#00ffff'}`,
            }}
          >
            Recarregue
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
