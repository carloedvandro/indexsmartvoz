
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

    // Store complete plan information in localStorage for next steps
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

    // Navigate to product configuration (existing page)
    navigate("/client/products");
  };

  const handleBack = () => {
    navigate("/client/facial-biometry");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-50 to-white-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-xl font-semibold">Seleção de Plano</h1>
        </div>
      </div>

      {/* Plans Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <PlansSection onSelectPlan={handleSelectPlan} />
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="text-sm text-gray-600">
              Passo 2 de 4: Seleção do Plano
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
