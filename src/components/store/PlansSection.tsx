
import React from "react";
import { PlanCard } from "./PlanCard";
import { useNavigate } from "react-router-dom";

const PLANS = [
  {
    id: "basic",
    name: "BASIC",
    gb: "7GB",
    originalPrice: 44.90,
    price: 29.70,
    features: [
      "Minutos: Ilimitados",
      "Internet: 5GB",
      "Recorrência: 1GB",
      "WhatsApp Grátis",
      "Chip eSIM ou Fisico Card",
      "Escolha seu DDD"
    ]
  },
  {
    id: "start",
    name: "START",
    gb: "13GB",
    originalPrice: 54.90,
    price: 39.70,
    features: [
      "Minutos: Ilimitados",
      "Internet: 9GB",
      "Recorrência: 2GB",
      "WhatsApp Grátis",
      "Chip eSIM ou Fisico Card",
      "Escolha seu DDD"
    ],
    isHighlighted: true
  },
  {
    id: "gold",
    name: "GOLD",
    gb: "21GB",
    originalPrice: 64.90,
    price: 49.70,
    features: [
      "Minutos: Ilimitados",
      "Internet: 19GB",
      "Recorrência: 1GB",
      "WhatsApp Grátis, Skeelo, Waze Grátis",
      "Chip eSIM ou Fisico Card",
      "Escolha seu DDD"
    ]
  },
  {
    id: "plus",
    name: "PLUS",
    gb: "44GB",
    originalPrice: 99.70,
    price: 69.70,
    features: [
      "Minutos: Ilimitados",
      "Internet: 40GB",
      "Recorrência: 2GB",
      "WhatsApp Grátis, Skeelo, Waze Grátis",
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
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Nossos Planos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
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
