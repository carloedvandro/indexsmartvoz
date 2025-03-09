
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
    { value: "120GB", label: "Plano 120GB", price: 129.99 },
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
    <div className="max-w-[360px] mx-auto w-full pt-5">
      <div className="space-y-7">
        <div className="space-y-2">
          <h2 className="text-xl font-medium text-center">Personalize seu pedido</h2>
          <p className="text-gray-600 text-center text-lg max-w-[330px] mx-auto">
            Confira aqui as melhores ofertas para você, cliente Smatvoz.
          </p>
        </div>

        <div className="space-y-4">
          <div className="w-full px-2 max-w-[360px] mx-auto">
            <div className="grid grid-cols-2 gap-3">
              <div className="w-full max-w-[145px]">
                <InternetSelector
                  selectedInternet={selectedInternet}
                  onInternetChange={setSelectedInternet}
                  internetOptions={internetOptions}
                />
              </div>
              <div className="w-full max-w-[145px] ml-auto">
                <DDDInput
                  ddd={selectedDDD}
                  onDDDChange={setSelectedDDD}
                />
              </div>
            </div>
          </div>

          <div className="w-full px-2 max-w-[360px] mx-auto">
            <DueDateSelector
              selectedDueDate={selectedDueDate}
              setSelectedDueDate={setSelectedDueDate}
              selectedCardClassName="bg-white"
            />
          </div>

          <div className="w-full px-2 max-w-[360px] mx-auto">
            <PriceSummary
              linePrice={getLinePrice()}
              totalPrice={getLinePrice()}
            />
          </div>
        </div>

        <div className="w-full px-2 max-w-[360px] mx-auto grid grid-cols-2 gap-4 pt-4">
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
