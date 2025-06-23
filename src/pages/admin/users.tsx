
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageHeader } from "@/components/admin/common/AdminPageHeader";
import { SearchFilters } from "@/components/admin/user-list/SearchFilters";
import { UsersTable } from "@/components/admin/user-list/UsersTable";
import { UserEditDialog } from "@/components/admin/UserEditDialog";
import { DeleteUserDialog } from "@/components/admin/user-list/actions/DeleteUserDialog";
import { PaymentDetailsDialog } from "@/components/admin/user-list/actions/PaymentDetailsDialog";
import { PlanDetailsDialog } from "@/components/admin/user-list/actions/PlanDetailsDialog";
import { useToast } from "@/hooks/use-toast";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [viewingPayment, setViewingPayment] = useState(null);
  const [viewingPlan, setViewingPlan] = useState(null);
  const { toast } = useToast();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-users', searchTerm, selectedRole, selectedStatus],
    queryFn: async () => {
      let query = supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,cpf.ilike.%${searchTerm}%`);
      }

      if (selectedRole !== "all") {
        query = query.eq("role", selectedRole);
      }

      if (selectedStatus !== "all") {
        query = query.eq("status", selectedStatus);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  const handleView = (user) => {
    setViewingPayment(user);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (user) => {
    setDeletingUser(user);
  };

  const handleAsaasSuccess = () => {
    refetch();
    toast({
      title: "Sucesso",
      description: "Subconta Asaas criada com sucesso",
    });
  };

  const handleDeleteConfirm = async (userId) => {
    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);

      if (profileError) throw profileError;

      const { error: authError } = await supabase.auth.admin.deleteUser(userId);
      if (authError && !authError.message.includes("User not found")) {
        console.warn("Erro ao deletar usuário do auth (pode já ter sido deletado):", authError);
      }

      await refetch();
      setDeletingUser(null);
      
      toast({
        title: "Usuário deletado",
        description: "O usuário foi removido com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      toast({
        title: "Erro",
        description: "Não foi possível deletar o usuário.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Gerenciar Usuários"
        description="Visualize e gerencie todos os usuários da plataforma"
      />

      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      <UsersTable
        users={users}
        isLoading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAsaasSuccess={handleAsaasSuccess}
      />

      {editingUser && (
        <UserEditDialog
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSuccess={() => {
            refetch();
            setEditingUser(null);
          }}
        />
      )}

      {deletingUser && (
        <DeleteUserDialog
          user={deletingUser}
          onClose={() => setDeletingUser(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {viewingPayment && (
        <PaymentDetailsDialog
          user={viewingPayment}
          onClose={() => setViewingPayment(null)}
        />
      )}

      {viewingPlan && (
        <PlanDetailsDialog
          user={viewingPlan}
          onClose={() => setViewingPlan(null)}
        />
      )}
    </div>
  );
}
