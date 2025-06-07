
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageHeader } from "@/components/admin/common/AdminPageHeader";
import { AdminTable } from "@/components/admin/common/AdminTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Plus, Search, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { PlanForm } from "@/components/admin/plans/PlanForm";
import { PlanDetailsDialog } from "@/components/admin/plans/PlanDetailsDialog";

export default function AdminPlans() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [planToDelete, setPlanToDelete] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query para buscar planos
  const { data: plans, isLoading } = useQuery({
    queryKey: ['admin-plans', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('plans')
        .select(`
          *,
          cashback_levels:plan_cashback_levels(*),
          benefits:plan_benefits(*)
        `)
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });

  // Mutation para deletar plano
  const deleteMutation = useMutation({
    mutationFn: async (planId: string) => {
      const { error } = await supabase
        .from('plans')
        .delete()
        .eq('id', planId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-plans'] });
      toast({
        title: "Plano removido",
        description: "Plano foi removido com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao remover plano.",
        variant: "destructive",
      });
    }
  });

  const handleEdit = (plan: any) => {
    setSelectedPlan(plan);
    setEditDialogOpen(true);
  };

  const handleDetails = (plan: any) => {
    setSelectedPlan(plan);
    setDetailsDialogOpen(true);
  };

  const handleDelete = (plan: any) => {
    setPlanToDelete(plan);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (planToDelete) {
      deleteMutation.mutate(planToDelete.id);
      setDeleteDialogOpen(false);
      setPlanToDelete(null);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleFormSuccess = (data: any) => {
    console.log('Plan form success:', data);
    setEditDialogOpen(false);
    setSelectedPlan(null);
    queryClient.invalidateQueries({ queryKey: ['admin-plans'] });
    toast({
      title: "Sucesso",
      description: selectedPlan ? "Plano atualizado com sucesso." : "Plano criado com sucesso.",
    });
  };

  const columns = [
    {
      key: 'title',
      title: 'Título',
    },
    {
      key: 'value',
      title: 'Valor',
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value === 'active' ? 'Ativo' : 'Inativo'}
        </span>
      )
    },
    {
      key: 'cashback_levels',
      title: 'Níveis de Cashback',
      render: (levels: any[]) => levels?.length || 0
    },
    {
      key: 'benefits',
      title: 'Benefícios',
      render: (benefits: any[]) => benefits?.length || 0
    },
    {
      key: 'actions',
      title: 'Ações',
      render: (value: any, plan: any) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDetails(plan)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(plan)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(plan)}
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
          title="Gestão de Planos"
          subtitle="Gerencie todos os planos do sistema"
          actions={
            <Button onClick={() => { setSelectedPlan(null); setEditDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Plano
            </Button>
          }
        />

        {/* Filtros */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar planos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabela */}
        <AdminTable
          columns={columns}
          data={plans || []}
          loading={isLoading}
          emptyMessage="Nenhum plano encontrado"
        />

        {/* Dialog de Edição/Criação */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedPlan ? 'Editar Plano' : 'Novo Plano'}
              </DialogTitle>
              <DialogDescription>
                {selectedPlan ? 'Edite as informações do plano' : 'Preencha as informações do novo plano'}
              </DialogDescription>
            </DialogHeader>
            <PlanForm
              initialData={selectedPlan}
              onSubmit={handleFormSuccess}
              onCancel={() => setEditDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Dialog de Detalhes */}
        <PlanDetailsDialog
          plan={selectedPlan}
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
        />

        {/* Dialog de Confirmação de Exclusão */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o plano "{planToDelete?.title}"?
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
