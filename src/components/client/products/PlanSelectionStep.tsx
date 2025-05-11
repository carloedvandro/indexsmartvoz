
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DueDateSelector } from "@/components/client/products/DueDateSelector";
import { PriceSummary } from "@/components/client/products/PriceSummary";
import { NavigationButtons } from "@/components/client/products/NavigationButtons";
import { PlanSelectionHeader } from "@/components/client/products/plan-selection/PlanSelectionHeader";
import { PlanSelectionForm } from "@/components/client/products/plan-selection/PlanSelectionForm";
import { internetOptions, mapUrlPlanToInternet } from "@/components/client/products/plan-selection/planOptions";

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
  
  // Set initial plan based on URL parameter if present
  useEffect(() => {
    if (planIdFromUrl && !selectedInternet) {
      const mappedPlan = mapUrlPlanToInternet(planIdFromUrl);
      if (mappedPlan) {
        setSelectedInternet(mappedPlan.plan);
      }
    }
  }, [planIdFromUrl, selectedInternet]);

  const getLinePrice = () => {
    return internetOptions.find(option => option.value === selectedInternet)?.price || 0;
  };

  const handleContinue = () => {
    if (!selectedInternet || !selectedDDD || !selectedDueDate) {
      return;
    }

    onContinue({
      internet: selectedInternet,
      ddd: selectedDDD,
      dueDate: selectedDueDate,
      price: getLinePrice()
    });
  };
  
  const isDisabled = !selectedInternet || !selectedDDD || !selectedDueDate;

  return (
    <div className="max-w-[379px] mx-auto w-full" style={{ marginTop: "74px" }}>
      <div className="space-y-6">
        <PlanSelectionHeader />

        <div className="space-y-6">
          <PlanSelectionForm 
            selectedInternet={selectedInternet}
            setSelectedInternet={setSelectedInternet}
            selectedDDD={selectedDDD}
            setSelectedDDD={setSelectedDDD}
            internetOptions={internetOptions}
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
