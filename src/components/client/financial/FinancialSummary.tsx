
interface FinancialSummaryProps {
  selectedMonth: string;
  selectedYear: string;
  months: Array<{ value: string; label: string }>;
  onCardClick: () => void;
}

export function FinancialSummary({ 
  selectedMonth, 
  selectedYear, 
  months,
  onCardClick
}: FinancialSummaryProps) {
  const monthLabel = months.find(m => m.value === selectedMonth)?.label || "Fevereiro";

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8 mx-auto w-full md:w-[680px]">
      <div className="bg-[#5f0889] text-white py-3 px-5 rounded-lg w-full md:flex-1">
        <div className="text-xl font-bold mb-1">R$ 42.576,22</div>
        <div className="text-sm">Total de ganhos em {monthLabel}/{selectedYear}</div>
      </div>
      <div className="bg-[#E3F2FD] py-3 px-5 rounded-lg w-full md:flex-1">
        <div className="text-xl font-bold mb-1">R$ 47.576,23</div>
        <div className="text-sm text-gray-600">Saldo em {monthLabel}/{selectedYear}</div>
      </div>
      <div 
        className="bg-[#E3F2FD] py-3 px-5 rounded-lg w-full md:flex-1 cursor-pointer"
        onClick={onCardClick}
      >
        <div className="text-xl font-bold mb-1">R$ 5.000,01</div>
        <div className="text-sm text-gray-600">Saldo disponível em {monthLabel}/{selectedYear}</div>
      </div>
    </div>
  );
}
