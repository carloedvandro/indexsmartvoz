
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageHeader } from "@/components/admin/common/AdminPageHeader";
import { AdminTable } from "@/components/admin/common/AdminTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ClientFormDialog } from "@/components/admin/clients/ClientFormDialog";

export default function AdminClients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<any>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query para buscar clientes
  const { data: clients, isLoading } = useQuery({
    queryKey: ['admin-clients', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('*')
        .eq('role', 'client')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });

  // Mutation para deletar cliente
  const deleteMutation = useMutation({
    mutationFn: async (clientId: string) => {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', clientId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-clients'] });
      toast({
        title: "Cliente removido",
        description: "Cliente foi removido com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao remover cliente.",
        variant: "destructive",
      });
    }
  });

  const handleDelete = (client: any) => {
    setClientToDelete(client);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      deleteMutation.mutate(clientToDelete.id);
      setDeleteDialogOpen(false);
      setClientToDelete(null);
    }
  };

  const handleEdit = (client: any) => {
    setSelectedClient(client);
    setFormDialogOpen(true);
  };

  const handleNewClient = () => {
    setSelectedClient(null);
    setFormDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const columns = [
    {
      key: 'full_name',
      title: 'Nome',
      render: (value: string) => value || 'Não informado'
    },
    {
      key: 'email',
      title: 'Email',
    },
    {
      key: 'phone',
      title: 'Telefone',
      render: (value: string) => value || 'Não informado'
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'active' ? 'bg-green-100 text-green-800' :
          value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value === 'active' ? 'Ativo' :
           value === 'pending' ? 'Pendente' : 'Inativo'}
        </span>
      )
    },
    {
      key: 'created_at',
      title: 'Data de Cadastro',
      render: (value: string) => formatDate(value)
    },
    {
      key: 'actions',
      title: 'Ações',
      render: (value: any, client: any) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(client)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(client)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <AdminPageHeader
          title="Gestão de Clientes"
          subtitle="Gerencie todos os clientes do sistema"
          actions={
            <Button onClick={handleNewClient}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          }
        />

        {/* Filtros */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabela */}
        <AdminTable
          columns={columns}
          data={clients || []}
          loading={isLoading}
          emptyMessage="Nenhum cliente encontrado"
        />

        {/* Dialog de Formulário */}
        <ClientFormDialog
          open={formDialogOpen}
          onOpenChange={setFormDialogOpen}
          client={selectedClient}
        />

        {/* Dialog de Confirmação de Exclusão */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o cliente {clientToDelete?.full_name || clientToDelete?.email}?
                Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
