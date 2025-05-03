
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatCurrency } from "@/utils/format";
import { PieChartSection } from "./PieChartSection";
import { SalesLegend } from "./SalesLegend";
import { SalesDataItem } from "./types";

export function SalesDetailsCard() {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState<{ x: number; y: number; data: any } | null>(null);
  
  const pieData: SalesDataItem[] = [
    { 
      name: "110GB", 
      fullName: "Smartvoz 110GB + Minutos ilimitados", 
      value: 340, 
      price: 119.99,
      totalAmount: 340 * 119.99,
      color: "#D946EF", // Magenta Pink (more vibrant)
      percentage: 17
    },
    { 
      name: "120GB", 
      fullName: "Smartvoz 120GB + Minutos ilimitados", 
      value: 480, 
      price: 129.99,
      totalAmount: 480 * 129.99,
      color: "#1EAEDB", // Bright Blue (more vibrant)
      percentage: 24
    },
    { 
      name: "130GB", 
      fullName: "Smartvoz 130GB + Minutos ilimitados", 
      value: 620, 
      price: 139.99,
      totalAmount: 620 * 139.99,
      color: "#8B5CF6", // Vivid Purple (more vibrant)
      percentage: 31
    },
    { 
      name: "140GB", 
      fullName: "Smartvoz 140GB + Minutos ilimitados", 
      value: 380, 
      price: 149.99,
      totalAmount: 380 * 149.99,
      color: "#9b87f5", // Primary Purple (more vibrant)
      percentage: 19
    },
    { 
      name: "150GB", 
      fullName: "Smartvoz 150GB + Minutos ilimitados", 
      value: 180, 
      price: 159.99,
      totalAmount: 180 * 159.99,
      color: "#F97316", // Bright Orange (more vibrant)
      percentage: 9
    }
  ];

  // Format currency for each item
  const formattedPieData = pieData.map(item => ({
    ...item,
    formattedAmount: formatCurrency(item.totalAmount)
  }));

  return (
    <div className="pl-0 h-[550px]">
      <div className="flex items-start mb-4 ml-[9px]">
        <h3 className="text-lg font-bold text-black pt-[4px]">Detalhe das Vendas</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <PieChartSection 
          pieData={formattedPieData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />

        <SalesLegend 
          pieData={formattedPieData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          showTooltip={showTooltip}
          setShowTooltip={setShowTooltip}
          tooltipData={tooltipData}
          setTooltipData={setTooltipData}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
      </div>
    </div>
  );
}

