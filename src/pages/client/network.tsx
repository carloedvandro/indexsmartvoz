import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

interface NetworkMember {
  id: string;
  level: number;
  user: {
    full_name: string | null;
    email: string;
    custom_id: string | null;
  };
}

export default function NetworkTree() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [networkData, setNetworkData] = useState<NetworkMember[]>([]);
  const { data: profile } = useProfile();

  useEffect(() => {
    const fetchNetworkData = async () => {
      if (!profile?.id) {
        console.log("No profile ID available");
        return;
      }

      console.log("Fetching network data for profile ID:", profile.id);

      try {
        const { data, error } = await supabase
          .from("network")
          .select(`
            id,
            level,
            profiles!network_user_id_fkey (
              full_name,
              email,
              custom_id
            )
          `)
          .eq("parent_id", profile.id);

        if (error) {
          console.error("Supabase query error:", error);
          throw error;
        }
        
        console.log("Network data received:", data);
        
        if (data) {
          const formattedData = data.map(item => ({
            id: item.id,
            level: item.level,
            user: {
              full_name: item.profiles?.[0]?.full_name || null,
              email: item.profiles?.[0]?.email || '',
              custom_id: item.profiles?.[0]?.custom_id || null
            }
          }));
          setNetworkData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching network data:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados da rede",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkData();
  }, [profile?.id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <button
            onClick={() => navigate("/client/dashboard")}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Minha Rede</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {networkData.length > 0 ? (
            networkData.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {member.user.full_name || "Nome não informado"}
                      </h3>
                      <p className="text-gray-500">{member.user.email}</p>
                      {member.user.custom_id && (
                        <p className="text-sm text-gray-600">
                          ID: {member.user.custom_id}
                        </p>
                      )}
                    </div>
                    <div className="bg-blue-100 px-3 py-1 rounded-full">
                      <span className="text-blue-700">Nível {member.level}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Você ainda não possui membros em sua rede.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}