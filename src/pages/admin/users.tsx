import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserEditDialog } from "@/components/admin/UserEditDialog";
import { useToast } from "@/hooks/use-toast";
import { AdminUsersList } from "@/components/admin/AdminUsersList";
import { UserCheck } from "lucide-react";

export default function AdminUsers() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState(null);
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
      
      return data;
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
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
          <div className="max-w-full mx-auto">
            <div className="flex flex-col">
              <div className="bg-indigo-700 text-white p-4 mb-4 rounded-t-lg flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded-full">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h1 className="text-xl font-bold">Lista de Usuário</h1>
                <div className="ml-auto flex items-center">
                  <span className="text-sm">
                    Página inicial do administrador &gt; Lista de Usuário
                  </span>
                </div>
              </div>

              {isLoading ? (
                <div className="p-8 text-center">Carregando...</div>
              ) : (
                <AdminUsersList users={users} onEdit={handleEdit} />
              )}
            </div>
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
