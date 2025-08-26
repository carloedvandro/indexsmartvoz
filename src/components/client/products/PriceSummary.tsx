import { formatCurrency } from "@/utils/format";

interface PriceSummaryProps {
  linePrice: number;
  totalPrice: number;
}

export function PriceSummary({ linePrice, totalPrice }: PriceSummaryProps) {
  return (
    <div className="p-3 bg-purple-50 mt-3 rounded-lg">
      <div className="flex justify-between items-center font-medium">
        <span className="pl-[8px]">Total mensal:</span>
        <span className="pr-[8px]">{formatCurrency(totalPrice)}/mês</span>
      </div>
    </div>
  );
}
