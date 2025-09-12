import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNetworkPlans } from "@/hooks/useNetworkPlans";
import { useToast } from "@/hooks/use-toast";

interface PlanSelectionFormProps {
  onPlanSelect: (planId: string, planValue: number) => void;
  selectedPlan?: string;
}

export function PlanSelectionForm({ onPlanSelect, selectedPlan }: PlanSelectionFormProps) {
  const { data: plans, isLoading } = useNetworkPlans();
  const { toast } = useToast();

  const handlePlanSelect = (planId: string, planValue: number) => {
    onPlanSelect(planId, planValue);
    toast({
      title: "Plano selecionado",
      description: "Plano selecionado com sucesso!",
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-32 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {plans?.map((plan) => (
        <Card
          key={plan.id}
          className={`cursor-pointer transition-all ${
            selectedPlan === plan.id ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => handlePlanSelect(plan.id, plan.price)}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
              <div className="text-2xl font-bold text-primary mb-4">
                R$ {plan.price.toFixed(2)}
              </div>
              <Button
                variant={selectedPlan === plan.id ? "default" : "outline"}
                className="w-full"
              >
                {selectedPlan === plan.id ? "Selecionado" : "Selecionar"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}