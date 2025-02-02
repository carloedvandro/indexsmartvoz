import React from "react";
import { InternetSelector } from "../InternetSelector";
import { DDDInput } from "../DDDInput";

interface PlanDDDSelectorProps {
  selectedInternet: string;
  onInternetChange: (value: string) => void;
  ddd: string;
  onDDDChange: (value: string) => void;
  internetOptions: Array<{ value: string; label: string; price: number }>;
}

export function PlanDDDSelector({
  selectedInternet,
  onInternetChange,
  ddd,
  onDDDChange,
  internetOptions,
}: PlanDDDSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-6 pt-4 max-w-md mx-auto">
      <InternetSelector
        selectedInternet={selectedInternet}
        onInternetChange={onInternetChange}
        internetOptions={internetOptions}
      />
      <DDDInput
        ddd={ddd}
        onDDDChange={onDDDChange}
      />
    </div>
  );
}