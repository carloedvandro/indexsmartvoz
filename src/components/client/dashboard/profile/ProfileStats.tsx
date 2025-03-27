
import { Tables } from "@/integrations/supabase/types";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { useProfile } from "@/hooks/useProfile";
import { useNetworkMembersStatus } from "@/components/client/dashboard/hooks/useNetworkMembersStatus";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface ProfileStatsProps {
  profileId: string;
}

export const ProfileStats = ({ profileId }: ProfileStatsProps) => {
  const { data: networkStats } = useNetworkStats(profileId);
  const { data: profile } = useProfile();
  const [networkId, setNetworkId] = useState<string | undefined>(undefined);
  
  // Fetch the network ID
  useEffect(() => {
    const fetchNetworkId = async () => {
      if (profileId) {
        const { data } = await supabase
          .from("network")
          .select("id")
          .eq("user_id", profileId)
          .maybeSingle();
        
        if (data) {
          setNetworkId(data.id);
        }
      }
    };
    
    fetchNetworkId();
  }, [profileId]);

  // Use the members status hook to get accurate counts
  const { data: memberCounts } = useNetworkMembersStatus(profileId, networkId);
  
  // Calculate total network size using either method
  const totalNetworkSize = memberCounts 
    ? memberCounts.active + memberCounts.pending
    : networkStats
      ? networkStats.level1Count + networkStats.level2Count + networkStats.level3Count + networkStats.level4Count
      : 0;

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
        <p className="font-medium capitalize">{profile?.status || 'Ativo'}</p>
      </div>
    </div>
  );
};
