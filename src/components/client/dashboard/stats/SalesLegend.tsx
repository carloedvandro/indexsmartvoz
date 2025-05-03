
import { useState } from "react";
import { SalesDataItem } from "./types";

interface SalesLegendProps {
  pieData: SalesDataItem[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  showTooltip: boolean;
  setShowTooltip: (show: boolean) => void;
  tooltipData: { x: number; y: number; data: any } | null;
  setTooltipData: (data: { x: number; y: number; data: any } | null) => void;
  activeButton: number | null;
  setActiveButton: (index: number | null) => void;
}

export function SalesLegend({ 
  pieData, 
  activeIndex, 
  setActiveIndex,
  showTooltip,
  setShowTooltip,
  tooltipData,
  setTooltipData,
  activeButton,
  setActiveButton
}: SalesLegendProps) {
  
  const onButtonClick = (index: number, event: React.MouseEvent) => {
    setActiveButton(index === activeButton ? null : index);
    setActiveIndex(index === activeIndex ? null : index);
    
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipData({
      x: rect.x + window.scrollX + rect.width + 10,
      y: rect.y + window.scrollY,
      data: pieData[index]
    });
    setShowTooltip(index === activeIndex ? false : true);
  };
  
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
                className={`w-4 h-4 rounded-full mr-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${activeButton === index ? '' : ''}`}
                style={{ 
                  backgroundColor: plan.color,
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  position: 'relative',
                  border: '2px solid white',
                  boxShadow: activeButton === index ? '0 0 0 2px rgba(255,255,255,0.8), 0 0 10px rgba(0,0,0,0.25)' : 'none',
                  transform: activeButton === index ? 'scale(1.2)' : 'scale(1)'
                }}
                onClick={(e) => onButtonClick(index, e)}
              >
                <span 
                  className="absolute inset-0 rounded-full" 
                  style={{
                    animation: activeButton !== index ? 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite' : 'none',
                    background: 'transparent',
                    border: `2px solid ${plan.color}`,
                    opacity: 0.6
                  }}
                ></span>
              </div>
              <div className="flex-1">
                <p className={`text-sm text-black pt-[4px] ${activeButton === index ? 'font-medium' : ''}`}>
                  {plan.fullName}
                </p>
              </div>
              {showTooltip && tooltipData && activeButton === index && (
                <div 
                  className="absolute left-6 -top-1 bg-white p-2 rounded-md shadow-lg border border-gray-200 z-50"
                  style={{
                    position: 'absolute',
                    left: '1.5rem',
                    top: '-0.25rem'
                  }}
                >
                  <p className="text-sm font-medium">{plan.fullName}</p>
                  <p className="text-sm">{plan.value} vendas</p>
                  <p className="text-sm font-medium">{plan.formattedAmount}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
