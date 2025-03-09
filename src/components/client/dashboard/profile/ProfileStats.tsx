
import { Tables } from "@/integrations/supabase/types";
import { useNetworkStats } from "@/hooks/useNetworkStats";

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
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Plano Atual</p>
        <p className="font-medium">Pago</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Pontos</p>
        <p className="font-medium">0</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Equipe</p>
        <p className="font-medium">{totalNetworkSize}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Status</p>
        <p className="font-medium capitalize">Ativo</p>
      </div>
    </div>
  );
};
