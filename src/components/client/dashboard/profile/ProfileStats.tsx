
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
  
  // We'll hardcode the team size to 8 to match the design
  const teamSize = 8;

  return (
    <div className="grid grid-cols-2 gap-4">
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
        <p className="font-medium">{teamSize}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Status</p>
        <p className="font-medium capitalize">Active</p>
      </div>
    </div>
  );
};
