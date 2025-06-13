
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format";
import { Wifi, WifiHigh } from "lucide-react";

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

interface PlanCardProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

export function PlanCard({ plan, onSelect }: PlanCardProps) {
  // Filter out the features we want to remove
  const filteredFeatures = plan.features.filter(feature => 
    !feature.includes("Portabilidade:") && 
    !feature.includes("portabilidade") &&
    !feature.includes("Frete Grátis") &&
    !feature.includes("WhatsApp Grátis") &&
    !feature.includes("Skeelo") &&
    !feature.includes("Waze")
  );

  // Get plan type based on data size for display
  const getPlanType = (gb: string) => {
    const value = parseInt(gb);
    if (value <= 80) return "Oferta Basic";
    if (value <= 100) return "Oferta Prime";
    if (value <= 120) return "Oferta Premium";
    if (value <= 140) return "Oferta Gold";
    return "Oferta Master";
  };

  const planType = getPlanType(plan.gb);
  
  // Calculate appropriate colors based on plan type
  const getBgColor = () => {
    if (plan.gb === "100GB") return "bg-gradient-to-r from-pink-500 to-pink-400";
    if (plan.gb === "120GB") return "bg-gradient-to-r from-purple-500 to-pink-500";
    if (plan.gb === "140GB") return "bg-gradient-to-r from-fuchsia-600 to-pink-600";
    return "bg-gradient-to-r from-fuchsia-700 to-pink-500";
  };

  // Extract the GB number without the "GB" suffix for display
  const gbNumber = plan.gb.replace("GB", "");
  
  const handleClick = () => {
    onSelect(plan);
  };
  
  return (
    <Card className={`plan-card flex flex-col overflow-hidden transition-all shadow-lg ${getBgColor()} text-white rounded-xl`}>
      <CardHeader className="pb-1 pt-4 flex flex-col items-start justify-start text-left border-b border-white/10">
        <div className="text-sm font-medium opacity-90">
          Plano 100% digital.<br/>
          Fácil e flexível.<br/>
          Com Gigas que não expiram.
        </div>
        <div className="mt-2 mb-1">
          <div className="text-lg font-semibold">{planType}</div>
          <div className="flex items-baseline">
            <div className="text-5xl font-bold">{gbNumber}</div>
            <div className="ml-1 text-lg">GIGAS</div>
            <div className="ml-2 text-sm opacity-90">por mês</div>
          </div>
          <div className="flex items-baseline mt-2">
            <div className="text-sm">R$</div>
            <div className="text-4xl font-bold">{Math.floor(plan.price)}</div>
            <div className="text-xl">,{(plan.price % 1).toFixed(2).substring(2)}</div>
            <div className="text-sm ml-1">/mês</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-4 pt-4">
        <div className="space-y-2">
          {filteredFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-green-300">✓</span>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
          
          <div className="flex items-center gap-2">
            <span className="text-green-300">✓</span>
            <span className="text-sm">Validade: 30 Dias</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2 pt-0 pb-4 px-4">
        <button
          onClick={handleClick}
          className="w-full py-2.5 rounded-md bg-pink-600 hover:bg-pink-700 text-white font-medium transition-all"
        >
          COMPLETE
        </button>
      </CardFooter>
    </Card>
  );
}
