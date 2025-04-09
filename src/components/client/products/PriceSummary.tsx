
interface PriceSummaryProps {
  linePrice: number;
  totalPrice: number;
}

export function PriceSummary({ linePrice, totalPrice }: PriceSummaryProps) {
  return (
    <div className="w-full max-w-[365px] mx-auto">
      <div className="p-2 bg-purple-50 rounded-lg">
        <div className="flex justify-between items-center font-medium">
          <span className="pl-[4px]">Total mensal:</span>
          <span className="pr-[4px]">R$ {totalPrice.toFixed(2)}/mês</span>
        </div>
      </div>
    </div>
  );
}
