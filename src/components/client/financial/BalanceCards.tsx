
import { Card } from "@/components/ui/card";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";

interface BalanceCardsProps {
  selectedMonth: string;
  selectedYear: string;
  months: { value: string; label: string }[];
  onCardClick: () => void;
}

export function BalanceCards({
  selectedMonth,
  selectedYear,
  months,
  onCardClick,
}: BalanceCardsProps) {
  const selectedMonthLabel = months.find(
    (month) => month.value === selectedMonth
  )?.label;

  return (
    <div className="relative">
      <div className="mb-6">
        <span className="text-sm text-gray-500">
          Dados referentes a {selectedMonthLabel} de {selectedYear}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card
          className="relative overflow-hidden bg-gradient-to-br from-[#46005e] to-[#5f0889] p-6 cursor-pointer"
          onClick={onCardClick}
        >
          <div className="relative z-10">
            <div className="flex flex-col">
              <span className="text-sm text-white/80">Saldo Atual</span>
              <span className="text-2xl font-medium text-white">R$ 5.000,01</span>
            </div>

            <div className="mt-6">
              <div className="flex flex-col">
                <span className="text-sm text-white/80">Saldo Previsto</span>
                <span className="text-lg font-medium text-white">R$ 0,00</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="absolute inset-0 bg-white">
        <ParticlesBackground />
      </div>
    </div>
  );
}
