
import { Card } from "@/components/ui/card";

interface BalanceCardsProps {
  selectedMonth: string;
  selectedYear: string;
  months: Array<{ value: string; label: string }>;
  onCardClick: () => void;
}

export function BalanceCards({ selectedMonth, selectedYear, months, onCardClick }: BalanceCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Card 
        className="relative p-4 border rounded-lg bg-white cursor-pointer"
        onClick={onCardClick}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start max-md:flex-col max-md:items-stretch">
              <div className="text-gray-900 font-medium text-[15px] whitespace-nowrap">
                Total de bônus recebido em {months.find(m => m.value === selectedMonth)?.label}/{selectedYear}
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
      </Card>

      <Card 
        className="relative p-4 border border-gray-200 rounded-lg overflow-hidden bg-[#5f0889] text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-xl">$</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm">Saldo Disponível</span>
              <span className="text-xl font-semibold">R$ 5.000,01</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
