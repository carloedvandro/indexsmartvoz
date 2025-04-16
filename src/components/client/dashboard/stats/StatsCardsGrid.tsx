
import { LineStatusCard } from "./LineStatusCard";
import { RechargesCard } from "./RechargesCard";
import { ActivationsCard } from "./ActivationsCard";
import { SalesDetailsCard } from "./SalesDetailsCard";

export function StatsCardsGrid() {
  return (
    <div className="px-6 mt-6">
      <div className="grid grid-cols-1 gap-5">
        <LineStatusCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <div className="md:col-span-1">
          <RechargesCard />
        </div>
        <div className="md:col-span-1">
          <ActivationsCard />
        </div>
        <div className="md:col-span-1">
          <SalesDetailsCard />
        </div>
      </div>
    </div>
  );
}
