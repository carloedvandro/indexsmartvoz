interface PriceSummaryProps {
  selectedLines: Array<{
    id: number;
    internet: string;
    type: string;
    ddd: string;
    price: number;
  }>;
  selectedDueDate: number | null;
  setSelectedDueDate: (date: number) => void;
}

export function PriceSummary({ selectedLines }: PriceSummaryProps) {
  const totalPrice = selectedLines.reduce((acc, line) => acc + (line.price || 0), 0);

  return (
    <>
      <div className="p-4 bg-purple-50 rounded-lg">
        <div className="flex justify-between items-center font-medium">
          <span>Total mensal:</span>
          <span>R$ {totalPrice.toFixed(2)}/mês</span>
        </div>
      </div>
    </>
  );
}