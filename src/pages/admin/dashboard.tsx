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
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

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
    try {
      await supabase.auth.signOut();
      navigate("/admin/login");
    } catch (error) {
      console.error('Logout error:', error);
      navigate("/admin/login");
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Painel Administrativo</h1>
                <p className="text-muted-foreground">
                  Bem-vindo ao painel de controle
                </p>
              </div>
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Button variant="outline" onClick={handleLogout}>
                  Sair
                </Button>
              </div>
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
        </main>
      </div>
    </SidebarProvider>
  );
}
