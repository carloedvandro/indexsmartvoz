import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role !== "admin") {
        navigate("/admin/login");
      }
    };

    checkAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Rede</CardTitle>
              <CardDescription>Gestão da rede multinível</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Em desenvolvimento...</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usuários</CardTitle>
              <CardDescription>Gestão de usuários do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Em desenvolvimento...</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>Relatórios e análises</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Em desenvolvimento...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}