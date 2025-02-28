
interface PriceSummaryProps {
  linePrice: number;
  totalPrice: number;
}

export function PriceSummary({ linePrice, totalPrice }: PriceSummaryProps) {
  return (
    <div className="w-full px-4 max-w-[400px] mx-auto">
      <div className="p-2 bg-purple-50 rounded-lg">
        <div className="flex justify-between items-center font-medium">
          <span>Total mensal:</span>
          <span>R$ {totalPrice.toFixed(2)}/mês</span>
        </div>
      </div>
    </div>
  );
}
