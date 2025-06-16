
import { formatCurrency } from '@/utils/format';

interface PriceSummaryProps {
  linePrice: number;
  totalPrice: number;
}

export function PriceSummary({ linePrice, totalPrice }: PriceSummaryProps) {
  return (
    <div className="w-full max-w-[365px] mx-auto">
      <div className="p-3 bg-purple-50 rounded-lg">
        <div className="flex justify-between items-center font-medium">
          <span className="pl-[8px]">Total mensal:</span>
          <span className="pr-[8px]">{formatCurrency(totalPrice)}/mês</span>
        </div>
      </div>
    </div>
  );
}
