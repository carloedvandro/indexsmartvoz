
import { StatsCard } from "@/components/ui/stats-card";

interface BalanceCardsProps {
  selectedMonth: string;
  selectedYear: string;
  months: Array<{ value: string; label: string }>;
  onCardClick: (cardType: string) => void;
}

export function BalanceCards({ selectedMonth, selectedYear, months, onCardClick }: BalanceCardsProps) {
  const monthLabel = months.find(m => m.value === selectedMonth)?.label || "Fevereiro";
  
  return (
    <div className="grid grid-cols-1 gap-4">
      <div onClick={() => onCardClick('available')} className="cursor-pointer">
        <StatsCard 
          title="Saldo disponível" 
          value="R$ 5.000,01"
          color="#00ca7d"
        />
      </div>

      <div 
        className="relative p-4 border border-gray-200 rounded-xl bg-white cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
        onClick={() => onCardClick('bonus')}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00ca7d] rounded-l-xl" />
        <div className="flex flex-col gap-3 pl-2">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start max-md:flex-col max-md:items-stretch">
              <div className="text-gray-900 font-medium text-[15px] whitespace-nowrap">
                Total de bônus recebido em {monthLabel}/{selectedYear}
              </div>
              <div className="flex items-center gap-1 mt-2 md:mt-0 justify-end">
                <span className="text-gray-500">R$</span>
                <span className="text-gray-500">42.576,22</span>
              </div>
            </div>
          </div>
          <div className="h-[1px] bg-gray-200 w-full"></div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="text-gray-900 font-medium">Total de saldo</span>
              <span className="text-red-500 font-medium">bloqueado</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-gray-500">R$</span>
              <span className="text-gray-500">0,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
