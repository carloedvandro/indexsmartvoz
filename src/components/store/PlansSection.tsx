
import React from "react";
import { PlanCard } from "./PlanCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

const PLANS = [
  {
    id: "smartvoz-100",
    name: "SMARTVOZ",
    gb: "100GB",
    price: 119.99,
    features: [
      "Smartvoz 100GB",
      "Minutos: Ilimitados",
      "Chip eSIM ou Fisico Card",
      "Escolha seu DDD"
    ]
  },
  {
    id: "smartvoz-120",
    name: "SMARTVOZ",
    gb: "120GB",
    price: 129.99,
    features: [
      "Smartvoz 120GB",
      "Minutos: Ilimitados",
      "Chip eSIM ou Fisico Card",
      "Escolha seu DDD"
    ]
  },
  {
    id: "smartvoz-140",
    name: "SMARTVOZ",
    gb: "140GB",
    price: 139.99,
    features: [
      "Smartvoz 140GB",
      "Minutos: Ilimitados",
      "Chip eSIM ou Fisico Card",
      "Escolha seu DDD"
    ],
    isHighlighted: true
  },
  {
    id: "smartvoz-160",
    name: "SMARTVOZ",
    gb: "160GB",
    price: 159.99,
    features: [
      "Smartvoz 160GB",
      "Minutos: Ilimitados",
      "Chip eSIM ou Fisico Card",
      "Escolha seu DDD"
    ]
  },
];

// Reordering the plans for display while keeping the original data intact for other functions
const DISPLAY_ORDER_PLANS = [
  PLANS[0], // SMARTVOZ 100GB
  PLANS[1], // SMARTVOZ 120GB
  PLANS[2], // SMARTVOZ 140GB 
  PLANS[3], // SMARTVOZ 160GB
];

interface PlansSectionProps {
  storeOwnerCustomId?: string;
}

export function PlansSection({ storeOwnerCustomId }: PlansSectionProps) {
  const navigate = useNavigate();

  const handleSelectPlan = (plan: any) => {
    if (storeOwnerCustomId) {
      navigate(`/client/register?sponsor=${storeOwnerCustomId}&plan=${plan.id}`);
    } else {
      navigate(`/client/register?plan=${plan.id}`);
    }
  };

  return (
    <div className="py-8 rounded-xl">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
          Conecte-se ao Futuro
        </h1>
        <p className="text-gray-700 mt-2 mx-auto max-w-3xl px-4">
          Escolha o plano ideal para suas necessidades com a melhor relação custo-benefício do mercado digital
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 mx-auto px-4">
        {PLANS.map((plan) => (
          <div key={plan.id} className="flex justify-center">
            <PlanCard 
              plan={plan} 
              onSelect={handleSelectPlan} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
