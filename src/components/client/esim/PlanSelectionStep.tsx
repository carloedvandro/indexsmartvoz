
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InternetSelector } from "@/components/client/products/InternetSelector";
import { DDDInput } from "@/components/client/products/DDDInput";
import { DueDateSelector } from "@/components/client/products/DueDateSelector";
import { PriceSummary } from "@/components/client/products/PriceSummary";

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
    <div className="max-w-[340px] mx-auto w-full pt-5 px-2">
      <div className="space-y-5">
        <div className="space-y-2">
          <h2 className="text-xl font-medium text-center">Personalize seu pedido</h2>
          <p className="text-gray-600 text-center text-lg max-w-[320px] mx-auto">
            Confira aqui as melhores ofertas para você, cliente Smatvoz.
          </p>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="w-full">
              <InternetSelector
                selectedInternet={selectedInternet}
                onInternetChange={setSelectedInternet}
                internetOptions={internetOptions}
              />
            </div>
            <div className="w-full">
              <DDDInput
                ddd={selectedDDD}
                onDDDChange={setSelectedDDD}
              />
            </div>
          </div>

          <div>
            <DueDateSelector
              selectedDueDate={selectedDueDate}
              setSelectedDueDate={setSelectedDueDate}
              variants={{ marginTop: '2px' }}
            />
          </div>

          <div>
            <PriceSummary
              linePrice={getLinePrice()}
              totalPrice={getLinePrice()}
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 pt-2">
          <Button 
            variant="outline" 
            className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white w-full"
            onClick={handleBack}
          >
            Voltar
          </Button>
          <Button 
            className="bg-[#8425af] hover:bg-[#6c1e8f] text-white w-full"
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
