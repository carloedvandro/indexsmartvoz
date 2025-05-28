
import React from "react";
import { PlanCard } from "./PlanCard";
import { PlanCard3D } from "./PlanCard3D";
import { PlanCardGlass } from "./PlanCardGlass";
import { PlanCardNeon } from "./PlanCardNeon";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";

const PLANS = [
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
    cashback: 30.00
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
    cashback: 40.00
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
    isHighlighted: true,
    cashback: 50.00
  },
  {
    id: "smartvoz-140",
    name: "SMARTVOZ",
    gb: "140GB",
    price: 144.99,
    features: [
      "Smartvoz 140GB",
      "Minutos: Ilimitados",
      "Chip eSIM ou Sim Card Fisico",
      "Escolha seu DDD"
    ],
    cashback: 60.00
  },
];

interface PlansSectionProps {
  storeOwnerCustomId?: string;
}

export function PlansSection({ storeOwnerCustomId }: PlansSectionProps) {
  const navigate = useNavigate();

  const handleSelectPlan = (plan: any) => {
    // Navigate directly to the products page with the plan selected
    if (storeOwnerCustomId) {
      navigate(`/client/products?sponsor=${storeOwnerCustomId}&plan=${plan.id}`);
    } else {
      navigate(`/client/products?plan=${plan.id}`);
    }
  };

  return (
    <div className="py-8 rounded-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-2">
          Conecte-se ao Futuro
        </h2>
        <p className="text-gray-600 mt-2 mx-auto max-w-3xl px-4">
          Escolha o plano ideal para suas necessidades com a melhor relação custo-benefício do mercado digital
        </p>
      </div>
      
      <div className="py-8 rounded-xl">
        {/* Modelos 3D dos cartões */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Modelos 3D Interativos</h3>
          <div className="flex flex-wrap justify-center gap-8 mx-auto px-4 max-w-7xl">
            {PLANS.slice(0, 3).map((plan, index) => (
              <div key={plan.id} className="flex justify-center">
                {index === 0 && <PlanCard3D plan={plan} onSelect={handleSelectPlan} />}
                {index === 1 && <PlanCardGlass plan={plan} onSelect={handleSelectPlan} />}
                {index === 2 && <PlanCardNeon plan={plan} onSelect={handleSelectPlan} />}
              </div>
            ))}
          </div>
        </div>

        {/* Cartões originais */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Todos os Planos</h3>
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
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">Internet de alta qualidade sem contratos longos</p>
          <div className="flex justify-center gap-4 flex-wrap px-4">
            <div className="bg-white px-4 py-2 rounded-md shadow-sm flex items-center gap-2">
              <span className="text-pink-600 font-medium">Sem taxas ocultas</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-md shadow-sm flex items-center gap-2">
              <span className="text-pink-600 font-medium">Serviço completo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
