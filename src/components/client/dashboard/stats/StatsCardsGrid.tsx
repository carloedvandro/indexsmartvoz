
import { LineStatusCard } from "./LineStatusCard";
import { RechargesCard } from "./RechargesCard";
import { ActivationsCard } from "./ActivationsCard";
import { IncomeCard } from "./IncomeCard";
import { SalesDetailsCard } from "./SalesDetailsCard";
import { RiskGaugeCard } from "./RiskGaugeCard";

export function StatsCardsGrid() {
  return (
    <>
      <LineStatusCard />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <RechargesCard />
        <ActivationsCard />
      </div>
      <IncomeCard />
      <RiskGaugeCard />
      <SalesDetailsCard />
    </>
  );
}
