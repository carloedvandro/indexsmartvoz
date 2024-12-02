import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface NetworkMemberRPC {
  id: string;
  user_id: string;
  parent_id: string;
  level: number;
}

interface MembersStatus {
  active: number;
  pending: number;
}

export const useNetworkMembersStatus = (userId: string | undefined, networkId: string | undefined) => {
  return useQuery({
    queryKey: ['networkMembersStatus', userId],
    queryFn: async () => {
      if (!userId || !networkId) return null;

      console.log("Fetching members status for network:", networkId);

      const { data: allNetworkData, error: networkError } = await supabase
        .rpc('get_all_network_members', { 
          root_network_id: networkId 
        }) as { data: NetworkMemberRPC[] | null, error: any };

      if (networkError) {
        console.error("Error fetching network members:", networkError);
        return { active: 0, pending: 0 };
      }

      if (!allNetworkData || !Array.isArray(allNetworkData)) {
        console.log("No network members found or invalid data format");
        return { active: 0, pending: 0 };
      }

      // Remove duplicatas e o próprio usuário
      const validMembers = allNetworkData.filter(member => 
        member.user_id !== userId
      );
      
      // Usa Set para garantir que não há duplicatas de user_id
      const networkUserIds = [...new Set(validMembers.map(item => item.user_id))];

      console.log("Valid members count:", validMembers.length);
      console.log("Unique network user IDs:", networkUserIds.length);

      if (networkUserIds.length === 0) {
        return { active: 0, pending: 0 };
      }

      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('status')
        .in('id', networkUserIds);

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        return { active: 0, pending: 0 };
      }

      if (!profilesData) {
        console.log("No profiles found");
        return { active: 0, pending: 0 };
      }

      console.log("Profiles data:", profilesData);

      const active = profilesData.filter(p => p.status === 'active').length;
      const pending = profilesData.filter(p => p.status === 'pending').length;

      console.log("Active members:", active);
      console.log("Pending members:", pending);
      console.log("Total members:", active + pending);

      return { active, pending };
    },
    enabled: !!userId && !!networkId
  });
};