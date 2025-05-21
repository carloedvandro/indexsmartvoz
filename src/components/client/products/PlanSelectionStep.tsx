
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
  
  // Set initial plan based on URL parameter if present
  useEffect(() => {
    if (planIdFromUrl) {
      const mappedPlan = mapUrlPlanToInternet(planIdFromUrl);
      if (mappedPlan) {
        setSelectedInternet(mappedPlan.plan);
        
        // Auto-set a default DDD if we have a plan from the URL
        if (!selectedDDD) {
          setSelectedDDD("11"); // Default to São Paulo DDD
        }
        
        // Auto-select a default due date if we have a plan from the URL
        if (!selectedDueDate) {
          setSelectedDueDate(10); // Default to day 10
        }
        
        // If we have all the required data and coming from a direct plan selection,
        // automatically continue to the next step after a short delay
        if (planIdFromUrl) {
          const timer = setTimeout(() => {
            const linePrice = mappedPlan.price;
            
            // Update selectedLines
            if (selectedLines.length === 0) {
              setSelectedLines([{
                id: 1,
                internet: mappedPlan.plan,
                ddd: "11", // Default DDD
                price: linePrice,
                type: 'chip'
              }]);
            } else {
              const updatedLines = [...selectedLines];
              updatedLines[0] = {
                ...updatedLines[0],
                internet: mappedPlan.plan,
                ddd: "11", // Default DDD
                price: linePrice
              };
              setSelectedLines(updatedLines);
            }
            
            // Continue to next step
            onContinue({
              internet: mappedPlan.plan,
              ddd: "11", // Default DDD
              dueDate: 10, // Default due date
              price: linePrice
            });
          }, 500); // Short delay to allow state to update
          
          return () => clearTimeout(timer);
        }
      }
    }
  }, [planIdFromUrl]);

  // Initialize selectedInternet and selectedDDD from selectedLines if available
  useEffect(() => {
    if (selectedLines.length > 0 && !selectedInternet) {
      const line = selectedLines[0];
      if (line?.internet) setSelectedInternet(line.internet);
      if (line?.ddd) setSelectedDDD(line.ddd);
    }
  }, [selectedLines, selectedInternet]);

  const getLinePrice = () => {
    return internetOptions.find(option => option.value === selectedInternet)?.price || 0;
  };

  const handleContinue = () => {
    if (!selectedInternet || !selectedDDD || !selectedDueDate) {
      return;
    }

    // Update selectedLines when continuing
    if (selectedLines.length === 0) {
      setSelectedLines([{
        id: 1,
        internet: selectedInternet,
        ddd: selectedDDD,
        price: getLinePrice(),
        type: 'chip'
      }]);
    } else {
      const updatedLines = [...selectedLines];
      updatedLines[0] = {
        ...updatedLines[0],
        internet: selectedInternet,
        ddd: selectedDDD,
        price: getLinePrice()
      };
      setSelectedLines(updatedLines);
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
