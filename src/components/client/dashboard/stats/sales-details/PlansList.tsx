
import React from "react";
import { PlanListItem } from "./PlanListItem";
import { PieChartItem } from "./salesDetailsData";

interface PlansListProps {
  pieData: PieChartItem[];
  activeButton: number | null;
  showTooltip: boolean;
  onItemClick: (index: number, event: React.MouseEvent) => void;
}

export const PlansList: React.FC<PlansListProps> = ({
  pieData,
  activeButton,
  showTooltip,
  onItemClick,
}) => {
  return (
    <div className="w-full space-y-4 mt-10">
      <div className="space-y-2">
        <p className="text-lg font-medium text-black">Planos mais vendidos</p>
        <div className="grid gap-3">
          {pieData.map((plan, index) => (
            <PlanListItem
              key={index}
              plan={plan}
              index={index}
              activeButton={activeButton}
              showTooltip={showTooltip}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
