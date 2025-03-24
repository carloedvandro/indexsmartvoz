
import { useState } from "react";
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
import { NetworkTree } from "@/components/client/network/NetworkTree";
import { NetworkFilter } from "@/components/client/network/NetworkFilter";

export default function AdminNetwork() {
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const fetchRootUsers = async () => {
    setIsLoading(true);
    try {
      const { data: rootNetworkNodes, error } = await supabase
        .from("network")
        .select("id, user_id, profiles:user_id(id, full_name, email, custom_id)")
        .is("parent_id", null);

      if (error) {
        console.error("Error fetching root network nodes:", error);
        return [];
      }

      return rootNetworkNodes || [];
    } catch (error) {
      console.error("Error in fetchRootUsers:", error);
      return [];
    } finally {
      setIsLoading(false);
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
                <h1 className="text-2xl font-bold">Rede</h1>
                <p className="text-muted-foreground">
                  Visualize e gerencie a rede de usuários
                </p>
              </div>
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Button variant="outline" onClick={handleLogout}>
                  Sair
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Filtros</CardTitle>
                    <CardDescription>
                      Selecione para visualizar a rede
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedUserId ? (
                      <div className="space-y-4">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setSelectedUserId(null)}
                        >
                          Voltar para seleção
                        </Button>
                        <NetworkFilter 
                          selectedLevel="all"
                          onLevelChange={() => {}}
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Selecione um usuário para visualizar sua rede
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Estrutura da Rede</CardTitle>
                    <CardDescription>
                      Visualização da estrutura da rede multinível
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="min-h-[300px]">
                    {isLoading ? (
                      <div className="flex justify-center items-center h-80">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : selectedUserId ? (
                      <NetworkTree userId={selectedUserId} />
                    ) : (
                      <div>
                        <p className="mb-4 text-center">Selecione um usuário para visualizar sua rede</p>
                        <Button
                          onClick={async () => {
                            const rootUsers = await fetchRootUsers();
                            if (rootUsers && rootUsers.length > 0) {
                              setSelectedUserId(rootUsers[0].user_id);
                            }
                          }}
                          className="w-full"
                        >
                          Visualizar Rede Principal
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
