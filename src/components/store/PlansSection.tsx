
import React, { useState } from "react";
import { PlanCard } from "./PlanCard";
import { PlansOrbital } from "./PlansOrbital";
import { useNavigate } from "react-router-dom";
import { PlanCarousel } from "./PlanCarousel";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePlans } from "@/hooks/usePlans";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [viewMode, setViewMode] = useState<"cards" | "orbital" | "circular">("circular");
  const { data: plansData, isLoading, error } = usePlans();

  // Transform database plans to component format
  const transformedPlans = plansData?.map(plan => {
    // Extract GB from title (e.g., "Plano Basic 80GB" -> "80GB")
    const gbMatch = plan.title.match(/(\d+)GB/);
    const gb = gbMatch ? `${gbMatch[1]}GB` : "0GB";
    
    // Use actual benefits from database if available, otherwise fallback
    const defaultFeatures = [
      `${plan.title}`,
      "Minutos: Ilimitados", 
      "Chip eSIM ou Sim Card Fisico",
      "Escolha seu DDD",
      "Validade: 30 Dias"
    ];

    return {
      id: plan.id,
      name: plan.title,
      gb: gb,
      price: plan.value,
      features: plan.benefits && plan.benefits.length > 0 
        ? plan.benefits
            .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
            .map(benefit => benefit.benefit_title)
        : defaultFeatures
    };
  }) || [];

  // Transform plans to testimonials format for CircularTestimonials
  const planTestimonials = transformedPlans.map(plan => {
    // Create plan image based on GB for visual differentiation
    const getPlanImage = (gb: string) => {
      const value = parseInt(gb);
      if (value <= 80) return "/lovable-uploads/112826e5-7b98-48dd-b244-bc9956cdea17.png";
      if (value <= 100) return "/lovable-uploads/112826e5-7b98-48dd-b244-bc9956cdea17.png";
      if (value <= 120) return "/lovable-uploads/112826e5-7b98-48dd-b244-bc9956cdea17.png";
      return "/lovable-uploads/112826e5-7b98-48dd-b244-bc9956cdea17.png";
    };

    const getPlanType = (gb: string) => {
      const value = parseInt(gb);
      if (value <= 80) return "Plano Basic";
      if (value <= 100) return "Plano Prime";
      if (value <= 120) return "Plano Premium";
      if (value <= 140) return "Plano Gold";
      return "Plano Master";
    };

    return {
      name: getPlanType(plan.gb),
      designation: `${plan.gb} • R$ ${plan.price.toFixed(2)}/mês`,
      quote: plan.features.join(" • "),
      src: getPlanImage(plan.gb)
    };
  });

  const handleSelectPlan = (plan: any) => {
    if (onSelectPlan) {
      // If onSelectPlan is provided, use it (for plan-selection page)
      onSelectPlan(plan);
    } else {
      // Default behavior for other pages
      if (storeOwnerCustomId) {
        navigate(`/client/products?sponsor=${storeOwnerCustomId}&plan=${plan.id}`);
      } else {
        navigate(`/client/products?plan=${plan.id}`);
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
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-green-500 mb-2">Conecte-se ao Futuro</h2>
        <p className="text-gray-600">Escolha o plano ideal para suas necessidades com a melhor relação custo-benefício do mercado digital</p>
        
        {/* View Mode Toggle */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setViewMode("circular")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === "circular" 
                ? "bg-green-500 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Circular
          </button>
          <button
            onClick={() => setViewMode("cards")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === "cards" 
                ? "bg-green-500 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Cards
          </button>
          <button
            onClick={() => setViewMode("orbital")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === "orbital" 
                ? "bg-green-500 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Orbital
          </button>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === "circular" ? (
        <div className="flex justify-center">
          <CircularTestimonials
            testimonials={planTestimonials}
            autoplay={true}
            colors={{
              name: "#16a34a",
              designation: "#6b7280",
              testimony: "#374151",
              arrowBackground: "#16a34a",
              arrowForeground: "#ffffff",
              arrowHoverBackground: "#15803d",
            }}
            fontSizes={{
              name: "28px",
              designation: "18px",
              quote: "16px",
            }}
          />
        </div>
      ) : viewMode === "orbital" ? (
        <PlansOrbital 
          plans={transformedPlans} 
          onSelectPlan={handleSelectPlan}
        />
      ) : (
        <PlanCarousel 
          plans={transformedPlans} 
          onSelectPlan={handleSelectPlan}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}
