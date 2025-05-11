
import React from "react";
import { PlanCard } from "./PlanCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

const PLANS = [
  {
    id: "basic",
    name: "Smartvoz 100GB",
    gb: "100GB",
    price: 104.99,
    features: [
      "5 Gb de internet",
      "1 Gb de recorrência",
      "Minutos: Ilimitados",
      "Chip eSIM ou Fisico Card",
      "Escolha seu DDD"
    ]
  },
  {
    id: "start",
    name: "Smartvoz 120GB",
    gb: "120GB",
    price: 114.99,
    features: [
      "9 Gb de internet",
      "2 Gb de recorrência",
      "Minutos: Ilimitados",
      "Chip eSIM ou Fisico Card",
      "Escolha seu DDD"
    ],
    isHighlighted: true
  },
  {
    id: "gold",
    name: "Smartvoz 140GB",
    gb: "140GB",
    price: 124.99,
    features: [
      "19 Gb de internet",
      "2 Gb de recorrência",
      "Minutos: Ilimitados",
      "Chip eSIM ou Fisico Card",
      "Escolha seu DDD"
    ]
  },
  {
    id: "plus",
    name: "Smartvoz 160GB",
    gb: "160GB",
    price: 154.99,
    features: [
      "40 Gb de internet",
      "2 Gb de recorrência",
      "Minutos: Ilimitados",
      "Chip eSIM ou Fisico Card",
      "Escolha seu DDD"
    ]
  },
];

// Reordering the plans for display while keeping the original data intact for other functions
const DISPLAY_ORDER_PLANS = [
  PLANS[0], // BASIC
  PLANS[1], // START
  PLANS[2], // GOLD
  PLANS[3], // PLUS
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
