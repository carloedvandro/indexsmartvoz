import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

export default function NetworkTree() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [networkData, setNetworkData] = useState<any[]>([]);

  useEffect(() => {
    const fetchNetworkData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("network")
          .select(`
            *,
            user:profiles!network_user_id_fkey (
              full_name,
              email
            )
          `)
          .eq("parent_id", session.user.id);

        if (error) throw error;
        setNetworkData(data || []);
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
  }, [navigate, toast]);

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
                        {member.user.full_name}
                      </h3>
                      <p className="text-gray-500">{member.user.email}</p>
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