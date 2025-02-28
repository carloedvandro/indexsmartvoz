
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InternetSelector } from "@/components/client/products/InternetSelector";
import { DDDInput } from "@/components/client/products/DDDInput";
import { DueDateSelector } from "@/components/client/products/DueDateSelector";
import { PriceSummary } from "@/components/client/products/PriceSummary";
import { useCalendarStyles } from "@/hooks/useCalendarStyles";

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
  const [isFreePlan, setIsFreePlan] = useState(false);
  const { data: calendarStyle } = useCalendarStyles();

  const internetOptions = [
    { value: "FREE", label: "Plano Gratuito", price: 0 },
    { value: "120GB", label: "Plano 120GB", price: 129.99 },
  ];

  useEffect(() => {
    if (selectedInternet === "FREE") {
      setIsFreePlan(true);
      setSelectedDDD("00");
      setSelectedDueDate(1);
    } else {
      setIsFreePlan(false);
      if (selectedDDD === "00") setSelectedDDD("");
      if (selectedDueDate === 1) setSelectedDueDate(null);
    }
  }, [selectedInternet]);

  const getLinePrice = () => {
    return internetOptions.find(option => option.value === selectedInternet)?.price || 0;
  };

  const handleContinue = () => {
    if (!selectedInternet) {
      return;
    }

    if (isFreePlan) {
      onContinue({
        internet: selectedInternet,
        ddd: selectedDDD,
        dueDate: selectedDueDate || 1,
        price: 0
      });
      return;
    }

    if (!selectedDDD || !selectedDueDate) {
      return;
    }

    onContinue({
      internet: selectedInternet,
      ddd: selectedDDD,
      dueDate: selectedDueDate,
      price: getLinePrice()
    });
  };

  return (
    <div className="w-full pt-6 -mt-[15px]">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-medium text-center">Personalize seu pedido</h2>
          <p className="text-gray-600 text-center">
            Confira aqui as melhores ofertas para você, cliente Smatvoz.
          </p>
        </div>

        <div className="space-y-4 w-full">
          <div className="grid grid-cols-2 gap-4">
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
                disabled={isFreePlan}
              />
            </div>
          </div>

          {!isFreePlan ? (
            <div>
              <DueDateSelector
                selectedDueDate={selectedDueDate}
                setSelectedDueDate={setSelectedDueDate}
                calendarStyle={calendarStyle}
              />
            </div>
          ) : (
            <div className="text-sm text-purple-700 p-2 bg-purple-50 rounded-md">
              O Plano Gratuito é exclusivo para parceiros, sem necessidade de aquisição de plano pago para realizar suas vendas e receber comissões.
            </div>
          )}

          <div>
            <PriceSummary
              linePrice={getLinePrice()}
              totalPrice={getLinePrice()}
            />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
            onClick={onBack}
          >
            Voltar
          </Button>
          <Button 
            className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
            onClick={handleContinue}
            disabled={!selectedInternet || (!isFreePlan && (!selectedDDD || !selectedDueDate))}
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
