
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
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [newLine, setNewLine] = useState({
    phone_number: "",
    client_name: "",
    client_document: "",
    client_email: "",
    plan_name: "",
    plan_code: "",
    data_limit: 0,
    status: "active"
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

  const handleAddNewLine = async () => {
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

      // Registrar no histórico
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

  const handlePhoneNumberChange = (value: string) => {
    let formattedValue = value.replace(/\D/g, "");
    if (formattedValue.length <= 11) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
      setNewLine({ ...newLine, phone_number: formattedValue });
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold">Linhas Telefônicas</h1>
                <p className="text-muted-foreground">
                  Gerencie as linhas telefônicas e seus consumos
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button onClick={() => setIsNewLineDialogOpen(true)}>
                  Adicionar Linha
                </Button>
                <SidebarTrigger />
                <Button variant="outline" onClick={handleLogout}>
                  Sair
                </Button>
              </div>
            </div>

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
                {isLoading ? (
                  <p>Carregando...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Plano</TableHead>
                        <TableHead>Consumo</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {phoneLines?.map((line) => (
                        <TableRow key={line.id}>
                          <TableCell>{line.phone_number}</TableCell>
                          <TableCell>{line.client_name}</TableCell>
                          <TableCell>{line.plan_name}</TableCell>
                          <TableCell>
                            {line.data_used}/{line.data_limit} GB
                            {line.bonus_data > 0 && ` + ${line.bonus_used}/${line.bonus_data} GB bônus`}
                          </TableCell>
                          <TableCell>{line.status}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newUsage = Number(prompt("Digite o novo consumo em GB:"));
                                if (!isNaN(newUsage)) {
                                  handleUpdateUsage(line.id, newUsage);
                                }
                              }}
                            >
                              Atualizar Consumo
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </main>

        <Dialog open={isNewLineDialogOpen} onOpenChange={setIsNewLineDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Linha</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="phone_number">Número do Telefone</Label>
                <Input
                  id="phone_number"
                  value={newLine.phone_number}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="client_name">Nome do Cliente</Label>
                <Input
                  id="client_name"
                  value={newLine.client_name}
                  onChange={(e) => setNewLine({ ...newLine, client_name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="client_document">Documento</Label>
                <Input
                  id="client_document"
                  value={newLine.client_document}
                  onChange={(e) => setNewLine({ ...newLine, client_document: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="client_email">Email</Label>
                <Input
                  id="client_email"
                  type="email"
                  value={newLine.client_email}
                  onChange={(e) => setNewLine({ ...newLine, client_email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plan_name">Nome do Plano</Label>
                <Input
                  id="plan_name"
                  value={newLine.plan_name}
                  onChange={(e) => setNewLine({ ...newLine, plan_name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plan_code">Código do Plano</Label>
                <Input
                  id="plan_code"
                  value={newLine.plan_code}
                  onChange={(e) => setNewLine({ ...newLine, plan_code: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="data_limit">Limite de Dados (GB)</Label>
                <Input
                  id="data_limit"
                  type="number"
                  value={newLine.data_limit}
                  onChange={(e) => setNewLine({ ...newLine, data_limit: Number(e.target.value) })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewLineDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddNewLine}>
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
}
