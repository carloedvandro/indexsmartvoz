
import { LineStatusCard } from "./LineStatusCard";
import { RechargesCard } from "./RechargesCard";
import { ActivationsCard } from "./ActivationsCard";
import { SalesDetailsCard } from "./SalesDetailsCard";

export function StatsCardsGrid() {
  return (
    <div className="px-4 mb-6">
      <div className="grid grid-cols-1 gap-4 mb-6">
        <LineStatusCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 w-full max-w-[280px] ml-auto">
          <RechargesCard />
        </div>
        <div className="md:col-span-1 w-full max-w-[280px] mr-auto">
          <ActivationsCard />
        </div>
        <SalesDetailsCard />
      </div>
    </div>
  );
}
