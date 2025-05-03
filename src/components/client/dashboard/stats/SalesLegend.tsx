
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
                className={`w-4 h-4 rounded-full mr-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${activeButton === index ? 'scale-125 shadow-lg' : 'hover:scale-110'}`}
                style={{ 
                  backgroundColor: plan.color,
                  transform: activeButton === index ? 'scale(1.25)' : 'scale(1)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  boxShadow: activeButton === index ? '0 2px 8px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
                  position: 'relative',
                  border: '2px solid white'
                }}
                onClick={(e) => onButtonClick(index, e)}
              >
                {activeButton !== index && (
                  <div className="absolute -top-3 -right-3 animate-pulse">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm text-black pt-[4px] transition-opacity duration-300 ${activeButton === index ? 'opacity-100 font-medium' : activeButton !== null ? 'opacity-60' : 'opacity-100'}`}>
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
