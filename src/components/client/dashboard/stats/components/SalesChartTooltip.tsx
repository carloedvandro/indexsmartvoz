
import { formatCurrency } from "@/utils/format";

interface SalesChartTooltipProps {
  active: boolean;
  payload: any[];
}

export const SalesChartTooltip = ({ active, payload }: SalesChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-md shadow-lg border border-gray-200">
        <p className="text-sm font-medium">{payload[0].payload.fullName}</p>
        <p className="text-sm">
          {payload[0].payload.salesCount} vendas <span className="relative -top-[2px]">{formatCurrency(payload[0].payload.totalAmount)}</span>
        </p>
      </div>
    );
  }
  return null;
};
