
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DueDateSelector } from "@/components/client/products/DueDateSelector";
import { PriceSummary } from "@/components/client/products/PriceSummary";
import { NavigationButtons } from "@/components/client/products/NavigationButtons";
import { PlanSelectionHeader } from "@/components/client/products/plan-selection/PlanSelectionHeader";
import { PlanSelectionForm } from "@/components/client/products/plan-selection/PlanSelectionForm";
import { internetOptions, mapUrlPlanToInternet } from "@/components/client/products/plan-selection/planOptions";
import { useToast } from "@/hooks/use-toast";

interface PlanSelectionStepProps {
  onBack: () => void;
  onContinue: (planData: {
    internet: string;
    ddd: string;
    dueDate: number;
    price: number;
  }) => void;
  selectedLines: any[];
  setSelectedLines: (lines: any[]) => void;
  selectedDueDate: number | null;
  setSelectedDueDate: (date: number) => void;
}

export function PlanSelectionStep({ 
  onBack, 
  onContinue, 
  selectedLines, 
  setSelectedLines, 
  selectedDueDate, 
  setSelectedDueDate 
}: PlanSelectionStepProps) {
  const [selectedInternet, setSelectedInternet] = useState<string>("");
  const [selectedDDD, setSelectedDDD] = useState<string>("");
  const [searchParams] = useSearchParams();
  const planIdFromUrl = searchParams.get('plan');
  const { toast } = useToast();
  
  // Set initial plan based on URL parameter if present and no plan is already selected
  useEffect(() => {
    if (planIdFromUrl && !selectedInternet) {
      const mappedPlan = mapUrlPlanToInternet(planIdFromUrl);
      if (mappedPlan) {
        setSelectedInternet(mappedPlan.plan);
        
        // Auto-set a default DDD if we have a plan from the URL and no DDD is already selected
        if (!selectedDDD) {
          setSelectedDDD("11"); // Default to São Paulo DDD
        }
        
        // Update selectedLines with the selected plan information
        const linePrice = mappedPlan.price;
        if (selectedLines.length === 0) {
          setSelectedLines([{
            id: 1,
            internet: mappedPlan.plan,
            ddd: selectedDDD || "11", // Default DDD
            price: linePrice,
            type: 'chip'
          }]);
        } else {
          const updatedLines = [...selectedLines];
          updatedLines[0] = {
            ...updatedLines[0],
            internet: mappedPlan.plan,
            ddd: selectedDDD || "11", // Default DDD
            price: linePrice
          };
          setSelectedLines(updatedLines);
        }
      }
    }
  }, [planIdFromUrl, selectedDDD, selectedInternet, selectedLines, setSelectedLines]);

  // Initialize selectedInternet and selectedDDD from selectedLines if available
  useEffect(() => {
    if (selectedLines.length > 0) {
      const line = selectedLines[0];
      if (line?.internet && !selectedInternet) setSelectedInternet(line.internet);
      if (line?.ddd && !selectedDDD) setSelectedDDD(line.ddd);
    }
  }, [selectedLines, selectedInternet, selectedDDD]);

  // Update selected lines when internet or DDD changes
  useEffect(() => {
    if (selectedInternet && selectedDDD) {
      const linePrice = getLinePrice();
      if (selectedLines.length === 0) {
        setSelectedLines([{
          id: 1,
          internet: selectedInternet,
          ddd: selectedDDD,
          price: linePrice,
          type: 'chip'
        }]);
      } else {
        const updatedLines = [...selectedLines];
        updatedLines[0] = {
          ...updatedLines[0],
          internet: selectedInternet,
          ddd: selectedDDD,
          price: linePrice
        };
        setSelectedLines(updatedLines);
      }
    }
  }, [selectedInternet, selectedDDD]);

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
