
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
      try {
        console.log('Iniciando exclusão do cliente:', clientId);

        // Delete in correct order to avoid foreign key violations
        // 1. Delete terms_acceptance first
        const { error: termsError } = await supabase
          .from('terms_acceptance')
          .delete()
          .eq('user_id', clientId);
        
        if (termsError && termsError.code !== 'PGRST116') { // Ignore "not found" errors
          console.error('Erro ao deletar termos de aceite:', termsError);
          throw new Error('Erro ao remover termos de aceite');
        }

        // 2. Delete network entries
        const { error: networkError } = await supabase
          .from('network')
          .delete()
          .eq('user_id', clientId);
        
        if (networkError && networkError.code !== 'PGRST116') {
          console.error('Erro ao deletar rede:', networkError);
          throw new Error('Erro ao remover dados da rede');
        }

        // 3. Delete orders
        const { error: ordersError } = await supabase
          .from('orders')
          .delete()
          .eq('user_id', clientId);
        
        if (ordersError && ordersError.code !== 'PGRST116') {
          console.error('Erro ao deletar pedidos:', ordersError);
          throw new Error('Erro ao remover pedidos');
        }

        // 4. Delete document verifications
        const { error: docError } = await supabase
          .from('document_verifications')
          .delete()
          .eq('user_id', clientId);
        
        if (docError && docError.code !== 'PGRST116') {
          console.error('Erro ao deletar verificações de documento:', docError);
          throw new Error('Erro ao remover verificações de documento');
        }

        // 5. Delete document captures
        const { error: capturesError } = await supabase
          .from('document_captures')
          .delete()
          .eq('user_id', clientId);
        
        if (capturesError && capturesError.code !== 'PGRST116') {
          console.error('Erro ao deletar capturas de documento:', capturesError);
          throw new Error('Erro ao remover capturas de documento');
        }

        // 6. Delete user addresses
        const { error: addressError } = await supabase
          .from('user_addresses')
          .delete()
          .eq('user_id', clientId);
        
        if (addressError && addressError.code !== 'PGRST116') {
          console.error('Erro ao deletar endereços:', addressError);
          throw new Error('Erro ao remover endereços');
        }

        // 7. Finally, delete the profile
        const { error: profileError } = await supabase
          .from('profiles')
          .delete()
          .eq('id', clientId);
        
        if (profileError) {
          console.error('Erro ao deletar perfil:', profileError);
          throw new Error('Erro ao remover cliente');
        }

        console.log('Cliente deletado com sucesso:', clientId);
        return { success: true };
      } catch (error) {
        console.error('Erro durante a exclusão:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-clients'] });
      toast({
        title: "Cliente removido",
        description: "Cliente foi removido com sucesso.",
      });
      setDeleteDialogOpen(false);
      setClientToDelete(null);
    },
    onError: (error: any) => {
      console.error('Erro na mutation:', error);
      toast({
        title: "Erro ao remover cliente",
        description: error.message || "Ocorreu um erro inesperado ao tentar excluir o cliente.",
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
