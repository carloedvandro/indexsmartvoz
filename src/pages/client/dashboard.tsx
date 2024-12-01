import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

type Profile = Tables<"profiles">;

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
        return;
      }

      try {
        // Changed from .single() to get() and handling the array response
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .limit(1);

        if (error) throw error;
        
        // If we have data, set the first profile
        if (data && data.length > 0) {
          setProfile(data[0]);
        } else {
          // If no profile is found, show an error
          toast({
            title: "Erro",
            description: "Perfil não encontrado",
            variant: "destructive",
          });
          // Optionally sign out the user since their profile is missing
          await supabase.auth.signOut();
          navigate("/");
          return;
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Erro",
          description: "Erro ao carregar perfil",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

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
                {profile?.sponsor_id && (
                  <p>
                    <span className="font-semibold">Patrocinador ID:</span>{" "}
                    {profile.sponsor_id}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rede</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Informações sobre sua rede serão exibidas aqui.
              </p>
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