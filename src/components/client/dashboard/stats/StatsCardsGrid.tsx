
import { LineStatusCard } from "./LineStatusCard";
import { RechargesCard } from "./RechargesCard";
import { ActivationsCard } from "./ActivationsCard";
import { RevenueByMonthChart } from "../charts/RevenueByMonthChart";

export function StatsCardsGrid() {
  return (
    <div className="px-4">
      <div className="grid grid-cols-1 gap-3 mb-3 max-w-[1800px] mx-auto">
        <LineStatusCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[1800px] mx-auto">
        <RechargesCard />
        <ActivationsCard />
      </div>
      <div className="grid grid-cols-1 gap-3 mt-3 max-w-[1800px] mx-auto">
        <RevenueByMonthChart />
      </div>
    </div>
  );
}
