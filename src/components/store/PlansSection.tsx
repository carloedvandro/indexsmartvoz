
import React, { useState } from "react";
import { PlanCard } from "./PlanCard";
import { PlansOrbital } from "./PlansOrbital";
import { useNavigate } from "react-router-dom";
import { PlanCarousel } from "./PlanCarousel";
import { ProjectShowcase } from "@/components/ui/project-showcase";
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
  const [viewMode, setViewMode] = useState<"cards" | "orbital">("cards");
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

  // Sample testimonials for the showcase
  const planTestimonials = [
    {
      name: "Plano Basic 80GB",
      quote: "Ideal para uso básico diário com navegação, redes sociais e mensagens. Perfeito para quem busca economia sem abrir mão da qualidade.",
      designation: "Plano Básico",
      src: "/lovable-uploads/8681ef58-fb81-4463-8d12-8ede81fcab0a.png",
      link: "/client/products?plan=80gb"
    },
    {
      name: "Plano Prime 100GB",
      quote: "O equilíbrio perfeito entre custo e benefício. Franquia generosa para streaming, jogos e trabalho remoto.",
      designation: "Plano Intermediário",
      src: "/lovable-uploads/8681ef58-fb81-4463-8d12-8ede81fcab0a.png",
      link: "/client/products?plan=100gb"
    },
    {
      name: "Plano Premium 120GB",
      quote: "Para usuários exigentes que precisam de alta performance e conectividade premium. Ideal para profissionais e heavy users.",
      designation: "Plano Avançado",
      src: "/lovable-uploads/8681ef58-fb81-4463-8d12-8ede81fcab0a.png",
      link: "/client/products?plan=120gb"
    },
    {
      name: "Plano Gold 140GB",
      quote: "O máximo em conectividade móvel. Franquia robusta para todas as suas necessidades digitais sem limites.",
      designation: "Plano Premium",
      src: "/lovable-uploads/8681ef58-fb81-4463-8d12-8ede81fcab0a.png",
      link: "/client/products?plan=140gb"
    }
  ];

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
    <div className="w-full space-y-12">
      {/* Plan Carousel */}
      <PlanCarousel 
        plans={transformedPlans} 
        onSelectPlan={handleSelectPlan}
        isMobile={isMobile}
      />

      {/* Project Showcase */}
      <div className="max-w-6xl mx-auto px-4">
        <ProjectShowcase
          testimonials={planTestimonials}
          autoplay={true}
          colors={{
            name: "var(--project-showcase-name-color)",
            position: "var(--project-showcase-position-color)",
            testimony: "var(--project-showcase-testimony-color)",
          }}
          fontSizes={{
            name: "var(--project-showcase-name-size)",
            position: "var(--project-showcase-position-size)",
            testimony: "var(--project-showcase-testimony-size)",
          }}
          spacing={{
            nameTop: "var(--project-showcase-name-top)",
            nameBottom: "var(--project-showcase-name-bottom)",
            positionTop: "var(--project-showcase-position-top)",
            positionBottom: "var(--project-showcase-position-bottom)",
            testimonyTop: "var(--project-showcase-testimony-top)",
            testimonyBottom: "var(--project-showcase-testimony-bottom)",
            lineHeight: "var(--project-showcase-line-height)",
          }}
          halomotButtonGradient="var(--project-showcase-button-gradient)"
          halomotButtonBackground="var(--project-showcase-button-background)"
          halomotButtonTextColor="var(--project-showcase-button-text-color)"
          halomotButtonOuterBorderRadius="var(--project-showcase-button-outer-radius)"
          halomotButtonInnerBorderRadius="var(--project-showcase-button-inner-radius)"
          halomotButtonHoverTextColor="var(--project-showcase-button-hover-text-color)"
          buttonInscriptions={{
            previousButton: "Anterior",
            nextButton: "Próximo",
            openWebAppButton: "Escolher Plano"
          }}
          onItemClick={(link) => {
            if (link) {
              navigate(link);
            }
          }}
        />
      </div>
    </div>
  );
}
