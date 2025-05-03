
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatCurrency } from "@/utils/format";
import { SalesChartTooltip } from "./components/SalesChartTooltip";
import { SalesPieChart } from "./components/SalesPieChart";
import { SalesLegend } from "./components/SalesLegend";
import { PieDataItem, TooltipData } from "./types/salesTypes";

export function SalesDetailsCard() {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  
  const pieData: PieDataItem[] = [
    { 
      name: "110GB", 
      fullName: "Smartvoz 110GB + Minutos ilimitados", 
      value: 300, 
      price: 119.99,
      totalAmount: 300 * 119.99,
      percentage: 17,
      color: "#9b87f5" 
    },
    { 
      name: "120GB", 
      fullName: "Smartvoz 120GB + Minutos ilimitados", 
      value: 250, 
      price: 129.99,
      totalAmount: 250 * 129.99,
      percentage: 21,
      color: "#33C3F0" 
    },
    { 
      name: "130GB", 
      fullName: "Smartvoz 130GB + Minutos ilimitados", 
      value: 200, 
      price: 139.99,
      totalAmount: 200 * 139.99,
      percentage: 13,
      color: "#8B5CF6" 
    },
    { 
      name: "140GB", 
      fullName: "Smartvoz 140GB + Minutos ilimitados", 
      value: 150, 
      price: 149.99,
      totalAmount: 150 * 149.99,
      percentage: 25,
      color: "#0EA5E9" 
    }
    // Removed the 150GB plan
  ];

  const totalSalesAmount = pieData.reduce((acc, plan) => {
    const planTotal = Number((plan.value * plan.price).toFixed(2));
    return acc + planTotal;
  }, 0);

  // Handle clicking on a legend button
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

  // Handle clicking on a pie chart slice
  const handlePieSliceClick = (index: number | null) => {
    setActiveIndex(index);
    setActiveButton(index);
    setShowTooltip(index !== null);
    if (index !== null) {
      setTooltipData({
        x: 0, // These values won't be used for the pie chart tooltip
        y: 0,
        data: pieData[index]
      });
    }
  };

  return (
    <div className="pl-0 h-[550px]">
      <div className="flex items-start mb-4 ml-[9px]">
        <h3 className="text-lg font-bold text-black pt-[4px]">Detalhe das Vendas</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <div className={`w-full max-w-[420px] h-[300px] relative flex items-center justify-center -mt-[2px] ${isMobile ? "mt-2" : ""}`}>
          <SalesPieChart 
            pieData={pieData}
            activeIndex={activeIndex}
            setActiveIndex={handlePieSliceClick}
            totalSalesAmount={totalSalesAmount}
          />
        </div>

        <SalesLegend 
          pieData={pieData}
          activeButton={activeButton}
          onButtonClick={onButtonClick}
          showTooltip={showTooltip}
          tooltipData={tooltipData}
        />
      </div>
    </div>
  );
}
