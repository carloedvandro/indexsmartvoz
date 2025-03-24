
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { NetworkTree } from "@/components/client/network/NetworkTree";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function NetworkPage() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Verifica e corrige automaticamente as relações da rede ao carregar a página
    const autoFixNetwork = async () => {
      if (!profile?.id) return;
      
      // Verifica se o usuário atual tem uma entrada na rede
      const { data: userNetworkData, error: userNetworkError } = await supabase
        .from("network")
        .select("id")
        .eq("user_id", profile.id)
        .maybeSingle();

      if (userNetworkError) {
        console.error("Error checking network:", userNetworkError);
        return;
      }

      // Cria uma entrada na rede se não existir
      if (!userNetworkData) {
        await supabase
          .from("network")
          .insert({
            user_id: profile.id,
            level: 1
          });
      }
    };
    
    autoFixNetwork();
  }, [profile?.id]);

  const handleRefreshNetwork = () => {
    if (profile?.id) {
      queryClient.invalidateQueries({ queryKey: ['networkData', profile.id] });
      toast.success("Atualizando dados da rede...");
    } else {
      toast.error("Perfil não encontrado. Faça login novamente.");
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <header className="bg-white shadow fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/client/dashboard")}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Minha Rede</h1>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefreshNetwork}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24">
        {profile?.id && <NetworkTree userId={profile.id} />}
      </main>
    </div>
  );
}
