interface PriceSummaryProps {
  linePrice: number;
  totalPrice: number;
}

export function PriceSummary({ linePrice, totalPrice }: PriceSummaryProps) {
  return (
    <>
      <div className="p-4 bg-purple-50 rounded-lg mb-4">
        <div className="flex justify-between items-center font-medium">
          <span>Total mensal:</span>
          <span>R$ {totalPrice.toFixed(2)}/mês</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Valor da linha:</span>
        <span className="font-medium">R$ {linePrice.toFixed(2)}/mês</span>
      </div>
    </>
  );
}