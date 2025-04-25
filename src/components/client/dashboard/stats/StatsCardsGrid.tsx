
import { LineStatusCard } from "./LineStatusCard";
import { RechargesCard } from "./RechargesCard";
import { ActivationsCard } from "./ActivationsCard";
import { SalesDetailsCard } from "./SalesDetailsCard";

export function StatsCardsGrid() {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 mb-4 max-w-[1800px] mx-auto px-4">
        <LineStatusCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-[1800px] mx-auto px-4 mb-6">
        <RechargesCard />
        <ActivationsCard />
        <SalesDetailsCard />
      </div>
    </>
  );
}
