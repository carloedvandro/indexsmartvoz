
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
    if (value <= 100) return "Economy Package";
    if (value <= 120) return "Standard Package";
    if (value <= 140) return "Premium Package";
    return "Ultimate Package";
  };

  const planType = getPlanType(plan.gb);
  
  // Calculate appropriate colors based on plan type
  const getBgColor = () => {
    if (plan.gb === "100GB") return "bg-gradient-to-b from-purple-600 to-purple-800";
    if (plan.gb === "120GB") return "bg-gradient-to-b from-pink-500 to-pink-700";
    if (plan.gb === "140GB") return "bg-gradient-to-b from-purple-700 to-purple-900";
    return "bg-gradient-to-b from-purple-800 to-purple-950";
  };
  
  return (
    <Card className={`plan-card flex flex-col overflow-hidden transition-all shadow-lg ${getBgColor()} text-white rounded-xl`}>
      <CardHeader className="pb-1 pt-4 flex flex-col items-center justify-center text-center border-b border-white/10">
        <div className="text-sm font-medium opacity-90">{planType}</div>
        <div className="mt-2 mb-1 flex justify-center items-baseline w-full">
          <span className="text-3xl font-bold mr-1">R$</span>
          <span className="text-4xl font-bold">{plan.price.toFixed(2).split('.')[0]}</span>
          <span className="text-xl">,{plan.price.toFixed(2).split('.')[1]}</span>
          <span className="text-sm ml-1 opacity-80">/month</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-4 pt-4">
        <div className="flex items-center justify-center mb-3">
          <div className="text-xl font-bold text-center">
            {plan.gb}
            <span className="ml-1 opacity-80 text-base">Internet</span>
          </div>
        </div>
        
        <div className="space-y-2.5">
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
          
          <div className="flex items-center gap-2">
            <span className="text-green-300">✓</span>
            <span className="text-sm">Conexão estável</span>
          </div>
          
          {parseInt(plan.gb) >= 140 && (
            <div className="flex items-center gap-2">
              <span className="text-green-300">✓</span>
              <span className="text-sm">Suporte prioritário</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2 pt-0 pb-4 px-4">
        <Button
          onClick={() => onSelect(plan)}
          className="w-full bg-white hover:bg-gray-100 text-purple-800 font-medium"
        >
          Selecionar
        </Button>
      </CardFooter>
    </Card>
  );
}
