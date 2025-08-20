
import React, { useState } from "react";
import { PlanCard } from "./PlanCard";
import { PlansOrbital } from "./PlansOrbital";
import { useNavigate } from "react-router-dom";
import { PlanCarousel } from "./PlanCarousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePlans } from "@/hooks/usePlans";
import { Skeleton } from "@/components/ui/skeleton";
import { usePlanSelection } from "@/contexts/PlanSelectionContext";

interface PlansSectionProps {
  storeOwnerCustomId?: string;
  onSelectPlan?: (plan: any) => void;
}

export function PlansSection({
  storeOwnerCustomId,
  onSelectPlan
}: PlansSectionProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<"cards" | "orbital">("cards");
  const { data: plansData, isLoading, error } = usePlans();
  const { setSelectedPlan } = usePlanSelection();

  // Transform database plans to component format
  const transformedPlans = plansData?.map(plan => {
    // Extract GB from title (e.g., "Plano Basic 80GB" -> "80GB")
    const gbMatch = plan.title.match(/(\d+)GB/);
    const gb = gbMatch ? `${gbMatch[1]}GB` : "0GB";
    
    // Use benefits from database
    const features = plan.benefits && plan.benefits.length > 0 
      ? plan.benefits
          .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
          .map(benefit => benefit.benefit_title)
      : [
          "Minutos: Ilimitados", 
          "Chip eSIM ou Sim Card Físico",
          "Escolha seu DDD",
          "Validade: 30 Dias"
        ];

    return {
      id: plan.id,
      name: plan.title,
      gb: gb,
      price: plan.value,
      features: features
    };
  }) || [];

  const handleSelectPlan = (plan: any) => {
    if (onSelectPlan) {
      // If onSelectPlan is provided, use it (for other contexts)
      onSelectPlan(plan);
    } else {
      // Save selected plan to context
      setSelectedPlan(plan);
      
      if (storeOwnerCustomId) {
        // If there's a sponsor, go to configuration with sponsor info
        navigate(`/client/plan-configuration?sponsor=${storeOwnerCustomId}`);
      } else {
        // Go to plan configuration
        navigate("/client/plan-configuration");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Escolha seu plano</h2>
          <p className="text-gray-600">Selecione o plano perfeito para suas necessidades</p>
        </div>
        <div className="flex gap-4 justify-center">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-80 w-72" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !transformedPlans.length) {
    return (
      <div className="w-full text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ops!</h2>
        <p className="text-gray-600">Não foi possível carregar os planos. Tente novamente.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <PlanCarousel 
        plans={transformedPlans} 
        onSelectPlan={handleSelectPlan}
        isMobile={isMobile}
      />
    </div>
  );
}
