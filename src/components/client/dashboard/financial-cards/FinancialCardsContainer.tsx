
import { FinancialCard } from "./FinancialCard";
import { defaultFinancialCardsData, financialCardsConfig } from "./FinancialCardsData";

export function FinancialCardsContainer() {
  // These values would typically come from an API call in a real app
  const { availableBalance, totalEarnings, forecastBonus } = defaultFinancialCardsData;

  return (
    <div className="px-4 grid grid-cols-3 gap-4">
      {financialCardsConfig.map((config) => (
        <FinancialCard
          key={config.key}
          to={config.path}
          bgColor={config.bgColor}
          hoverColor={config.hoverColor}
          icon={config.icon}
          amount={defaultFinancialCardsData[config.key as keyof typeof defaultFinancialCardsData]}
          label={config.label}
        />
      ))}
    </div>
  );
}
