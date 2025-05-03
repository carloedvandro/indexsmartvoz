
import React from "react";
import { PieChartItem } from "./salesDetailsData";
import { formatCurrency } from "@/utils/format";

interface PlanListItemProps {
  plan: PieChartItem;
  index: number;
  activeButton: number | null;
  showTooltip: boolean;
  onItemClick: (index: number, event: React.MouseEvent) => void;
}

export const PlanListItem: React.FC<PlanListItemProps> = ({
  plan,
  index,
  activeButton,
  showTooltip,
  onItemClick,
}) => {
  return (
    <div className="flex items-center relative">
      <div 
        className={`w-4 h-4 rounded-full mr-3 cursor-pointer transition-all duration-300 ${activeButton === index ? 'scale-125 shadow-lg' : ''}`}
        style={{ 
          backgroundColor: plan.color,
          transform: activeButton === index ? 'scale(1.25)' : 'scale(1)',
          transition: 'transform 0.3s ease-in-out',
          boxShadow: activeButton === index ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
        }}
        onClick={(e) => onItemClick(index, e)}
      />
      <div className="flex-1">
        <p className={`text-sm text-black font-medium transition-opacity duration-300 ${activeButton === index ? 'opacity-100' : activeButton !== null ? 'opacity-60' : 'opacity-100'}`}>
          {plan.fullName}
        </p>
        <p className="text-xs text-gray-500">
          {plan.value} vendas - {plan.percentage}
        </p>
      </div>
      {showTooltip && activeButton === index && (
        <div 
          className="absolute left-8 -top-1 bg-white p-3 rounded-md shadow-lg border border-gray-200 z-50"
        >
          <p className="text-sm font-medium">{plan.fullName}</p>
          <p className="text-sm">{plan.value} vendas</p>
          <p className="text-sm font-medium">{formatCurrency(plan.totalAmount)}</p>
        </div>
      )}
    </div>
  );
};
