
import { useState, useEffect } from "react";
import { InternetSelector } from "@/components/client/products/InternetSelector";
import { DDDInput } from "@/components/client/products/DDDInput";
import { DueDateSelector } from "@/components/client/products/DueDateSelector";
import { PriceSummary } from "@/components/client/products/PriceSummary";
import { NavigationButtons } from "@/components/client/products/NavigationButtons";
import { useSearchParams } from "react-router-dom";

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

  // Updated plan options with the correct values and prices based on the new designs
  const internetOptions = [
    { value: "2GB", label: "Teste a Tegg - 2GB", price: 9.99 },
    { value: "80GB", label: "BASIC - 80GB", price: 104.99 },
    { value: "100GB", label: "START - 100GB", price: 114.99 },
    { value: "120GB", label: "GOLD - 120GB", price: 124.99 },
    { value: "140GB", label: "PLUS - 140GB", price: 154.99 },
  ];
  
  // Set initial plan based on URL parameter if present
  useEffect(() => {
    if (planIdFromUrl && !selectedInternet) {
      switch (planIdFromUrl) {
        case "teste-tegg":
          setSelectedInternet("2GB");
          break;
        case "basic":
          setSelectedInternet("7GB");
          break;
        case "start":
          setSelectedInternet("13GB");
          break;
        case "gold":
          setSelectedInternet("21GB");
          break;
        case "plus":
          setSelectedInternet("44GB");
          break;
      }
    }
  }, [planIdFromUrl]);

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
        <div className="space-y-3 text-center">
          <div className="w-full flex justify-center mb-4">
            <img 
              src="/lovable-uploads/8681ef58-fb81-4463-8d12-8ede81fcab0a.png" 
              alt="Smartvoz Logo" 
              className="w-auto h-[90px] object-contain"
            />
          </div>
          <h2 className="text-xl font-medium text-center text-black">Personalize seu pedido</h2>
        </div>

        <div className="space-y-6">
          <div className="w-full max-w-[340px] mx-auto">
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
