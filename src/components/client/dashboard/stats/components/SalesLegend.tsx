
import React from "react";
import { PieDataItem } from "../types/salesTypes";
import { formatCurrency } from "@/utils/format";

interface SalesLegendProps {
  pieData: PieDataItem[];
  activeButton: number | null;
  onButtonClick: (index: number, event: React.MouseEvent) => void;
  showTooltip: boolean;
  tooltipData: { x: number; y: number; data: any } | null;
}

export const SalesLegend = ({ 
  pieData, 
  activeButton, 
  onButtonClick, 
  showTooltip,
  tooltipData 
}: SalesLegendProps) => {
  return (
    <div className="w-full space-y-4 -mt-[0.5px] ml-[9px] bg-transparent mt-5">
      <div className="space-y-2 mt-[12px] bg-transparent">
        <p className="text-sm font-medium text-black pt-0">Planos mais vendidos</p>
        <div className="grid gap-[9px] bg-transparent">
          {pieData.map((plan, index) => (
            <div 
              key={index} 
              className="flex items-center relative bg-transparent"
            >
              <div 
                className={`w-3 h-3 rounded-full mr-2 cursor-pointer transition-all duration-300 ${activeButton === index ? 'scale-125 shadow-lg' : ''}`}
                style={{ 
                  background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`,
                  boxShadow: activeButton === index 
                    ? `0 2px 8px rgba(0,0,0,0.3)` 
                    : '0 1px 3px rgba(0,0,0,0.2)',
                  transform: activeButton === index ? 'scale(1.25)' : 'scale(1)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                }}
                onClick={(e) => onButtonClick(index, e)}
              />
              <div className="flex-1 bg-transparent">
                <p className={`text-sm text-black pt-[4px] transition-opacity duration-300 ${activeButton === index ? 'opacity-100 font-medium' : activeButton !== null ? 'opacity-60' : 'opacity-100'}`}>
                  {plan.fullName}
                </p>
              </div>
              {showTooltip && tooltipData && activeButton === index && (
                <div 
                  className="absolute left-6 -top-1 bg-white p-2 rounded-md shadow-lg border border-gray-200 z-50"
                  style={{
                    position: 'absolute',
                    left: '1.2rem',
                    top: '-0.25rem',
                    backgroundColor: 'white',
                    zIndex: 50
                  }}
                >
                  <p className="text-sm font-medium">{plan.fullName}</p>
                  <p className="text-sm">
                    {plan.salesCount} vendas = {formatCurrency(plan.totalAmount)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
