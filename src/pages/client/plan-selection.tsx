import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlansSection } from "@/components/store/PlansSection";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function PlanSelection() {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan);

    // Store selected plan in localStorage for next steps
    localStorage.setItem('selectedPlan', JSON.stringify(plan));
    toast({
      title: "Plano Selecionado",
      description: `${plan.name} ${plan.gb} por R$ ${plan.price.toFixed(2)}`
    });

    // Navigate to product configuration (existing page)
    navigate("/client/products");
  };
  const handleBack = () => {
    navigate("/client/facial-biometry");
  };
  return <div className="min-h-screen bg-gradient-to-br from-white-50 to-white-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        
      </div>

      {/* Plans Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <PlansSection onSelectPlan={handleSelectPlan} />
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
        
      </div>
    </div>;
}