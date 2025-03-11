import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InternetSelector } from "@/components/client/products/InternetSelector";
import { DDDInput } from "@/components/client/products/DDDInput";
import { DueDateSelector } from "@/components/client/products/DueDateSelector";
import { PriceSummary } from "@/components/client/products/PriceSummary";
import { NavigationButtons } from "@/components/client/products/chip-activation/NavigationButtons";

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

  const internetOptions = [
    { value: "120GB", label: "Plano 120GB", price: 119.99 },
  ];

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

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="max-w-[379px] mx-auto w-full" style={{ marginTop: "74px" }}>
      <div className="space-y-6">
        <div className="space-y-3 text-center">
          <div className="w-full flex justify-center mb-4">
            <img 
              src="/lovable-uploads/8681ef58-fb81-4463-8d12-8ede81fcab0a.png" 
              alt="Smartvoz Logo" 
              className="h-[140px] object-contain mix-blend-multiply opacity-90 contrast-125"
            />
          </div>
          <h2 className="text-xl font-medium text-center text-[#8425af]">Personalize seu pedido</h2>
        </div>

        <div className="space-y-6">
          <div className="w-full max-w-[340px] mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InternetSelector
                  selectedInternet={selectedInternet}
                  onInternetChange={setSelectedInternet}
                  internetOptions={internetOptions}
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

        <div className="w-full max-w-[340px] mx-auto flex gap-4 pt-4">
          <Button 
            variant="outline" 
            className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white flex-1"
            onClick={handleBack}
          >
            Voltar
          </Button>
          <Button 
            className="bg-[#8425af] hover:bg-[#6c1e8f] text-white flex-1"
            onClick={handleContinue}
            disabled={!selectedInternet || !selectedDDD || !selectedDueDate}
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
