
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface OrderDetailsDialogProps {
  order: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDialog({ order, open, onOpenChange }: OrderDetailsDialogProps) {
  if (!order) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'paid':
        return 'outline';
      case 'chip_activation':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      case 'cancelled':
        return 'outline';
      default:
        return 'secondary';
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
        return method || 'Não informado';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes da Contratação</DialogTitle>
          <DialogDescription>
            Informações completas do pedido
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status e Datas */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <div className="mt-1">
                  <Badge variant={getStatusColor(order.status)}>
                    {getStatusLabel(order.status)}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Data do Pedido</label>
                <p className="mt-1">{formatDate(order.order_date)}</p>
              </div>
            </div>

            {order.confirmed_at && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Data de Confirmação</label>
                  <p className="mt-1">{formatDate(order.confirmed_at)}</p>
                </div>
                {order.confirmed_by_user && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Confirmado por</label>
                    <p className="mt-1">{order.confirmed_by_user.full_name}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Informações do Cliente */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold">Informações do Cliente</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Nome</label>
                <p className="mt-1">{order.user?.full_name || 'Não informado'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="mt-1">{order.user?.email}</p>
              </div>
            </div>
          </div>

          {/* Informações do Plano */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold">Informações do Plano</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Título</label>
                <p className="mt-1 font-medium">{order.plan?.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Valor</label>
                <p className="mt-1 font-bold text-green-600">
                  {formatCurrency(order.plan?.value || 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Informações de Pagamento */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold">Informações de Pagamento</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Método de Pagamento</label>
                <p className="mt-1 font-medium">{getPaymentMethodLabel(order.payment_method)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Valor Total</label>
                <p className="mt-1 text-xl font-bold text-green-600">
                  {formatCurrency(order.total_amount || order.plan?.value || 0)}
                </p>
              </div>
            </div>
            {order.asaas_payment_id && (
              <div>
                <label className="text-sm font-medium text-gray-600">ID Pagamento Asaas</label>
                <p className="mt-1 text-xs text-gray-500 font-mono">{order.asaas_payment_id}</p>
              </div>
            )}
          </div>

          {/* Notas */}
          {order.notes && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-semibold">Observações</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded">{order.notes}</p>
            </div>
          )}

          {/* ID do Pedido */}
          <div className="border-t pt-4">
            <label className="text-sm font-medium text-gray-600">ID do Pedido</label>
            <p className="mt-1 text-xs text-gray-500 font-mono">{order.id}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
