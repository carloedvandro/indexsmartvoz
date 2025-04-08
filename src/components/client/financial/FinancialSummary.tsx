
import { formatCurrency } from "@/utils/format";
import { Transaction } from "./types";

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
      <div 
        className="bg-white text-black py-3 px-5 rounded-lg w-full md:flex-1 cursor-pointer hover:bg-gray-50 transition-colors shadow-md relative overflow-hidden border border-gray-100"
        onClick={() => onCardClick('earnings')}
      >
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/6a236bed-4542-4d66-a0b3-5bacb93aa949.png" 
              alt="Ícone de cifrão dourado" 
              className="h-12 w-12 object-contain" 
            />
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-black">{formatCurrency(42576.22)}</p>
            <p className="text-xs text-gray-500">Ganhos até hoje</p>
          </div>
        </div>
      </div>
      <div 
        className="bg-white text-black py-3 px-5 rounded-lg w-full md:flex-1 cursor-pointer hover:bg-gray-50 transition-colors shadow-md relative overflow-hidden border border-gray-100"
        onClick={() => onCardClick('balance')}
      >
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/6a236bed-4542-4d66-a0b3-5bacb93aa949.png" 
              alt="Ícone de cifrão dourado" 
              className="h-12 w-12 object-contain" 
            />
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-black">{formatCurrency(610690.89)}</p>
            <p className="text-xs text-gray-500">Total de saldo</p>
          </div>
        </div>
      </div>
      <div 
        className="bg-white text-black py-3 px-5 rounded-lg w-full md:flex-1 cursor-pointer hover:bg-gray-50 transition-colors shadow-md relative overflow-hidden border border-gray-100"
        onClick={() => onCardClick('available')}
      >
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/6a236bed-4542-4d66-a0b3-5bacb93aa949.png" 
              alt="Ícone de cifrão dourado" 
              className="h-12 w-12 object-contain" 
            />
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-black">{formatCurrency(5000.01)}</p>
            <p className="text-xs text-gray-500">Saldo disponível</p>
          </div>
        </div>
      </div>
    </div>
  );
}
