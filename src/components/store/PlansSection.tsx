
import React from "react";
import { PlanCard } from "./PlanCard";
import { useNavigate } from "react-router-dom";

const PLANS = [
  {
    id: "teste-tegg",
    name: "Teste a Tegg",
    gb: "2GB",
    originalPrice: 29.90,
    price: 9.99,
  },
  {
    id: "basic",
    name: "BASIC",
    gb: "7GB",
    originalPrice: 44.90,
    price: 29.70,
  },
  {
    id: "start",
    name: "START",
    gb: "13GB",
    originalPrice: 54.90,
    price: 39.70,
  },
  {
    id: "gold",
    name: "GOLD",
    gb: "21GB",
    originalPrice: 64.90,
    price: 49.70,
    isHighlighted: true,
  },
  {
    id: "plus",
    name: "PLUS",
    gb: "44GB",
    originalPrice: 99.70,
    price: 69.70,
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
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Nossos Planos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {PLANS.map((plan) => (
          <PlanCard 
            key={plan.id} 
            plan={plan} 
            onSelect={handleSelectPlan} 
          />
        ))}
      </div>
    </div>
  );
}
