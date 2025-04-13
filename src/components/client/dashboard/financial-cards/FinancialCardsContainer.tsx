
import { DollarSign, AreaChart } from "lucide-react";
import { FinancialCard } from "./FinancialCard";
import { defaultFinancialCardsData } from "./FinancialCardsData";

export function FinancialCardsContainer() {
  // These would typically come from an API call in a real app
  const { availableBalance, totalEarnings, forecastBonus } = defaultFinancialCardsData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mb-6">
      {/* Saldo Disponível Card */}
      <FinancialCard
        to="/client/financial"
        bgColor="bg-green-500"
        hoverColor="hover:bg-green-600"
        icon={DollarSign}
        amount={availableBalance}
        label="Saldo Disponível"
      />

      {/* Ganhos até hoje Card */}
      <FinancialCard
        to="/client/financial"
        bgColor="bg-yellow-400"
        hoverColor="hover:bg-yellow-500"
        icon={AreaChart}
        amount={totalEarnings}
        label="Ganhos até hoje"
      />

      {/* Previsão de Ganhos Card */}
      <FinancialCard
        to="/client/earnings-forecast"
        bgColor="bg-cyan-500"
        hoverColor="hover:bg-cyan-600"
        icon={AreaChart}
        amount={forecastBonus}
        label="Previsão de Ganhos"
      />
    </div>
  );
}
