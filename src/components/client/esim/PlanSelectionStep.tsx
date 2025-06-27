
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DueDateSelector } from "@/components/client/products/DueDateSelector";
import { PriceSummary } from "@/components/client/products/PriceSummary";
import { NavigationButtons } from "@/components/client/products/NavigationButtons";
import { PlanSelectionHeader } from "@/components/client/products/plan-selection/PlanSelectionHeader";
import { PlanSelectionForm } from "@/components/client/products/plan-selection/PlanSelectionForm";
import { internetOptions, mapUrlPlanToInternet, mapPlanValueToInternet } from "@/components/client/products/plan-selection/planOptions";
import { useToast } from "@/hooks/use-toast";

interface PlanSelectionStepProps {
  onBack: () => void;
  onContinue: (planData: {
    internet: string;
    ddd: string;
    dueDate: number;
    price: number;
  }) => void;
}

export function PlanSelectionStep({ onBack, onContinue }: PlanSelectionStepProps) {
  const [selectedInternet, setSelectedInternet] = useState<string>("");
  const [selectedDDD, setSelectedDDD] = useState<string>("");
  const [selectedDueDate, setSelectedDueDate] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const planIdFromUrl = searchParams.get('plan');
  const { toast } = useToast();
  
  // Auto-select plan based on localStorage data from plan selection
  useEffect(() => {
    const storedPlan = localStorage.getItem('selectedPlan');
    if (storedPlan && !selectedInternet) {
      try {
        const planData = JSON.parse(storedPlan);
        console.log('🎯 Plano selecionado encontrado:', planData);
        
        // Try to map the plan value to internet option
        const mappedInternet = mapPlanValueToInternet(planData.price);
        if (mappedInternet) {
          console.log('✅ Auto-selecionando plano:', mappedInternet);
          setSelectedInternet(mappedInternet);
          
          // Auto-set a default DDD if none is selected
          if (!selectedDDD) {
            setSelectedDDD("11");
          }
        }
      } catch (error) {
        console.error('❌ Erro ao processar plano selecionado:', error);
      }
    }
  }, [selectedInternet, selectedDDD]);
  
  // Set initial plan based on URL parameter if present
  useEffect(() => {
    if (planIdFromUrl && !selectedInternet) {
      const mappedPlan = mapUrlPlanToInternet(planIdFromUrl);
      if (mappedPlan) {
        setSelectedInternet(mappedPlan.plan);
        // Auto-set a default DDD if none is selected
        if (!selectedDDD) {
          setSelectedDDD("11");
        }
      }
    }
  }, [planIdFromUrl, selectedInternet, selectedDDD]);

  const getLinePrice = () => {
    return internetOptions.find(option => option.value === selectedInternet)?.price || 0;
  };

  const handleContinue = () => {
    if (!selectedInternet || !selectedDDD || !selectedDueDate) {
      if (!selectedInternet) {
        toast({
          title: "Campo obrigatório",
          description: "Por favor, selecione um plano de internet antes de continuar",
          variant: "destructive",
        });
      } else if (!selectedDDD) {
        toast({
          title: "Campo obrigatório",
          description: "Por favor, preencha o DDD antes de continuar",
          variant: "destructive",
        });
      } else if (!selectedDueDate) {
        toast({
          title: "Campo obrigatório", 
          description: "Por favor, selecione uma data de vencimento antes de continuar",
          variant: "destructive",
        });
      }
      return;
    }

    onContinue({
      internet: selectedInternet,
      ddd: selectedDDD,
      dueDate: selectedDueDate,
      price: getLinePrice()
    });
  };
  
  // Fix: The button should only be enabled when all three fields are filled
  const isDisabled = !selectedInternet || !selectedDDD || !selectedDueDate;

  // Create internetOptions with id property for eSIM component compatibility
  const internetOptionsWithId = internetOptions.map((option, index) => ({
    ...option,
    id: `esim-plan-${index}`
  }));

  return (
    <div className="max-w-[379px] mx-auto w-full" style={{ marginTop: "24px" }}>
      <div className="space-y-6">
        <PlanSelectionHeader />

        <div className="space-y-6">
          <PlanSelectionForm 
            selectedInternet={selectedInternet}
            setSelectedInternet={setSelectedInternet}
            selectedDDD={selectedDDD}
            setSelectedDDD={setSelectedDDD}
            internetOptions={internetOptionsWithId}
          />

          <div className="w-full max-w-[340px] mx-auto">
            <DueDateSelector
              selectedDueDate={selectedDueDate}
              setSelectedDueDate={setSelectedDueDate}
              selectedCardClassName="bg-white"
            />
          </div>

          <div className="w-full max-w-[340px] mx-auto">
            <PriceSummary
              linePrice={getLinePrice()}
              totalPrice={getLinePrice()}
            />
          </div>
        </div>

        <NavigationButtons 
          currentStep={1}
          handleBack={onBack}
          handleContinue={handleContinue}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}
