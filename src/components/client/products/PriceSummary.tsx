
interface PriceSummaryProps {
  linePrice: number;
  totalPrice: number;
}

export function PriceSummary({ linePrice, totalPrice }: PriceSummaryProps) {
  return (
    <div className="flex justify-between items-center font-medium">
      <span>Total mensal:</span>
      <span>R$ {totalPrice.toFixed(2)}/mês</span>
    </div>
  );
}
