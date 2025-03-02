
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";

type FinancialHeaderProps = {
  selectedMonth?: string;
  selectedYear?: string;
  months?: Array<{ value: string; label: string }>;
};

export function FinancialHeader({ selectedMonth = "5", selectedYear = "2018", months = [] }: FinancialHeaderProps) {
  const monthLabel = months.find(m => m.value === selectedMonth)?.label || "Maio";
  
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-[#46005e] border-b border-white/10 z-50">
      <ParticlesBackground style="default" />
      <div className="h-full flex items-center px-6 relative z-10">
        <div className="flex flex-col max-w-xs truncate">
          <h1 className="text-sm text-gray-400 font-normal leading-tight">Financeiro</h1>
          <h2 className="text-base text-white font-medium leading-6 truncate">Resumo - {monthLabel} / {selectedYear}</h2>
        </div>
      </div>
    </div>
  );
}
