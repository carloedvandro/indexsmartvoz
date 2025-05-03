
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SalesChart } from "./sales-details/SalesChart";
import { PlansList } from "./sales-details/PlansList";
import { useSalesDetails } from "./sales-details/useSalesDetails";

export function SalesDetailsCard() {
  const isMobile = useIsMobile();
  const { 
    pieData, 
    activeIndex, 
    activeButton,
    showTooltip,
    totalSalesAmount,
    onButtonClick
  } = useSalesDetails();

  return (
    <div className="pl-0 h-[550px]">
      <div className="flex items-start mb-4 ml-[9px]">
        <h3 className="text-lg font-bold text-black pt-[4px]">Detalhe das Vendas</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <SalesChart 
          pieData={pieData} 
          activeIndex={activeIndex}
          totalSalesAmount={totalSalesAmount}
        />

        <div className="w-full space-y-4 -mt-[0.5px] ml-[9px]">
          <PlansList 
            pieData={pieData} 
            activeButton={activeButton}
            showTooltip={showTooltip}
            onButtonClick={onButtonClick}
          />
        </div>
      </div>
    </div>
  );
}
