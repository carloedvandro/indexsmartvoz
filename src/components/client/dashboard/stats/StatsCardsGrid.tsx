
import { LineStatusCard } from "./LineStatusCard";
import { RechargesCard } from "./RechargesCard";
import { ActivationsCard } from "./ActivationsCard";
import { SalesDetailsCard } from "./SalesDetailsCard";
import { RevenueByMonthChart } from "../charts/RevenueByMonthChart";

export function StatsCardsGrid() {
  return (
    <div className="px-4">
      <div className="grid grid-cols-1 gap-3 mb-3 max-w-[1800px] mx-auto">
        <LineStatusCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-[1800px] mx-auto">
        <div className="w-full">
          <RechargesCard />
        </div>
        <div className="w-full">
          <ActivationsCard />
        </div>
        <div className="w-full">
          <SalesDetailsCard />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 mt-3 max-w-[1800px] mx-auto">
        <RevenueByMonthChart />
      </div>
    </div>
  );
}
