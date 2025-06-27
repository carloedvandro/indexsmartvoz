
import { InternetSelector } from "@/components/client/products/InternetSelector";
import { DDDInput } from "@/components/client/products/DDDInput";
import { usePlans } from "@/hooks/usePlans";
import { useEffect } from "react";

interface InternetOption {
  value: string;
  label: string;
  price: number;
  id: string;
}

interface PlanSelectionFormProps {
  selectedInternet: string;
  setSelectedInternet: (internet: string) => void;
  selectedDDD: string;
  setSelectedDDD: (ddd: string) => void;
  internetOptions?: InternetOption[];
}

export function PlanSelectionForm({
  selectedInternet,
  setSelectedInternet,
  selectedDDD,
  setSelectedDDD,
  internetOptions: propInternetOptions
}: PlanSelectionFormProps) {
  const { data: plansData, isLoading } = usePlans();

  // Transform database plans to internet options format
  const internetOptions: InternetOption[] = plansData?.map(plan => {
    // Extract GB from title (e.g., "Plano Basic 80GB" -> "80GB")
    const gbMatch = plan.title.match(/(\d+)GB/);
    const gb = gbMatch ? `${gbMatch[1]}GB` : plan.title;
    
    return {
      id: plan.id,
      value: gb,
      label: `${gb} - R$ ${plan.value.toFixed(2)}`,
      price: plan.value
    };
  }) || propInternetOptions || [];

  // Auto-select plan based on localStorage data from plan selection
  useEffect(() => {
    const storedPlan = localStorage.getItem('selectedPlan');
    if (storedPlan && !selectedInternet && plansData?.length) {
      try {
        const planData = JSON.parse(storedPlan);
        console.log('🎯 Plano selecionado encontrado:', planData);
        
        // Find the matching plan by ID or price
        const matchingPlan = plansData.find(plan => 
          plan.id === planData.id || plan.value === planData.price
        );
        
        if (matchingPlan) {
          const gbMatch = matchingPlan.title.match(/(\d+)GB/);
          const gb = gbMatch ? `${gbMatch[1]}GB` : matchingPlan.title;
          console.log('✅ Auto-selecionando plano:', gb);
          setSelectedInternet(gb);
        }
      } catch (error) {
        console.error('❌ Erro ao processar plano selecionado:', error);
      }
    }
  }, [plansData, selectedInternet, setSelectedInternet]);

  if (isLoading) {
    return (
      <div className="w-full max-w-[340px] mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Internet</label>
            <div className="bg-gray-100 h-[40px] rounded border animate-pulse"></div>
          </div>
          <div>
            <DDDInput
              ddd={selectedDDD}
              onDDDChange={setSelectedDDD}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[340px] mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <InternetSelector
            selectedInternet={selectedInternet}
            onInternetChange={setSelectedInternet}
            internetOptions={internetOptions}
            showPrice={false}
          />
        </div>
        <div>
          <DDDInput
            ddd={selectedDDD}
            onDDDChange={setSelectedDDD}
          />
        </div>
      </div>
    </div>
  );
}
