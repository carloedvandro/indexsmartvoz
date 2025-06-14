
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
    
    // Store selected plan in localStorage for next steps
    localStorage.setItem('selectedPlan', JSON.stringify(plan));
    
    toast({
      title: "Plano Selecionado",
      description: `${plan.name} ${plan.gb} por R$ ${plan.price.toFixed(2)}`,
    });

    // Navigate to product configuration (existing page)
    navigate("/client/products");
  };

  const handleBack = () => {
    navigate("/client/facial-biometry");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Escolha seu Plano</h1>
              <p className="text-gray-600">Selecione o plano ideal para suas necessidades</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <PlansSection onSelectPlan={handleSelectPlan} />
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">✓</span>
              Cadastro
              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">✓</span>
              Biometria
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">3</span>
              Planos
              <span className="bg-gray-300 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xs">4</span>
              Configuração
              <span className="bg-gray-300 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xs">5</span>
              Pagamento
            </div>
            {selectedPlan && (
              <div className="text-sm font-medium text-green-600">
                Plano selecionado: {selectedPlan.name} {selectedPlan.gb}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
