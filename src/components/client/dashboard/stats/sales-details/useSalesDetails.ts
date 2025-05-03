
import { useState, useEffect } from "react";
import { SalesPlanData, generateSalesData, calculateTotalSalesAmount } from "./salesDetailsData";

export function useSalesDetails() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState<{ x: number; y: number; data: SalesPlanData } | null>(null);
  
  const pieData = generateSalesData();
  const totalSalesAmount = calculateTotalSalesAmount(pieData);

  // Reset active states when data changes
  useEffect(() => {
    setActiveIndex(null);
    setActiveButton(null);
    setShowTooltip(false);
  }, [pieData]);

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

  return {
    pieData,
    activeIndex,
    activeButton,
    showTooltip,
    tooltipData,
    totalSalesAmount,
    onButtonClick
  };
}
