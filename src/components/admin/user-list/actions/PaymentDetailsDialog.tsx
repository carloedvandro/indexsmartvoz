
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PaymentDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
}

export function PaymentDetailsDialog({ isOpen, onOpenChange, user }: PaymentDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes de Pagamento</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Nome do usuário: {user?.full_name}</p>
          <p>Email: {user?.email}</p>
          <p>Método de pagamento: Cartão de crédito</p>
          <p>Último pagamento: {new Date().toLocaleDateString()}</p>
          <p>Próximo pagamento: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          <p>Status do pagamento: Ativo</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
