
import { LineStatusCard } from "./LineStatusCard";
import { RechargesCard } from "./RechargesCard";
import { ActivationsCard } from "./ActivationsCard";
import { SalesDetailsCard } from "./SalesDetailsCard";

export function StatsCardsGrid() {
  return (
    <div className="px-4">
      <div className="grid grid-cols-1 gap-3 mb-3 max-w-[1800px] mx-auto">
        <LineStatusCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-[1800px] mx-auto">
        <div className="w-full flex justify-start">
          <div className="w-[90%]">
            <RechargesCard />
          </div>
        </div>
        <div className="w-full flex justify-start">
          <div className="w-[90%]">
            <ActivationsCard />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="w-[90%]">
            <SalesDetailsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
