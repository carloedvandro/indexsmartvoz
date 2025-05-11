
import React from "react";
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

  // Usar a cor #660099 para o fundo de todos os planos
  const bgColor = plan.isHighlighted ? 'bg-[#660099]' : 'bg-[#660099]';
  
  return (
    <Card className={`h-full flex flex-col overflow-hidden transition-all w-full max-w-[300px] mx-auto rounded-3xl relative ${bgColor} text-white`}>
      <CardHeader className="pb-2 flex flex-col items-center justify-center text-center">
        <h3 className="font-bold text-xl text-center">- {plan.name} -</h3>
        <div className="mt-6 mb-4 flex justify-center items-center w-full">
          <div className="text-[#10FE00] font-bold text-6xl">{plan.gb}</div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow px-6">
        <div className="space-y-3">
          {filteredFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-green-500 text-lg">•</span>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-green-500 text-lg">•</span>
            <span className="text-sm">Validade: 30 Dias</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2 pt-4 pb-6">
        <div className="text-center w-full">
          <div className="font-bold text-3xl mt-1">
            R$ <span className="text-4xl">{plan.price.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
        <Button
          onClick={() => onSelect(plan)}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          Selecionar
        </Button>
      </CardFooter>
    </Card>
  );
}
