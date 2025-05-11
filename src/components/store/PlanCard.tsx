
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

  return (
    <Card className={`h-full flex flex-col overflow-hidden transition-all ${
      plan.isHighlighted ? 'border-2 border-green-500 shadow-lg' : 'border border-gray-200'
    }`}>
      <CardHeader className="pb-2">
        <h3 className="text-center font-bold text-xl">{plan.name}</h3>
        <div className="text-center">
          <div className="text-green-500 font-bold text-5xl mb-2">{plan.gb}</div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-1">
          {filteredFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-100 py-2 px-3 rounded text-sm text-center border-l-4 border-green-500"
            >
              {feature}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 pt-4">
        <div className="text-center w-full">
          {plan.originalPrice && (
            <div className="text-gray-500 line-through text-sm">
              De {formatCurrency(plan.originalPrice)}
            </div>
          )}
          <div className="font-bold text-xl">
            Por {formatCurrency(plan.price)}
          </div>
        </div>
        <Button 
          className="w-full bg-green-500 hover:bg-green-600"
          onClick={() => onSelect(plan)}
        >
          Comprar
        </Button>
      </CardFooter>
    </Card>
  );
}
