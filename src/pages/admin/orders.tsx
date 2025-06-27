import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageHeader } from "@/components/admin/common/AdminPageHeader";
import { AdminTable } from "@/components/admin/common/AdminTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Eye, Search, Filter } from "lucide-react";
import { OrderDetailsDialog } from "@/components/admin/orders/OrderDetailsDialog";
import { OrderFiltersDialog, OrderFilters } from "@/components/admin/orders/OrderFiltersDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [filtersDialogOpen, setFiltersDialogOpen] = useState(false);
  const [filters, setFilters] = useState<OrderFilters>({
    status: "all",
    startDate: undefined,
    endDate: undefined,
    clienteName: "",
    planName: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query para buscar pedidos
  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders', searchTerm, statusFilter, filters],
    queryFn: async () => {
      let query = supabase
        .from('orders')
        .select(`
          *,
          user:profiles!user_id(full_name, email),
          plan:plans!plan_id(title, value),
          confirmed_by_user:profiles!confirmed_by(full_name)
        `)
        .order('created_at', { ascending: false });

      // Filtro de busca por termo
      if (searchTerm) {
        query = query.or(`user.full_name.ilike.%${searchTerm}%,user.email.ilike.%${searchTerm}%`);
      }

      // Filtro de status (compatibilidade com o filtro antigo)
      const activeStatus = filters.status !== "all" ? filters.status : statusFilter;
      if (activeStatus !== 'all') {
        query = query.eq('status', activeStatus);
      }

      // Filtros avançados
      if (filters.startDate) {
        query = query.gte('order_date', filters.startDate.toISOString());
      }

      if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59, 999);
        query = query.lte('order_date', endDate.toISOString());
      }

      if (filters.clienteName.trim()) {
        query = query.ilike('profiles.full_name', `%${filters.clienteName}%`);
      }

      if (filters.planName.trim()) {
        query = query.ilike('plans.title', `%${filters.planName}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });

  // Mutation para atualizar status do pedido
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const updateData: any = {
        status,
        updated_at: new Date().toISOString()
      };

      // Se confirmando, adicionar dados de confirmação
      if (status === 'confirmed') {
        updateData.confirmed_at = new Date().toISOString();
        updateData.confirmed_by = user?.id;
      }

      const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId);
      
      if (error) throw error;
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      const statusLabel = getStatusLabel(status);
      toast({
        title: "Status atualizado",
        description: `Pedido ${statusLabel.toLowerCase()} com sucesso.`,
      });
    },
    onError: (error) => {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar status do pedido.",
        variant: "destructive",
      });
    }
  });

  const handleStatusUpdate = (orderId: string, status: string) => {
    updateStatusMutation.mutate({ orderId, status });
  };

  const handleDetails = (order: any) => {
    setSelectedOrder(order);
    setDetailsDialogOpen(true);
  };

  const handleApplyFilters = () => {
    // A query será refeita automaticamente devido ao useQuery dependency
    queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'chip_activation':
        return 'bg-purple-100 text-purple-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'paid':
        return 'Pago';
      case 'chip_activation':
        return 'Ativação de Chip';
      case 'rejected':
        return 'Rejeitado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'pix':
        return 'PIX';
      case 'card':
        return 'Cartão';
      case 'boleto':
        return 'Boleto';
      default:
        return method || 'N/A';
    }
  };

  const columns = [
    {
      key: 'user',
      title: 'Cliente',
      render: (user: any) => (
        <div>
          <p className="font-medium">{user?.full_name || 'Não informado'}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      )
    },
    {
      key: 'plan',
      title: 'Plano',
      render: (plan: any) => (
        <div>
          <p className="font-medium">{plan?.title}</p>
          <p className="text-sm text-gray-600">{formatCurrency(plan?.value || 0)}</p>
        </div>
      )
    },
    {
      key: 'payment_method',
      title: 'Pagamento',
      render: (value: string) => (
        <span className="text-sm font-medium">
          {getPaymentMethodLabel(value)}
        </span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(value)}`}>
          {getStatusLabel(value)}
        </span>
      )
    },
    {
      key: 'order_date',
      title: 'Data do Pedido',
      render: (value: string) => formatDate(value)
    },
    {
      key: 'confirmed_at',
      title: 'Data Confirmação',
      render: (value: string) => value ? formatDate(value) : '-'
    },
    {
      key: 'actions',
      title: 'Ações',
      render: (value: any, order: any) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDetails(order)}
            title="Ver detalhes"
          >
            <Eye className="h-4 w-4" />
          </Button>
          {(order.status === 'pending' || order.status === 'chip_activation') && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                className="text-green-600 hover:text-green-800"
                title="Confirmar pedido"
                disabled={updateStatusMutation.isPending}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusUpdate(order.id, 'rejected')}
                className="text-red-600 hover:text-red-800"
                title="Rejeitar pedido"
                disabled={updateStatusMutation.isPending}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <AdminPageHeader
          title="Gestão de Contratações"
          subtitle="Gerencie todos os pedidos de contratação"
        />

        {/* Filtros */}
        <div className="mb-6 flex gap-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="paid">Pago</SelectItem>
              <SelectItem value="chip_activation">Ativação de Chip</SelectItem>
              <SelectItem value="confirmed">Confirmado</SelectItem>
              <SelectItem value="rejected">Rejeitado</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            onClick={() => setFiltersDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtros Avançados
          </Button>
        </div>

        {/* Tabela */}
        <AdminTable
          columns={columns}
          data={orders || []}
          loading={isLoading}
          emptyMessage="Nenhuma contratação encontrada"
        />

        {/* Dialog de Detalhes */}
        <OrderDetailsDialog
          order={selectedOrder}
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
        />

        {/* Dialog de Filtros */}
        <OrderFiltersDialog
          open={filtersDialogOpen}
          onOpenChange={setFiltersDialogOpen}
          filters={filters}
          onFiltersChange={setFilters}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
      </div>
    </div>
  );
}
