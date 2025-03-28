
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NetworkTree } from "@/components/client/network/NetworkTree";
import { Users } from "lucide-react";

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
          custom_id
        `)
        .eq("id", userId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-0 overflow-auto">
          <div className="w-full mx-auto">
            <div className="flex flex-col">
              <div className="bg-[#5438a0] text-white p-4 flex items-center gap-3 w-full">
                <div className="bg-[#4a3195] p-2 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 19H5M17 19h2M5 19v-4M5 19H3M19 19v-4M19 19h2M15 9h2v2h-2V9zM9 9h2v2H9V9zM10 13h4v2h-4v-2zM17 5h2v10h-2V5zM5 5h2v10H5V5zM7 5V3h10v2H7z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
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
                        <div className="p-6 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="bg-[#5438a0] p-3 rounded-full">
                              <Users className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h2 className="text-xl font-bold">{userData.full_name}</h2>
                              <p className="text-sm text-gray-600">
                                {userData.email} {userData.custom_id ? `(${userData.custom_id})` : ''}
                              </p>
                            </div>
                          </div>
                          <Button 
                            onClick={() => navigate('/admin/users')}
                            className="border border-[#5438a0] bg-white text-[#5438a0] hover:bg-[#5438a0] hover:text-white"
                          >
                            Voltar para Lista de Usuários
                          </Button>
                        </div>
                        <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-6 py-6">
                          <div className="md:col-span-1">
                            <div className="space-y-2">
                              {["1", "2", "3", "4"].map((level) => (
                                <Button
                                  key={level}
                                  variant={level === "1" ? "default" : "outline"}
                                  className={
                                    level === "1"
                                      ? "w-full bg-[#5438a0] hover:bg-[#4a3195]"
                                      : "w-full border-[#5438a0] text-[#5438a0] hover:bg-[#5438a0] hover:text-white"
                                  }
                                >
                                  {level}° Nível
                                </Button>
                              ))}
                              <Button
                                variant="default"
                                className="w-full bg-[#5438a0] hover:bg-[#4a3195]"
                              >
                                Todos os Níveis
                              </Button>
                            </div>
                          </div>
                          <div className="md:col-span-4">
                            <div className="flex items-center justify-center h-64 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                              <p className="text-gray-500 text-center">
                                Nenhum membro encontrado em sua rede.
                              </p>
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
