
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DueDateSelector } from "@/components/client/products/DueDateSelector";
import { PriceSummary } from "@/components/client/products/PriceSummary";
import { NavigationButtons } from "@/components/client/products/NavigationButtons";
import { PlanSelectionHeader } from "@/components/client/products/plan-selection/PlanSelectionHeader";
import { PlanSelectionForm } from "@/components/client/products/plan-selection/PlanSelectionForm";
import { getPlanPriceFromDatabase } from "@/components/client/products/plan-selection/planOptions";
import { usePlans } from "@/hooks/usePlans";
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
  const { data: plansData, isLoading } = usePlans();
  const { toast } = useToast();
  
  // Initialize selectedInternet and selectedDDD from selectedLines if available
  useEffect(() => {
    if (selectedLines.length > 0) {
      const line = selectedLines[0];
      if (line?.internet && !selectedInternet) setSelectedInternet(line.internet);
      if (line?.ddd && !selectedDDD) setSelectedDDD(line.ddd);
    }
  }, [selectedLines]);

  // Update selected lines when internet or DDD changes
  useEffect(() => {
    if (selectedInternet && selectedDDD && plansData) {
      const linePrice = getPlanPriceFromDatabase(plansData, selectedInternet);
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
  }, [selectedInternet, selectedDDD, plansData]);

  const getLinePrice = () => {
    if (!plansData) return 0;
    return getPlanPriceFromDatabase(plansData, selectedInternet);
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

  if (isLoading) {
    return (
      <div className="max-w-[379px] mx-auto w-full" style={{ marginTop: "24px" }}>
        <div className="space-y-6">
          <PlanSelectionHeader />
          <div className="text-center">Carregando planos...</div>
        </div>
      </div>
    );
  }

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
