
import { DeleteUserButton } from "@/components/admin/DeleteUserButton";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";

export default function DeleteUserPage() {
  // ID do usuário específico que queremos excluir
  const userId = "35f2274f-478e-4fb5-866b-9b9ec1a9f8dd";
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Operação de Exclusão de Usuário</h1>
            
            <Card>
              <CardContent className="pt-6">
                <DeleteUserButton userId={userId} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
