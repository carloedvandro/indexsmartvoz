
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

  const bgColor = plan.isHighlighted ? 'bg-black' : 'bg-gray-800';
  
  return (
    <Card className={`h-full flex flex-col overflow-hidden transition-all w-full rounded-3xl relative ${bgColor} text-white`}>
      {/* Promotion ribbon */}
      <div className="absolute top-0 right-0">
        <div className="bg-green-500 text-white py-1 px-6 rotate-45 translate-x-6 translate-y-3 shadow-md">
          Promoção
        </div>
      </div>

      <CardHeader className="pb-2 text-center">
        <h3 className="font-bold text-xl">- {plan.name} -</h3>
        <div className="mt-6 mb-4">
          <div className="text-green-500 font-bold text-6xl">{plan.gb}</div>
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
      </CardFooter>
    </Card>
  );
}
