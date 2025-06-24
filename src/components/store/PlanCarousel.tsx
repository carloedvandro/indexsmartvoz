
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Check } from "lucide-react";
import { PlanCardModern } from "./PlanCardModern";

interface Plan {
  id: string;
  name: string;
  gb: string;
  price: number;
  features: string[];
  isHighlighted?: boolean;
}

interface PlanCarouselProps {
  plans: Plan[];
  onSelectPlan: (plan: Plan) => void;
  isMobile?: boolean;
}

export function PlanCarousel({
  plans,
  onSelectPlan,
  isMobile
}: PlanCarouselProps) {
  return (
    <div className="w-full px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Selecione o plano perfeito para suas necessidades</h2>
        <p className="text-gray-600">Escolha entre nossos planos disponíveis</p>
      </div>

      {/* Plans Display */}
      {isMobile ? (
        // Mobile: Carousel
        <Carousel 
          opts={{
            align: "center",
            loop: true
          }} 
          className="w-full max-w-sm mx-auto"
        >
          <CarouselContent className="-ml-1">
            {plans.map((plan) => (
              <CarouselItem key={plan.id} className="pl-1">
                <PlanCardModern plan={plan} onSelect={onSelectPlan} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      ) : (
        // Desktop: Horizontal grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto justify-items-center">
          {plans.map((plan) => (
            <PlanCardModern key={plan.id} plan={plan} onSelect={onSelectPlan} />
          ))}
        </div>
      )}

      {/* Dots Indicator for Mobile */}
      {isMobile && (
        <div className="flex justify-center mt-6 space-x-2">
          {plans.map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-gray-300" />
          ))}
        </div>
      )}
    </div>
  );
}
