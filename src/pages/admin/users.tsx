
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { UserSearchForm } from "@/components/admin/UserSearchForm";
import { UsersTable } from "@/components/admin/UsersTable";
import { UserEditDialog } from "@/components/admin/UserEditDialog";
import { useToast } from "@/hooks/use-toast";

// Define the interface for the user data returned by our find_user_by_email function
interface AuthUserData {
  id: string;
  email: string;
  raw_user_meta_data: any;
  banned: boolean;
  confirmed_at: string | null;
}

export default function AdminUsers() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [filters, setFilters] = useState({
    externalId: "",
    fullName: "",
    email: "",
    status: "all",
    documentId: "",
    cnpj: "",
  });

  // Verificar autenticação e papel do usuário
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

  // Monitorar mudanças no estado da autenticação
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["users", filters],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        throw new Error("Não autenticado");
      }

      let query = supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters.fullName) {
        query = query.ilike("full_name", `%${filters.fullName}%`);
      }
      if (filters.email) {
        query = query.ilike("email", `%${filters.email}%`);
      }
      if (filters.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }
      if (filters.externalId) {
        query = query.ilike("external_id", `%${filters.externalId}%`);
      }
      if (filters.documentId) {
        query = query.ilike("document_id", `%${filters.documentId}%`);
      }
      if (filters.cnpj) {
        query = query.ilike("cnpj", `%${filters.cnpj}%`);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Query error:", error);
        throw error;
      }
      
      // For each profile, get the auth user data and add it to the profile
      if (data && data.length > 0) {
        const profilesWithAuthData = await Promise.all(
          data.map(async (profile) => {
            if (profile.email) {
              try {
                // Use our custom function to find the user by email
                const { data: userData, error: userError } = await supabase.rpc<AuthUserData>(
                  'find_user_by_email',
                  { email_param: profile.email }
                );

                if (userError) {
                  console.error("Error fetching auth user data:", userError);
                  return {
                    ...profile,
                    auth_banned: false,
                    auth_confirmed_at: null
                  };
                }

                if (userData && userData.length > 0) {
                  const authUser = userData[0];
                  return {
                    ...profile,
                    auth_banned: authUser.banned,
                    auth_confirmed_at: authUser.confirmed_at,
                    raw_user_meta_data: authUser.raw_user_meta_data
                  };
                }
              } catch (err) {
                console.error("Error processing auth user data:", err);
              }
            }
            
            return {
              ...profile,
              auth_banned: false,
              auth_confirmed_at: null
            };
          })
        );
        
        return profilesWithAuthData;
      }
      
      return data || [];
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleSearch = () => {
    refetch();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleUserUpdated = () => {
    refetch();
    setSelectedUser(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold">Usuários</h1>
                <p className="text-muted-foreground">
                  Gerencie os usuários do sistema
                </p>
              </div>
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Button variant="outline" onClick={handleLogout}>
                  Sair
                </Button>
              </div>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Busca Avançada</CardTitle>
                <CardDescription>
                  Use os filtros abaixo para encontrar usuários específicos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserSearchForm
                  filters={filters}
                  setFilters={setFilters}
                  onSearch={handleSearch}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resultados da Busca</CardTitle>
                {users && (
                  <CardDescription>
                    {users.length} usuário(s) encontrado(s)
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Carregando...</p>
                ) : (
                  <UsersTable users={users} onEdit={handleEdit} />
                )}
              </CardContent>
            </Card>
          </div>
        </main>

        <UserEditDialog
          user={selectedUser}
          open={!!selectedUser}
          onOpenChange={(open) => !open && setSelectedUser(null)}
          onUserUpdated={handleUserUpdated}
        />
      </div>
    </SidebarProvider>
  );
}
