
import React from "react";
import { Smartphone, Wifi, Package, Zap } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

interface Plan {
  id: string;
  name: string;
  gb: string;
  price: number;
  features: string[];
  cashback?: number;
  isHighlighted?: boolean;
}

interface PlansOrbitalProps {
  plans: Plan[];
  onSelectPlan: (plan: Plan) => void;
}

export function PlansOrbital({ plans, onSelectPlan }: PlansOrbitalProps) {
  // Converter os planos para o formato do RadialOrbitalTimeline
  const timelineData = plans.map((plan, index) => ({
    id: index + 1,
    title: `Oferta ${plan.gb === "80GB" ? "Basic" : plan.gb === "100GB" ? "Prime" : plan.gb === "120GB" ? "Premium" : "Gold"}`,
    date: `R$ ${plan.price.toFixed(2)}`,
    content: `${plan.gb} - ${plan.features.join(", ")}${plan.cashback ? ` + R$${plan.cashback.toFixed(2)} Cashback` : ""}`,
    category: "plano",
    icon: plan.gb === "80GB" ? Package : plan.gb === "100GB" ? Wifi : plan.gb === "120GB" ? Smartphone : Zap,
    relatedIds: index > 0 ? [index] : index < plans.length - 1 ? [index + 2] : [],
    status: plan.isHighlighted ? "in-progress" as const : "completed" as const,
    energy: parseInt(plan.gb) || 80,
  }));

  return (
    <div className="w-full relative">
      {/* Botão movido para cima da área preta */}
      <div className="flex justify-center mb-4">
        <button 
          className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm border border-white/20"
          onClick={() => {
            // Selecionar o primeiro plano como exemplo
            if (plans.length > 0) {
              onSelectPlan(plans[0]);
            }
          }}
        >
          COMPLETE
        </button>
      </div>

      <div className="h-[600px] relative">
        <RadialOrbitalTimeline timelineData={timelineData} />
        
        {/* Overlay com informações dos planos */}
        <div className="absolute top-4 left-4 text-white z-50">
          <h3 className="text-xl font-bold mb-2">Nossos Planos</h3>
          <p className="text-sm opacity-80">Clique nos planos para ver detalhes</p>
        </div>
      </div>
    </div>
  );
}
