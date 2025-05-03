
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
        <p className="text-sm">{payload[0].value} vendas</p>
        <p className="text-sm font-medium">{formatCurrency(payload[0].payload.totalAmount)}</p>
      </div>
    );
  }
  return null;
};
