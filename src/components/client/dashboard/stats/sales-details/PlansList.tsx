
import React from "react";
import { PlanItem } from "./PlanItem";

interface PlansListProps {
  pieData: {
    name: string;
    fullName: string;
    value: number;
    price: number;
    totalAmount: number;
    color: string;
  }[];
  activeButton: number | null;
  showTooltip: boolean;
  onButtonClick: (index: number, event: React.MouseEvent) => void;
}

export function PlansList({ pieData, activeButton, showTooltip, onButtonClick }: PlansListProps) {
  return (
    <div className="space-y-2 mt-[12px]">
      <p className="text-sm font-medium text-black pt-[4px]">Planos mais vendidos</p>
      <div className="grid gap-[9px]">
        {pieData.map((plan, index) => (
          <PlanItem
            key={index}
            plan={plan}
            isActive={activeButton === index}
            onClick={onButtonClick}
            index={index}
            showTooltip={showTooltip}
          />
        ))}
      </div>
    </div>
  );
}
