import { useState } from "react";
import { InternetSelector } from "./InternetSelector";
import { DDDInput } from "./DDDInput";
import { PriceSummary } from "./PriceSummary";
import { Header } from "./plan-selection/Header";
import { DueDateSelector } from "./plan-selection/DueDateSelector";

type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
};

interface PlanSelectionStepProps {
  selectedLines: Line[];
  setSelectedLines: (lines: Line[]) => void;
  selectedDueDate: number | null;
  setSelectedDueDate: (date: number) => void;
}

export function PlanSelectionStep({ 
  selectedLines, 
  setSelectedLines,
  selectedDueDate,
  setSelectedDueDate 
}: PlanSelectionStepProps) {
  const internetOptions = [
    { value: "110GB", label: "110GB", price: 124.99 },
    { value: "120GB", label: "120GB", price: 134.99 },
    { value: "140GB", label: "140GB", price: 144.99 },
  ];

  useState(() => {
    if (selectedLines.length === 0) {
      setSelectedLines([
        {
          id: 1,
          internet: "",
          type: "Nova Linha",
          ddd: "",
          price: 0,
        },
      ]);
    }
  });

  const handleInternetChange = (value: string) => {
    const newPrice = internetOptions.find(option => option.value === value)?.price || 0;
    setSelectedLines(selectedLines.map(line => 
      line.id === 1 
        ? { ...line, internet: value, price: newPrice }
        : line
    ));
  };

  const handleDDDChange = (value: string) => {
    setSelectedLines(selectedLines.map(line => 
      line.id === 1 
        ? { ...line, ddd: value }
        : line
    ));
  };

  const totalPrice = selectedLines.reduce((acc, line) => acc + line.price, 0);

  return (
    <div className="w-full space-y-8 min-h-[400px] pt-2">
      <Header 
        title="Personalize seu pedido"
        description="Confira aqui as melhores ofertas para você, cliente Smatvoz."
      />

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 pt-3 w-full">
          <InternetSelector
            selectedInternet={selectedLines[0]?.internet || ""}
            onInternetChange={handleInternetChange}
            internetOptions={internetOptions}
          />
          <DDDInput
            ddd={selectedLines[0]?.ddd || ""}
            onDDDChange={handleDDDChange}
          />
        </div>

        <DueDateSelector 
          selectedDueDate={selectedDueDate}
          setSelectedDueDate={setSelectedDueDate}
        />

        <PriceSummary
          linePrice={selectedLines[0]?.price || 0}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
}