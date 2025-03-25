
interface FinancialHeaderProps {
  monthLabel: string;
  selectedYear: string;
}

export function FinancialHeader({ monthLabel, selectedYear }: FinancialHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-[#a46b31] to-[#5f0889] border-b border-white/10 z-50" style={{ background: 'linear-gradient(120deg, #a46b31, #5f0889)' }}>
      <div className="h-full flex items-center px-6 relative z-10">
        <div className="flex flex-col max-w-xs truncate">
          <h1 className="text-sm text-gray-400 font-normal leading-tight">Financeiro</h1>
          <h2 className="text-base text-white font-medium leading-6 truncate">Extrato Detalhado - {monthLabel} / {selectedYear}</h2>
        </div>
      </div>
    </div>
  );
}
