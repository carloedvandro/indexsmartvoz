
import React from "react";
import { PlanCard } from "./PlanCard";

const STACK_PLANS = [
  {
    id: "smartvoz-80",
    name: "SMARTVOZ",
    gb: "80GB",
    price: 84.99,
    features: [
      "Smartvoz 80GB",
      "Minutos: Ilimitados",
      "Chip eSIM ou Sim Card Fisico",
      "Escolha seu DDD"
    ],
    cashback: 30.00,
    offerType: "Oferta Basic"
  },
  {
    id: "smartvoz-100",
    name: "SMARTVOZ", 
    gb: "100GB",
    price: 104.99,
    features: [
      "Smartvoz 100GB",
      "Minutos: Ilimitados",
      "Chip eSIM ou Sim Card Fisico",
      "Escolha seu DDD"
    ],
    cashback: 40.00,
    offerType: "Oferta Prime"
  },
  {
    id: "smartvoz-120",
    name: "SMARTVOZ",
    gb: "120GB", 
    price: 124.99,
    features: [
      "Smartvoz 120GB",
      "Minutos: Ilimitados",
      "Chip eSIM ou Sim Card Fisico",
      "Escolha seu DDD"
    ],
    cashback: 50.00,
    offerType: "Oferta Premium",
    isHighlighted: true
  }
];

interface PlanCardsStackProps {
  onSelectPlan: (plan: any) => void;
}

export function PlanCardsStack({ onSelectPlan }: PlanCardsStackProps) {
  return (
    <div className="relative flex justify-center items-center min-h-[400px] perspective-1000">
      <div className="relative w-[320px] h-[450px]">
        {STACK_PLANS.map((plan, index) => (
          <div
            key={plan.id}
            className="absolute inset-0 transition-all duration-300 hover:z-30"
            style={{
              transform: `
                translateZ(${-index * 12}px) 
                translateY(${index * 8}px)
                rotateY(${index * 2}deg)
              `,
              zIndex: STACK_PLANS.length - index,
            }}
          >
            <PlanCard 
              plan={plan} 
              onSelect={onSelectPlan}
              className="shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
