
import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SalesPieChart } from "./sales-details/SalesPieChart";
import { PlansList } from "./sales-details/PlansList";
import { pieData, calculateTotalSalesAmount } from "./sales-details/salesDetailsData";

export function SalesDetailsCard() {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState<{ x: number; y: number; data: any } | null>(null);
  
  const totalSalesAmount = calculateTotalSalesAmount(pieData);

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
    <div className="pl-0 h-[550px]">
      <div className="flex items-start mb-4 ml-[9px]">
        <h3 className="text-lg font-bold text-black pt-[4px]">Detalhe das Vendas</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <div className={`w-full max-w-[400px] h-[320px] mx-auto flex items-center justify-center ${isMobile ? "mt-2" : ""}`}>
          <SalesPieChart 
            pieData={pieData}
            activeIndex={activeIndex}
            onButtonClick={onButtonClick}
            totalSalesAmount={totalSalesAmount}
          />
        </div>

        <PlansList
          pieData={pieData}
          activeButton={activeButton}
          showTooltip={showTooltip}
          onItemClick={onButtonClick}
        />
      </div>
    </div>
  );
}
