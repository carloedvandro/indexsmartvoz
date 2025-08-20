
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlansSection } from "@/components/store/PlansSection";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PlanSelection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan);

    const planData = {
      id: plan.id,
      name: plan.name,
      gb: plan.gb,
      price: plan.price,
      features: plan.features,
      title: plan.name
    };
    localStorage.setItem('selectedPlan', JSON.stringify(planData));
    
    toast({
      title: "Plano Selecionado",
      description: `${plan.name} ${plan.gb} por R$ ${plan.price.toFixed(2)}`
    });

    navigate("/client/products");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <PlansSection onSelectPlan={handleSelectPlan} />
      </div>
    </div>
  );
}
