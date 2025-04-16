
import { LineStatusCard } from "./LineStatusCard";
import { RechargesCard } from "./RechargesCard";
import { ActivationsCard } from "./ActivationsCard";
import { SalesDetailsCard } from "./SalesDetailsCard";

export function StatsCardsGrid() {
  return (
    <div className="px-4 mb-6">
      <div className="grid grid-cols-1 gap-4 mb-6 w-full">
        <LineStatusCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="md:col-span-1 w-full">
          <RechargesCard />
        </div>
        <div className="md:col-span-1 w-full">
          <ActivationsCard />
        </div>
        <div className="md:col-span-1 w-full">
          <SalesDetailsCard />
        </div>
      </div>
    </div>
  );
}
