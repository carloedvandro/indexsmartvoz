
import { Tables } from "@/integrations/supabase/types";
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
      <StatsCard title="Plano Atual" value="Pago" />
      <StatsCard title="Pontos" value="0" />
      <StatsCard title="Equipe" value={totalNetworkSize.toString()} />
      <StatsCard title="Status" value="Ativo" />
    </div>
  );
};
