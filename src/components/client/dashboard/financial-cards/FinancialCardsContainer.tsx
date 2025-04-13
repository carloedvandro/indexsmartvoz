
import { FinancialCard } from "./FinancialCard";
import { defaultFinancialCardsData } from "./FinancialCardsData";

export function FinancialCardsContainer() {
  // Estes valores normalmente viriam de uma chamada de API em um aplicativo real
  const { availableBalance, totalEarnings, forecastBonus } = defaultFinancialCardsData;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 mb-6">
      {/* Saldo Disponível Card */}
      <FinancialCard
        to="/client/financial"
        bgColor="bg-[#8BC34A]" 
        color="text-white"
        icon="dollar"
        amount={availableBalance}
        label="Saldo Disponível"
      />
    </div>
  );
}
