import { FlowProps, useFlowRegisterUser } from "@/hooks/useFlowRegisterUser";
import {
  InternetOption,
  InternetSelector,
} from "../../products/InternetSelector";
import { useEffect, useState } from "react";
import { DDDInput } from "../../products/DDDInput";
import { usePlans } from "@/hooks/usePlans";
import { DueDateSelector } from "../../products/DueDateSelector";
import { PriceSummary } from "../../products/PriceSummary";
import { getPlanPriceFromDatabase } from "../../products/plan-selection/planOptions";
import { NavigationButtons } from "../../products/NavigationButtons";
import { toast } from "sonner";

export default function DDDSeletionFlow({
  onBack,
  flowData,
  onComplete,
}: FlowProps) {
  console.log(flowData)
  const [selectedInternet, setSelectedInternet] = useState<string>(
    flowData?.planSeleted?.id || ""
  );
  const [selectedDDD, setSelectedDDD] = useState<string>(flowData.ddd || "");
  const [selectedDueDate, setSelectedDueDate] = useState<number>(flowData.dueData ||0);
  const { data: plansData, isLoading } = usePlans();

  const getLinePrice = () => {
    if (!plansData) return 0;
    return getPlanPriceFromDatabase(plansData, selectedInternet);
  };

  const handleContinue = () => {
    if (!selectedDueDate)
      return toast.error("Precisa selecionar uma data valida");
    if (!selectedDueDate) return toast.error("Precisa selecionar um DDD");
    
    onComplete({
      ...flowData,
      ddd: selectedDDD,
      dueData: selectedDueDate,
    });
  };
  const internetOptions: InternetOption[] = plansData.map((plan) => {
    return {
      label: plan.title,
      price: plan.value,
      value: plan.value,
      id: plan.id,
    };
  });

  return (
    <div className="max-w-md mx-auto">
      <div className="">
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
            <DDDInput ddd={selectedDDD} onDDDChange={setSelectedDDD} />
          </div>
        </div>
      </div>
      <DueDateSelector
        selectedDueDate={selectedDueDate}
        setSelectedDueDate={setSelectedDueDate}
        selectedCardClassName="bg-white"
      />
      <PriceSummary linePrice={getLinePrice()} totalPrice={getLinePrice()} />

      <NavigationButtons
        handleBack={onBack}
        handleContinue={handleContinue}
        disabled={false}
      />
    </div>
  );
}
