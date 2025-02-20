
import { NetworkStatsCard } from "./NetworkStatsCard";
import { InternetUsageCard } from "./InternetUsageCard";

export const PlansCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NetworkStatsCard />
      <InternetUsageCard />
    </div>
  );
};
