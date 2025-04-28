
import { LineStatusCard } from "./LineStatusCard";
import { RechargesCard } from "./RechargesCard";
import { ActivationsCard } from "./ActivationsCard";
import { SalesDetailsCard } from "./SalesDetailsCard";
import { IncomeCard } from "./IncomeCard";

export function StatsCardsGrid() {
  return (
    <>
      <LineStatusCard />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-[1800px] mx-auto">
        <RechargesCard />
        <SalesDetailsCard />
        <ActivationsCard />
      </div>
      <IncomeCard />
    </>
  );
}
