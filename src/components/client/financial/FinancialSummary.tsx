
import { StatsCard } from "@/components/ui/stats-card";

interface FinancialSummaryProps {
  selectedMonth: string;
  selectedYear: string;
  months: Array<{ value: string; label: string }>;
  onCardClick: (cardType: string) => void;
}

export function FinancialSummary({ 
  selectedMonth, 
  selectedYear, 
  months,
  onCardClick
}: FinancialSummaryProps) {
  const monthLabel = months.find(m => m.value === selectedMonth)?.label || "Fevereiro";

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8 mx-auto w-full md:w-[540px]">
      <div onClick={() => onCardClick('earnings')} className="w-full md:flex-1 cursor-pointer">
        <StatsCard 
          title={`Total de ganhos em ${monthLabel}/${selectedYear}`}
          value="R$ 42.576,22"
        />
      </div>
      
      <div onClick={() => onCardClick('balance')} className="w-full md:flex-1 cursor-pointer">
        <StatsCard 
          title={`Saldo em ${monthLabel}/${selectedYear}`}
          value="R$ 47.576,23"
        />
      </div>
      
      <div onClick={() => onCardClick('available')} className="w-full md:flex-1 cursor-pointer">
        <StatsCard 
          title={`Saldo disponível em ${monthLabel}/${selectedYear}`}
          value="R$ 5.000,01"
        />
      </div>
    </div>
  );
}
