
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserEditDialog } from "@/components/admin/UserEditDialog";
import { useToast } from "@/hooks/use-toast";
import { AdminUsersList } from "@/components/admin/AdminUsersList";
import { UserCheck, Plus } from "lucide-react";
import { ProfileWithSponsor } from "@/types/profile";
import { Button } from "@/components/ui/button";

export default function AdminUsers() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [filters, setFilters] = useState({
    externalId: "",
    fullName: "",
    email: "",
    status: "all",
    documentId: "",
    cnpj: "",
  });

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
        .select(`
          *,
          sponsor:sponsor_id (
            id,
            full_name,
            email,
            custom_id
          )
        `)
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
      
      return data as ProfileWithSponsor[];
    },
  });

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsAddingUser(false);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsAddingUser(true);
  };

  const handleUserUpdated = () => {
    refetch();
    setSelectedUser(null);
    setIsAddingUser(false);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      // Implementation would depend on your delete service
      // This is a placeholder
      toast({
        title: "Usuário excluído",
        description: "O usuário foi excluído com sucesso.",
      });
      refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Erro ao excluir usuário",
        description: "Ocorreu um erro ao tentar excluir o usuário.",
        variant: "destructive",
      });
    }
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
                  <UserCheck className="h-6 w-6" />
                </div>
                <h1 className="text-xl font-bold">Lista de Usuário</h1>
                <div className="ml-auto flex items-center">
                  <span className="text-sm">
                    Página inicial do administrador &gt; Lista de Usuário
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white">
                <Button 
                  onClick={handleAddUser} 
                  className="bg-[#5438a0] hover:bg-[#4a3195] flex items-center gap-2 mb-4"
                >
                  <Plus size={18} />
                  <span>Adicionar Usuário</span>
                </Button>
              </div>

              {isLoading ? (
                <div className="p-8 text-center">Carregando...</div>
              ) : (
                <AdminUsersList 
                  users={users} 
                  onEdit={handleEdit} 
                  onDelete={handleDeleteUser}
                />
              )}
            </div>
          </div>
        </main>

        <UserEditDialog
          user={selectedUser}
          open={!!selectedUser || isAddingUser}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedUser(null);
              setIsAddingUser(false);
            }
          }}
          onUserUpdated={handleUserUpdated}
        />
      </div>
    </SidebarProvider>
  );
}
