
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
    <Card className="plan-card-modern relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0 rounded-2xl">
      {/* Purple gradient background with 3D effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900"></div>
      
      {/* 3D geometric pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-lg rotate-45"></div>
      </div>

      <CardContent className="relative z-10 p-6 text-center h-full flex flex-col text-white">
        {/* Header Text */}
        <div className="mb-4">
          <div className="text-lg font-bold text-white/90 mb-1">
            LIBERE SEU INTERNET!
          </div>
          <div className="text-sm text-white/80">
            Por apenas R$ {plan.price.toFixed(2).replace('.', ',')}/mês...
          </div>
        </div>

        {/* Brand Section */}
        <div className="mb-6">
          <div className="text-2xl font-bold text-white mb-2">
            smartvoz | aTivanet
          </div>
        </div>

        {/* Main Data Display */}
        <div className="mb-6">
          <div className="text-6xl font-black text-white mb-2 leading-none drop-shadow-lg">
            {planInfo.gbValue}
            <span className="text-2xl ml-2">{planInfo.unit}</span>
          </div>
        </div>

        {/* Unlimited Apps Badge */}
        <div className="mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
            <span className="text-sm font-bold text-white">
              APLICATIVOS ILIMITADOS
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline justify-center">
            <span className="text-lg font-bold">R$</span>
            <span className="text-5xl font-black mx-1">{Math.floor(plan.price)}</span>
            <span className="text-2xl">,{(plan.price % 1).toFixed(2).slice(2)}</span>
            <span className="text-lg ml-1">/MÊS</span>
          </div>
          <div className="text-sm text-white/80 mt-1">
            LIGAÇÕES ILIMITADAS
          </div>
        </div>

        {/* App Icons */}
        <div className="mb-6 flex justify-center flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <span className="text-xs">Instagram</span>
            <span className="text-red-400 font-bold text-xs">NETFLIX</span>
            <span className="text-xs">📱</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs">📸 TikTok YouTube 📘 Facebook WhatsApp 📱</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex-1 mb-6">
          <ul className="space-y-2 text-sm">
            {filteredFeatures.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-green-300">✓</span>
                <span>{feature}</span>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span className="text-green-300">✓</span>
              <span>Validade: 30 Dias</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-300">✓</span>
              <span>{planInfo.type}</span>
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={handleClick}
          className="w-full py-3 rounded-lg bg-white text-purple-800 hover:bg-gray-100 font-bold text-lg transition-all duration-200 shadow-lg"
        >
          CONTRATAR AGORA
        </Button>
      </CardContent>
    </Card>
  );
}
