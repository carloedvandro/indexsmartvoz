import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
  isMobile
}: PlanCarouselProps) {
  const getPlanTypeLabel = (gb: string) => {
    switch (gb) {
      case "80GB":
        return "Basic Plan";
      case "100GB":
        return "Standard Plan";
      case "120GB":
        return "Premium Plan";
      case "140GB":
        return "Pro Plan";
      default:
        return "Plan";
    }
  };
  return <div className="w-full px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Escolha seu plano</h2>
        <p className="text-gray-600">Selecione o plano perfeito para suas necessidades</p>
      </div>

      {/* Plans Carousel */}
      <Carousel opts={{
      align: "center",
      loop: true
    }} className="w-full max-w-6xl mx-auto">
        <CarouselContent className={isMobile ? "-ml-2 md:-ml-4" : "-ml-4"}>
          {plans.map((plan, index) => <CarouselItem key={plan.id} className={isMobile ? "pl-2 md:pl-4 basis-[85%] sm:basis-1/2" : "pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"}>
              <Card className={`
                  relative h-full transition-all duration-300 hover:scale-105 hover:shadow-xl
                  ${plan.isHighlighted ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white ring-4 ring-purple-300' : 'bg-white text-gray-800 border-gray-200'}
                `}>
                {plan.isHighlighted && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </span>
                  </div>}

                <CardContent className="p-6 text-center h-full flex flex-col">
                  {/* Plan Type */}
                  <div className={`text-sm font-medium mb-2 ${plan.isHighlighted ? 'text-purple-100' : 'text-gray-500'}`}>
                    {getPlanTypeLabel(plan.gb)}
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-sm font-medium">R$</span>
                      <span className="text-4xl font-bold mx-1">{Math.floor(plan.price)}</span>
                      <span className="text-sm">,{(plan.price % 1).toFixed(2).slice(2)}</span>
                    </div>
                    <div className={`text-sm ${plan.isHighlighted ? 'text-purple-200' : 'text-gray-500'}`}>
                      A MONTH
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-start gap-3 text-sm">
                          <Check className={`
                              h-4 w-4 mt-0.5 flex-shrink-0
                              ${plan.isHighlighted ? 'text-white' : 'text-green-500'}
                            `} />
                          <span className="text-left">{feature}</span>
                        </li>)}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button onClick={() => onSelectPlan(plan)} className={`
                      w-full font-semibold py-3 rounded-lg transition-all duration-200
                      ${plan.isHighlighted ? 'bg-white text-purple-600 hover:bg-gray-100 hover:text-purple-700' : 'bg-purple-600 text-white hover:bg-purple-700'}
                    `}>
                    Choose this Plan
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>)}
        </CarouselContent>
        
        {!isMobile && <>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </>}
      </Carousel>

      {/* Dots Indicator for Mobile */}
      {isMobile && <div className="flex justify-center mt-6 space-x-2">
          {plans.map((_, index) => <div key={index} className="w-2 h-2 rounded-full bg-gray-300" />)}
        </div>}
    </div>;
}