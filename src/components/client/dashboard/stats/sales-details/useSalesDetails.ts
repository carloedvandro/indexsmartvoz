
import { useState, useEffect } from "react";
import { SalesPlanData, generateSalesData, calculateTotalSalesAmount, TimePeriod } from "./salesDetailsData";

export function useSalesDetails() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState<{ x: number; y: number; data: SalesPlanData } | null>(null);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("monthly");
  
  const pieData = generateSalesData(timePeriod);
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
  
  const handlePeriodChange = (period: TimePeriod) => {
    setTimePeriod(period);
  };

  return {
    pieData,
    activeIndex,
    activeButton,
    showTooltip,
    tooltipData,
    totalSalesAmount,
    onButtonClick,
    timePeriod,
    handlePeriodChange
  };
}
