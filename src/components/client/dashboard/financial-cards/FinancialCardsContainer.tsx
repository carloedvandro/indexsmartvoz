
import { FinancialCard } from "./FinancialCard";
import { defaultFinancialCardsData, financialCardsConfig } from "./FinancialCardsData";

export function FinancialCardsContainer() {
  // These values would typically come from an API call in a real app
  const { availableBalance, totalEarnings, forecastBonus } = defaultFinancialCardsData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-4 mb-6 w-full">
      {financialCardsConfig.map((config) => (
        <FinancialCard
          key={config.key}
          to={config.path}
          bgColor={config.bgColor}
          hoverColor={config.hoverColor}
          amount={defaultFinancialCardsData[config.key as keyof typeof defaultFinancialCardsData]}
          label={config.label}
        />
      ))}
    </div>
  );
}
