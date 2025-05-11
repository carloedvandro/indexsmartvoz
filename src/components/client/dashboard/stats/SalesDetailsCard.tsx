
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
  
  // Data with both percentage values and sales counts - updated with accurate sales values and prices
  const pieData: PieDataItem[] = [
    { 
      name: "110GB", 
      fullName: "Smartvoz 110GB + Minutos ilimitados", 
      value: 22, // Percentage value for pie chart sizing
      price: 109.99,
      totalAmount: 305 * 109.99, // Total = sales count * price
      percentage: 22,
      salesCount: 305, // Actual number of sales 
      color: "#8a5cf6" // Bright purple
    },
    { 
      name: "120GB", 
      fullName: "Smartvoz 120GB + Minutos ilimitados", 
      value: 36,
      price: 119.99,
      totalAmount: 428 * 119.99, // Total = sales count * price
      percentage: 36,
      salesCount: 428, // Actual number of sales
      color: "#0cc7f0" // Bright cyan
    },
    { 
      name: "140GB", 
      fullName: "Smartvoz 140GB + Minutos ilimitados", 
      value: 42,
      price: 139.99,
      totalAmount: 501 * 139.99, // Total = sales count * price
      percentage: 42,
      salesCount: 501, // Actual number of sales
      color: "#0ea5e9" // Bright blue
    }
  ];

  // Calculate the actual total sales amount by summing the totalAmount of each plan
  const totalSalesAmount = pieData.reduce((acc, plan) => {
    return acc + plan.totalAmount;
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
    <div className="pl-0 h-[550px] bg-transparent">
      <div className="flex items-start mb-4 ml-[9px] bg-transparent">
        <h3 className="text-lg font-bold text-black pt-[4px]">Detalhe das Vendas</h3>
      </div>
      
      <div className="flex flex-col items-center bg-transparent">
        <div className={`w-full max-w-[420px] h-[300px] relative flex items-center justify-center -mt-[2px] bg-transparent ${isMobile ? "mt-2" : ""}`}>
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
