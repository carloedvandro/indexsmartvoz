
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { UserEditDialog } from "@/components/admin/UserEditDialog";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { UsersHeader } from "@/components/admin/users/UsersHeader";
import { UsersSearch } from "@/components/admin/users/UsersSearch";
import { UsersResults } from "@/components/admin/users/UsersResults";
import { AdminAuthCheck } from "@/components/admin/users/AdminAuthCheck";

export default function AdminUsers() {
  const navigate = useNavigate();
  const { 
    users, 
    isLoading, 
    filters, 
    setFilters, 
    selectedUser, 
    setSelectedUser, 
    handleSearch, 
    handleEdit, 
    handleUserUpdated 
  } = useAdminUsers();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <SidebarProvider>
      <AdminAuthCheck />
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <UsersHeader onLogout={handleLogout} />

            <UsersSearch 
              filters={filters}
              setFilters={setFilters}
              onSearch={handleSearch}
            />

            <UsersResults 
              users={users} 
              isLoading={isLoading} 
              onEdit={handleEdit}
              refetch={handleSearch}
            />
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
