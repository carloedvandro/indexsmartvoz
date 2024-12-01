import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

type Profile = Tables<"profiles">;
type NetworkMember = Tables<"network">;

interface NetworkStats {
  level1Count: number;
  level2Count: number;
  level3Count: number;
  level4Count: number;
  sponsorName: string | null;
}

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);

  // Fetch profile data
  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
        return null;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*, sponsor:profiles!profiles_sponsor_id_fkey(full_name)")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Fetch network statistics
  const { data: networkStats, isLoading: networkLoading } = useQuery({
    queryKey: ['networkStats'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const stats: NetworkStats = {
        level1Count: 0,
        level2Count: 0,
        level3Count: 0,
        level4Count: 0,
        sponsorName: null,
      };

      // Get all network members
      const { data: networkData, error } = await supabase
        .from("network")
        .select(`
          id,
          level,
          user_id,
          parent_id
        `)
        .eq("parent_id", session.user.id);

      if (error) throw error;

      // Count members by level
      networkData?.forEach((member) => {
        switch (member.level) {
          case 1:
            stats.level1Count++;
            break;
          case 2:
            stats.level2Count++;
            break;
          case 3:
            stats.level3Count++;
            break;
          case 4:
            stats.level4Count++;
            break;
        }
      });

      return stats;
    },
  });

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
    }
  }, [profileData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleNetworkClick = () => {
    navigate("/client/network");
  };

  if (profileLoading || networkLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Nome:</span>{" "}
                  {profile?.full_name || "Não informado"}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {profile?.email}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="capitalize">{profile?.status || "Pendente"}</span>
                </p>
                <p>
                  <span className="font-semibold">Patrocinador:</span>{" "}
                  {(profile as any)?.sponsor?.full_name || "Não possui"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={handleNetworkClick}
          >
            <CardHeader>
              <CardTitle>Minha Rede</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600">Nível 1</p>
                  <p className="text-2xl font-bold text-blue-700">{networkStats?.level1Count || 0}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600">Nível 2</p>
                  <p className="text-2xl font-bold text-green-700">{networkStats?.level2Count || 0}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600">Nível 3</p>
                  <p className="text-2xl font-bold text-purple-700">{networkStats?.level3Count || 0}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-600">Nível 4</p>
                  <p className="text-2xl font-bold text-orange-700">{networkStats?.level4Count || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Planos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Informações sobre seus planos serão exibidas aqui.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}