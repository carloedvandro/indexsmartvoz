
import React from "react";
import { PieDataItem } from "../types/salesTypes";
import { formatCurrency } from "@/utils/format";

interface SalesLegendProps {
  pieData: PieDataItem[];
  activeButton: number | null;
  onButtonClick: (index: number, event: React.MouseEvent) => void;
}

export const SalesLegend = ({ 
  pieData, 
  activeButton, 
  onButtonClick
}: SalesLegendProps) => {
  return (
    <div className="w-full space-y-4 -mt-[0.5px] ml-[9px]">
      <div className="space-y-2 mt-[12px]">
        <p className="text-sm font-medium text-black pt-[4px]">Planos mais vendidos</p>
        <div className="grid gap-[9px]">
          {pieData.map((plan, index) => (
            <div 
              key={index} 
              className="flex items-center relative"
            >
              <div 
                className={`w-3 h-3 rounded-full mr-2 cursor-pointer transition-all duration-300 ${activeButton === index ? 'scale-125 shadow-lg' : ''}`}
                style={{ 
                  backgroundColor: plan.color,
                  transform: activeButton === index ? 'scale(1.25)' : 'scale(1)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  boxShadow: activeButton === index ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
                }}
                onClick={(e) => onButtonClick(index, e)}
              />
              <div className="flex-1">
                <p className={`text-sm text-black pt-[4px] transition-opacity duration-300 ${activeButton === index ? 'opacity-100 font-medium' : activeButton !== null ? 'opacity-60' : 'opacity-100'}`}>
                  {plan.fullName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
