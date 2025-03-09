
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { StatsCard } from "@/components/ui/stats-card";

interface ProfileStatsProps {
  profileId: string;
}

export const ProfileStats = ({ profileId }: ProfileStatsProps) => {
  const { data: networkStats } = useNetworkStats(profileId);
  const totalNetworkSize = networkStats ? 
    networkStats.level1Count + networkStats.level2Count + networkStats.level3Count + networkStats.level4Count : 
    0;

  return (
    <div className="grid grid-cols-2 gap-2">
      <StatsCard title="Plano Atual" value="Pago" color="#00ca7d" />
      <StatsCard title="Pontos" value="0" color="#00ca7d" />
      <StatsCard title="Equipe" value={totalNetworkSize.toString()} color="#00ca7d" />
      <StatsCard title="Status" value="Ativo" color="#00ca7d" />
    </div>
  );
};
