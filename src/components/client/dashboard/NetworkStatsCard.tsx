
import { NetworkStatsHeader } from "./components/NetworkStatsHeader";
import { NetworkStatsGrid } from "./components/NetworkStatsGrid";

export const NetworkStatsCard = () => {
  return (
    <div className="px-6 mb-12">
      <NetworkStatsHeader />
      <NetworkStatsGrid />
    </div>
  );
};
