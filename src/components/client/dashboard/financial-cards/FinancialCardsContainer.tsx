
import { FinancialCard } from "./FinancialCard";
import { defaultFinancialCardsData } from "./FinancialCardsData";

export function FinancialCardsContainer() {
  // These would typically come from an API call in a real app
  const { availableBalance, totalEarnings, forecastBonus } = defaultFinancialCardsData;
  
  // Usando a mesma imagem para todos os cards
  const dollarIconPath = "/lovable-uploads/5a0ae515-1262-43ad-9324-72c3408c828b.png";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mb-6">
      {/* Saldo Disponível Card */}
      <FinancialCard
        to="/client/financial"
        bgColor="bg-white"
        imageSrc={dollarIconPath}
        amount={availableBalance}
        label="Saldo Disponível"
      />

      {/* Ganhos até hoje Card */}
      <FinancialCard
        to="/client/financial"
        bgColor="bg-white"
        imageSrc={dollarIconPath}
        amount={totalEarnings}
        label="Ganhos até hoje"
      />

      {/* Previsão de Ganhos Card */}
      <FinancialCard
        to="/client/earnings-forecast"
        bgColor="bg-white"
        imageSrc={dollarIconPath}
        amount={forecastBonus}
        label="Previsão de Ganhos"
      />
    </div>
  );
}
