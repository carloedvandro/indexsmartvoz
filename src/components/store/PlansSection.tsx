
import React from "react";
import { PlanCard } from "./PlanCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";

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
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-2">
          Planos de Internet
        </h2>
        <p className="text-gray-600 mt-2 mx-auto max-w-3xl px-4">
          Alta velocidade e estabilidade para todas as suas necessidades com os melhores preços do mercado
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-8 rounded-xl">
        <div className="flex flex-wrap justify-center gap-6 mx-auto px-4 max-w-7xl">
          {PLANS.map((plan) => (
            <div key={plan.id} className="flex justify-center">
              <PlanCard 
                plan={plan} 
                onSelect={handleSelectPlan} 
              />
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">Internet de alta qualidade sem contratos longos</p>
          <div className="flex justify-center gap-4 flex-wrap px-4">
            <div className="bg-white px-4 py-2 rounded-md shadow-sm flex items-center gap-2">
              <span className="text-purple-700 font-medium">Sem taxas ocultas</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-md shadow-sm flex items-center gap-2">
              <span className="text-purple-700 font-medium">Conexão estável</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-md shadow-sm flex items-center gap-2">
              <span className="text-purple-700 font-medium">Serviço completo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
