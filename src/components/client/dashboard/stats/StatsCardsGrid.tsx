
import { LineStatusCard } from "./LineStatusCard";
import { RechargesCard } from "./RechargesCard";
import { ActivationsCard } from "./ActivationsCard";
import { SalesDetailsCard } from "./SalesDetailsCard";

export function StatsCardsGrid() {
  return (
    <div className="px-4 mb-6">
      <div className="grid grid-cols-1 gap-4 mb-4 w-full">
        <LineStatusCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-[1800px] mx-auto">
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
