
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
import { NetworkTree } from "@/components/client/network/NetworkTree";
import { NetworkLevels } from "@/components/client/network/NetworkLevels";
import { Network, Users } from "lucide-react";

export default function AdminNetwork() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

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

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user-network-details", userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          id,
          full_name,
          email,
          custom_id,
          status
        `)
        .eq("id", userId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-0 overflow-auto">
          <div className="w-full mx-auto">
            <div className="flex flex-col">
              <div className="bg-[#5438a0] text-white p-4 flex items-center gap-3 w-full">
                <div className="bg-[#4a3195] p-2 rounded-full">
                  <Network className="h-6 w-6" />
                </div>
                <h1 className="text-xl font-bold">Visualização de Rede</h1>
                <div className="ml-auto flex items-center">
                  <span className="text-sm">
                    Página inicial do administrador &gt; Visualização de Rede
                  </span>
                </div>
              </div>

              {userId ? (
                <div className="p-6">
                  {userLoading ? (
                    <div className="flex justify-center p-10">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5438a0]"></div>
                    </div>
                  ) : userData ? (
                    <div className="space-y-6">
                      <Card className="border border-gray-200 shadow-sm">
                        <CardHeader className="bg-gray-50 border-b border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#5438a0] p-2 rounded-full">
                              <Users className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-xl font-bold">{userData.full_name}</CardTitle>
                              <CardDescription className="text-sm text-gray-600">
                                {userData.email} {userData.custom_id ? `(${userData.custom_id})` : ''}
                              </CardDescription>
                            </div>
                            <div className="ml-auto">
                              <Button 
                                onClick={() => navigate('/admin/users')}
                                variant="outline" 
                                className="border-[#5438a0] text-[#5438a0] hover:bg-[#5438a0] hover:text-white"
                              >
                                Voltar para Lista de Usuários
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <div className="lg:col-span-1">
                              <NetworkLevels />
                            </div>
                            <div className="lg:col-span-3">
                              <NetworkTree userId={userId} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <div className="text-center p-10">
                      <h2 className="text-xl font-semibold text-gray-700">Usuário não encontrado</h2>
                      <p className="mt-2 text-gray-500">Não foi possível encontrar os detalhes deste usuário.</p>
                      <Button 
                        onClick={() => navigate('/admin/users')}
                        className="mt-4 bg-[#5438a0] hover:bg-[#4a3195]"
                      >
                        Voltar para Lista de Usuários
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center p-10">
                  <h2 className="text-xl font-semibold text-gray-700">Nenhum usuário selecionado</h2>
                  <p className="mt-2 text-gray-500">Selecione um usuário na lista para visualizar sua rede.</p>
                  <Button 
                    onClick={() => navigate('/admin/users')}
                    className="mt-4 bg-[#5438a0] hover:bg-[#4a3195]"
                  >
                    Ir para Lista de Usuários
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
