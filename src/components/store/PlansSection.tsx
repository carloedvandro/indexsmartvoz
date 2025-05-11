
import React from "react";
import { PlanCard } from "./PlanCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    id: "basic",
    name: "BASIC",
    gb: "7GB",
    price: 29.70,
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
    name: "START",
    gb: "13GB",
    price: 39.70,
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
    name: "GOLD",
    gb: "21GB",
    price: 49.70,
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
    name: "PLUS",
    gb: "44GB",
    price: 69.70,
    features: [
      "40 Gb de internet",
      "2 Gb de recorrência",
      "Minutos: Ilimitados",
      "Chip eSIM ou Fisico Card",
      "Escolha seu DDD"
    ]
  },
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
    <div className="py-8 bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-8">Nossos Planos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto px-4">
        {PLANS.map((plan) => (
          <div key={plan.id} className="flex flex-col items-center">
            <div className="w-full max-w-xs">
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                onSelect={handleSelectPlan} 
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <button 
          onClick={() => handleSelectPlan(PLANS.find(p => p.isHighlighted) || PLANS[1])}
          className="rounded-full bg-green-500 hover:bg-green-600 text-white px-16 py-6 text-xl font-bold transition-colors"
        >
          Clique para Adquirir !!
        </button>
      </div>
    </div>
  );
}
