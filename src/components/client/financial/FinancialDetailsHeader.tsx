
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";

interface FinancialHeaderProps {
  monthLabel: string;
  selectedYear: string;
}

export function FinancialHeader({ monthLabel, selectedYear }: FinancialHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-[#5f0889] border-b border-white/10 z-50">
      <ParticlesBackground style="default" />
      <div className="h-full flex items-center px-6 relative z-10">
        <div className="flex flex-col max-w-xs truncate">
          <h1 className="text-sm text-gray-400 font-normal leading-tight">Financeiro</h1>
          <h2 className="text-base text-white font-medium leading-6 truncate">Extrato Detalhado - {monthLabel} / {selectedYear}</h2>
        </div>
      </div>
    </div>
  );
}
