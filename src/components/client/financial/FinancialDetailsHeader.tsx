
interface FinancialHeaderProps {
  monthLabel: string;
  selectedYear: string;
}

export function FinancialHeader({ monthLabel, selectedYear }: FinancialHeaderProps) {
  return (
    <div className="h-full flex items-center px-6 relative z-10">
      <div className="flex flex-col">
        <h1 className="text-xs text-gray-400 font-normal leading-tight">Financeiro</h1>
        <h2 className="text-sm text-white font-medium leading-6">Extrato Detalhado - {monthLabel} / {selectedYear}</h2>
      </div>
    </div>
  );
}
