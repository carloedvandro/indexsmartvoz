
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminUsersHeader } from "@/components/admin/users/AdminUsersHeader";
import { AdminUsersContent } from "@/components/admin/users/AdminUsersContent";

export default function AdminUsers() {
  const { handleLogout } = useAdminAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <AdminUsersHeader onLogout={handleLogout} />
            <AdminUsersContent />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
