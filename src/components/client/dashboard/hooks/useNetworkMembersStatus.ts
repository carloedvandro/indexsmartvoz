
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NetworkMember {
  id: string;
  full_name: string;
  email: string;
  status: string;
  created_at: string;
}

export const useNetworkMembersStatus = () => {
  const [members, setMembers] = useState<NetworkMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNetworkMembers = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: networkData, error } = await supabase
          .from('network')
          .select(`
            member:profiles!network_member_id_fkey(
              id,
              full_name,
              email,
              status,
              created_at
            )
          `)
          .eq('user_id', user.id);

        if (error) throw error;

        const membersData = networkData
          ?.map(item => item.member)
          .filter(Boolean)
          .flat() as NetworkMember[];

        setMembers(membersData || []);
      } catch (error) {
        console.error('Erro ao buscar membros da rede:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar os membros da rede."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchNetworkMembers();
  }, [toast]);

  const activeMembers = members.filter(member => member.status === 'active').length;
  const pendingMembers = members.filter(member => member.status === 'pending').length;
  const inactiveMembers = members.filter(member => member.status === 'inactive').length;

  return {
    members,
    activeMembers,
    pendingMembers,
    inactiveMembers,
    isLoading
  };
};
