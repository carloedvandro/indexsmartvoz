import { useState } from "react";
import { PlanHeader } from "./plan-selection/PlanHeader";
import { PlanDDDSelector } from "./plan-selection/PlanDDDSelector";
import { DueDateSelector } from "./plan-selection/DueDateSelector";
import { PriceSummary } from "./PriceSummary";

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
          internet: "110GB",
          type: "Nova Linha",
          ddd: "",
          price: 124.99,
        },
      ]);
    }
  });

  const handleInternetChange = (value: string) => {
    const newPrice = internetOptions.find(option => option.value === value)?.price || 124.99;
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
    <div className="space-y-10 min-h-[400px] w-full max-w-[400px] mx-auto pt-2">
      <PlanHeader />

      <div className="space-y-8">
        <PlanDDDSelector
          selectedInternet={selectedLines[0]?.internet || "110GB"}
          onInternetChange={handleInternetChange}
          ddd={selectedLines[0]?.ddd || ""}
          onDDDChange={handleDDDChange}
          internetOptions={internetOptions}
        />

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