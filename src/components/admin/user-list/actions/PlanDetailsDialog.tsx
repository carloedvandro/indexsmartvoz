
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PlanDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
}

export function PlanDetailsDialog({ isOpen, onOpenChange, user }: PlanDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do Plano</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Nome do usuário: {user?.full_name}</p>
          <p>Email: {user?.email}</p>
          <p>Plano atual: {user?.plan_name || "Plano Básico"}</p>
          <p>Data de início: {user?.plan_start_date || "N/A"}</p>
          <p>Data de expiração: {user?.plan_expiry_date || "N/A"}</p>
          <p>Status do plano: {user?.plan_status || "Ativo"}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
