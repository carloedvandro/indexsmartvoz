
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
    <div className="w-full">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-medium">Personalize seu pedido</h2>
          <p className="text-gray-600">
            Confira aqui as melhores ofertas para você, cliente Smatvoz.
          </p>
        </div>

        <div className="space-y-6 w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <span className="text-sm font-medium mb-1 block">Internet</span>
              <InternetSelector
                selectedInternet={selectedInternet}
                onInternetChange={setSelectedInternet}
                internetOptions={internetOptions}
              />
            </div>
            <div className="w-full">
              <span className="text-sm font-medium mb-1 block">DDD</span>
              <DDDInput
                ddd={selectedDDD}
                onDDDChange={setSelectedDDD}
                disabled={isFreePlan}
              />
            </div>
          </div>

          {!isFreePlan ? (
            <div>
              <h2 className="text-xl font-normal mt-3 mb-4 text-center">
                Escolha a melhor data de vencimento da sua fatura:
              </h2>
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
            <div className="flex justify-between items-center bg-purple-50 px-4 py-3 rounded-md">
              <span className="font-medium">Total mensal:</span>
              <span className="font-medium">R$ {getLinePrice().toFixed(2).replace('.', ',')}/mês</span>
            </div>
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
