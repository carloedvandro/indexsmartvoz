import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { User2 } from "lucide-react";

interface NetworkMember {
  id: string;
  level: number;
  user: {
    full_name: string | null;
    email: string;
    custom_id: string | null;
  };
  children?: NetworkMember[];
}

interface NetworkTreeProps {
  userId: string;
}

export const NetworkTree = ({ userId }: NetworkTreeProps) => {
  const [networkData, setNetworkData] = useState<NetworkMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        // Primeiro, pegamos o network ID do usuário atual
        const { data: userNetwork } = await supabase
          .from("network")
          .select("id")
          .eq("user_id", userId)
          .single();

        if (!userNetwork) return;

        // Depois, buscamos todos os membros conectados
        const { data: members } = await supabase
          .from("network")
          .select(`
            id,
            level,
            parent_id,
            profiles!network_user_id_fkey (
              full_name,
              email,
              custom_id
            )
          `)
          .eq("parent_id", userNetwork.id);

        if (members) {
          const formattedMembers = members.map(member => ({
            id: member.id,
            level: member.level,
            user: {
              full_name: member.profiles?.[0]?.full_name || null,
              email: member.profiles?.[0]?.email || '',
              custom_id: member.profiles?.[0]?.custom_id || null
            }
          }));
          setNetworkData(formattedMembers);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da rede:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchNetworkData();
    }
  }, [userId]);

  if (loading) {
    return <div className="flex justify-center p-8">Carregando...</div>;
  }

  const NetworkNode = ({ member }: { member: NetworkMember }) => (
    <Card className="p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-full">
          <User2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-medium">{member.user.full_name || 'Usuário'}</p>
          <p className="text-sm text-gray-500">{member.user.email}</p>
          {member.user.custom_id && (
            <p className="text-xs text-gray-400">ID: {member.user.custom_id}</p>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="space-y-6">
        {networkData.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {networkData.map((member) => (
              <NetworkNode key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum membro encontrado em sua rede.</p>
          </div>
        )}
      </div>
    </div>
  );
};