
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlansSection } from "@/components/store/PlansSection";
import { DDDInput } from "@/components/client/products/DDDInput";
import { DueDateSelector } from "@/components/client/products/DueDateSelector";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePlanSelection } from "@/contexts/PlanSelectionContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PlanSelection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { planData, setPlanData } = usePlanSelection();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDDD, setSelectedDDD] = useState(planData.selectedDDD || "");
  const [selectedDueDate, setSelectedDueDate] = useState<number | null>(planData.selectedDueDate);

  const handleSelectPlan = (plan: any) => {
    const planDataFormatted = {
      id: plan.id,
      name: plan.name,
      gb: plan.gb,
      price: plan.price,
      features: plan.features,
    };
    
    setPlanData({ selectedPlan: planDataFormatted });
    
    toast({
      title: "Plano Selecionado",
      description: `${plan.name} ${plan.gb} por R$ ${plan.price.toFixed(2)}`
    });

    setCurrentStep(2);
  };

  const handleContinueToRegister = () => {
    if (!selectedDDD || !selectedDueDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, selecione o DDD e a data de vencimento.",
        variant: "destructive",
      });
      return;
    }

    setPlanData({ 
      selectedDDD, 
      selectedDueDate 
    });

    navigate("/client/register");
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header com logo */}
      <div className="w-full py-6 px-4">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" 
            alt="Smartvoz Logo" 
            className="h-[100px] object-contain mix-blend-multiply opacity-90 contrast-125"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8">
        {currentStep === 1 ? (
          <>
            <div className="flex items-center mb-6">
              <button 
                onClick={handleBack}
                className="flex items-center text-purple-600 hover:text-purple-700"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </button>
            </div>
            <PlansSection onSelectPlan={handleSelectPlan} />
          </>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="flex items-center mb-6">
              <button 
                onClick={handleBack}
                className="flex items-center text-purple-600 hover:text-purple-700"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Plano Selecionado</h2>
              {planData.selectedPlan && (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg mb-4">
                  <h3 className="font-bold text-lg">{planData.selectedPlan.name}</h3>
                  <p className="text-2xl font-bold">{planData.selectedPlan.gb}</p>
                  <p className="text-xl">R$ {planData.selectedPlan.price.toFixed(2)}/mês</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Complete seus dados</h3>
              
              <div className="space-y-4">
                <div>
                  <DDDInput
                    ddd={selectedDDD}
                    onDDDChange={setSelectedDDD}
                  />
                </div>

                <div>
                  <DueDateSelector
                    selectedDueDate={selectedDueDate}
                    setSelectedDueDate={setSelectedDueDate}
                    selectedCardClassName="bg-purple-600"
                  />
                </div>
              </div>
            </div>

            <Button 
              onClick={handleContinueToRegister}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium"
              disabled={!selectedDDD || !selectedDueDate}
            >
              Continuar para Cadastro
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
