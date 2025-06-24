
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

interface PlanCardModernProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

export function PlanCardModern({ plan, onSelect }: PlanCardModernProps) {
  // Filter out unwanted features
  const filteredFeatures = plan.features.filter(feature => 
    !feature.includes("Portabilidade:") && 
    !feature.includes("portabilidade") &&
    !feature.includes("Frete Grátis") &&
    !feature.includes("WhatsApp Grátis") &&
    !feature.includes("Skeelo") &&
    !feature.includes("Waze")
  );

  // Get plan type and GB value
  const getPlanInfo = (gb: string) => {
    const value = parseInt(gb);
    if (value <= 80) return { type: "Plano Basic", gbValue: "80", unit: "GB" };
    if (value <= 100) return { type: "Plano Prime", gbValue: "100", unit: "GB" };
    if (value <= 120) return { type: "Plano Premium", gbValue: "120", unit: "GB" };
    if (value <= 140) return { type: "Plano Gold", gbValue: "140", unit: "GB" };
    return { type: "Plano Master", gbValue: "2", unit: "TERA" };
  };

  const planInfo = getPlanInfo(plan.gb);
  
  const handleClick = () => {
    onSelect(plan);
  };
  
  return (
    <div className="perspective-1000 plan-card-3d-container">
      <Card className="plan-card-3d relative overflow-hidden transition-all duration-500 hover:scale-105 hover:rotate-y-12 border-0 rounded-2xl w-80 h-[600px] preserve-3d card-3d-hover">
        {/* Animated gradient background with 3D depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 animated-gradient-border"></div>
        
        {/* 3D layered geometric patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-xl transform rotate-45 translateZ-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/15 rounded-full blur-lg transform -rotate-12 translateZ-5"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/10 rounded-lg rotate-45 circuit-flow"></div>
          {/* Hexagonal pattern overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l20 15v20L30 55 10 40V20z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Neon border effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-60 blur-sm"></div>
        <div className="absolute inset-[2px] rounded-2xl bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900"></div>

        <CardContent className="relative z-10 p-6 text-center h-full flex flex-col text-white preserve-3d">
          {/* Floating header with 3D text */}
          <div className="mb-4 float-animation">
            <div className="text-lg font-bold text-white/90 mb-1 neon-pulse transform translateZ-20">
              LIBERE SEU INTERNET!
            </div>
            <div className="text-sm text-white/80 transform translateZ-10">
              Por apenas R$ {plan.price.toFixed(2).replace('.', ',')}/mês...
            </div>
          </div>

          {/* 3D Brand Section */}
          <div className="mb-6 transform translateZ-15">
            <div className="text-2xl font-bold text-white mb-2 neon-pulse">
              smartvoz | aTivanet
            </div>
          </div>

          {/* Main Data Display with 3D effect */}
          <div className="mb-6 transform translateZ-30">
            <div className="text-6xl font-black text-white mb-2 leading-none drop-shadow-2xl neon-pulse transform hover:scale-110 transition-all duration-300">
              {planInfo.gbValue}
              <span className="text-2xl ml-2 opacity-90">{planInfo.unit}</span>
            </div>
          </div>

          {/* Floating badge with glassmorphism */}
          <div className="mb-6 transform translateZ-20">
            <div className="bg-white/20 backdrop-blur-xl rounded-full px-6 py-3 border border-white/40 shadow-2xl hover:bg-white/30 transition-all duration-300">
              <span className="text-sm font-bold text-white neon-pulse">
                APLICATIVOS ILIMITADOS
              </span>
            </div>
          </div>

          {/* 3D Price display */}
          <div className="mb-6 transform translateZ-25">
            <div className="flex items-baseline justify-center">
              <span className="text-lg font-bold">R$</span>
              <span className="text-5xl font-black mx-1 neon-pulse">{Math.floor(plan.price)}</span>
              <span className="text-2xl">,{(plan.price % 1).toFixed(2).slice(2)}</span>
              <span className="text-lg ml-1">/MÊS</span>
            </div>
            <div className="text-sm text-white/80 mt-1">
              LIGAÇÕES ILIMITADAS
            </div>
          </div>

          {/* Floating app icons with 3D effect */}
          <div className="mb-6 flex justify-center flex-wrap gap-2 transform translateZ-15">
            <div className="flex items-center gap-1 hover:scale-110 transition-transform duration-200">
              <span className="text-xs backdrop-blur-sm bg-white/10 px-2 py-1 rounded">Instagram</span>
              <span className="text-red-400 font-bold text-xs backdrop-blur-sm bg-white/10 px-2 py-1 rounded">NETFLIX</span>
            </div>
            <div className="flex items-center gap-1 mt-1 hover:scale-110 transition-transform duration-200">
              <span className="text-xs backdrop-blur-sm bg-white/10 px-2 py-1 rounded">📸 TikTok YouTube 📘 Facebook WhatsApp 📱</span>
            </div>
          </div>

          {/* Features with depth */}
          <div className="flex-1 mb-6 transform translateZ-10">
            <ul className="space-y-2 text-sm">
              {filteredFeatures.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center gap-2 hover:translateX-2 transition-transform duration-200">
                  <span className="text-green-300 neon-pulse">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
              <li className="flex items-center gap-2 hover:translateX-2 transition-transform duration-200">
                <span className="text-green-300 neon-pulse">✓</span>
                <span>Validade: 30 Dias</span>
              </li>
              <li className="flex items-center gap-2 hover:translateX-2 transition-transform duration-200">
                <span className="text-green-300 neon-pulse">✓</span>
                <span>{planInfo.type}</span>
              </li>
            </ul>
          </div>

          {/* 3D CTA Button */}
          <Button 
            onClick={handleClick}
            className="w-full py-3 rounded-lg bg-white text-purple-800 hover:bg-gray-100 font-bold text-lg transition-all duration-300 shadow-2xl hover:translateY-[-5px] hover:shadow-white/20 transform translateZ-20"
          >
            CONTRATAR AGORA
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
