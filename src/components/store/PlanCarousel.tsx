import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Check } from "lucide-react";

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
  isMobile,
}: PlanCarouselProps) {
  return (
    <div className="w-full px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-green-500 mb-2">
          Conecte-se ao Futuro
        </h2>
        <p className="text-gray-600">
          Escolha o plano ideal para suas necessidades com a melhor relação
          custo-benefício do mercado digital
        </p>
      </div>

      {/* Plans Display */}
      {isMobile ? (
        // Mobile: Carousel
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-sm mx-auto"
        >
          <CarouselContent className="-ml-1">
            {plans.map((plan) => (
              <CarouselItem key={plan.id} className="pl-1">
                <PlanCard plan={plan} onSelectPlan={onSelectPlan} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      ) : (
        // Desktop: Horizontal grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onSelectPlan={onSelectPlan} />
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

// Plan Card Component
function PlanCard({
  plan,
  onSelectPlan,
}: {
  plan: Plan;
  onSelectPlan: (plan: Plan) => void;
}) {
  return (
    <Card
      className={`
      relative h-full transition-all duration-300 hover:shadow-xl
      bg-gradient-to-br from-gray-500 to-gray-600 text-white border-0
    `}
    >
      <CardContent className="p-6 text-center h-full flex flex-col">

        <div className="text-sm font-medium mb-2 text-white/90">
          {plan.name}
        </div>

        <div className="mb-6">
          <div className="flex items-baseline justify-center">
            <span className="text-sm font-medium">R$</span>
            <span className="text-4xl font-bold mx-1">
              {Math.floor(plan.price)}
            </span>
            <span className="text-sm">
              ,{(plan.price % 1).toFixed(2).slice(2)}
            </span>
          </div>
          <div className="text-sm text-white/80">por mês</div>
        </div>

        <div className="flex-1 mb-6">
          <ul className="space-y-3">
            {plan.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3 text-sm">
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-white" />
                <span className="text-left">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => onSelectPlan(plan)}
          className="w-full font-semibold py-3 rounded-lg transition-all duration-200 bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900"
        >
          Escolher este Plano
        </Button>
      </CardContent>
    </Card>
  );
}
