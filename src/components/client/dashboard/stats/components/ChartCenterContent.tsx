
import React from "react";
import { formatCurrency } from "@/utils/format";

interface ChartCenterContentProps {
  totalSalesAmount: number;
}

export const ChartCenterContent: React.FC<ChartCenterContentProps> = ({ totalSalesAmount }) => {
  return (
    <>
      <text
        x="50%"
        y="43%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-base"
        style={{ fontSize: '16px', fontWeight: 'normal' }}
        fill="#000000"
      >
        Vendas do Mês
      </text>
      <text
        x="50%"
        y="58%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-lg font-bold"
        style={{ fontWeight: 700, fontSize: '18px' }}
        fill="#13a302"
      >
        {formatCurrency(totalSalesAmount)}
      </text>
    </>
  );
};
