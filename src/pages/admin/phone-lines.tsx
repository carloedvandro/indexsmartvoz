
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { toast } from "sonner";
import { PhoneLineTable } from "@/components/admin/phone-lines/PhoneLineTable";
import { AddPhoneLineDialog } from "@/components/admin/phone-lines/AddPhoneLineDialog";
import { PageHeader } from "@/components/admin/phone-lines/PageHeader";

interface PhoneLine {
  id: string;
  phone_number: string;
  client_name: string;
  client_document?: string;
  client_email?: string;
  plan_name: string;
  plan_code: string;
  data_limit: number;
  data_used: number;
  bonus_data: number;
  bonus_used: number;
  status: string;
}

export default function AdminPhoneLines() {
  const navigate = useNavigate();
  const [isNewLineDialogOpen, setIsNewLineDialogOpen] = useState(false);

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

  const { data: phoneLines, isLoading, refetch } = useQuery({
    queryKey: ["phone-lines"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        throw new Error("Não autenticado");
      }

      const { data, error } = await supabase
        .from("phone_lines")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Query error:", error);
        throw error;
      }

      return data as PhoneLine[];
    },
  });

  const handleAddNewLine = async (newLine: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    try {
      const { error } = await supabase
        .from("phone_lines")
        .insert([{
          ...newLine,
          owner_id: session.user.id
        }]);

      if (error) throw error;

      toast.success("Linha adicionada com sucesso!");
      setIsNewLineDialogOpen(false);
      refetch();
    } catch (error) {
      console.error("Error adding line:", error);
      toast.error("Erro ao adicionar linha");
    }
  };

  const handleUpdateUsage = async (lineId: string, newUsage: number) => {
    try {
      const { error } = await supabase
        .from("phone_lines")
        .update({ data_used: newUsage })
        .eq("id", lineId);

      if (error) throw error;

      await supabase
        .from("usage_history")
        .insert([{
          phone_line_id: lineId,
          data_used: newUsage
        }]);

      toast.success("Consumo atualizado com sucesso!");
      refetch();
    } catch (error) {
      console.error("Error updating usage:", error);
      toast.error("Erro ao atualizar consumo");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <PageHeader 
              onAddClick={() => setIsNewLineDialogOpen(true)}
              onLogout={handleLogout}
            />

            <Card>
              <CardHeader>
                <CardTitle>Linhas Cadastradas</CardTitle>
                {phoneLines && (
                  <CardDescription>
                    {phoneLines.length} linha(s) encontrada(s)
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <PhoneLineTable 
                  phoneLines={phoneLines || []}
                  onUpdateUsage={handleUpdateUsage}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          </div>
        </main>

        <AddPhoneLineDialog
          isOpen={isNewLineDialogOpen}
          onClose={() => setIsNewLineDialogOpen(false)}
          onAdd={handleAddNewLine}
        />
      </div>
    </SidebarProvider>
  );
}
