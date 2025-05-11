
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
    !feature.includes("Frete Grátis")
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

          <div className="mt-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.3-.1-.5-.1-.7.1-.2.2-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5 0-.2-.7-1.5-.9-2.1-.2-.6-.5-.5-.6-.5h-.6c-.2 0-.5.1-.8.3-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"/>
              </svg>
              <span className="text-green-500">WhatsApp Grátis</span>
            </div>
            
            {plan.id === "gold" || plan.id === "plus" ? (
              <>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-green-500 ml-4">Skeelo Grátis</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-green-500 ml-4">Waze Grátis</span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2 pt-4 pb-6">
        <div className="text-center w-full">
          {plan.originalPrice && (
            <div className="text-gray-400 line-through text-sm">
              R$ {plan.originalPrice.toFixed(2).replace('.', ',')}
            </div>
          )}
          <div className="font-bold text-3xl mt-1">
            R$ <span className="text-4xl">{plan.price.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
