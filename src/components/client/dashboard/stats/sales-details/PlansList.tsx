
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
    <div className="w-full space-y-4 -mt-[0.5px] ml-[9px]">
      <div className="space-y-2 mt-[12px]">
        <p className="text-sm font-medium text-black pt-[4px]">Planos mais vendidos</p>
        <div className="grid gap-[9px]">
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
