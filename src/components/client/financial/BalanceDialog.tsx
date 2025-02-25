
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BalanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BalanceDialog({ open, onOpenChange }: BalanceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="relative">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 mb-4">
            Detalhes do Saldo
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total de bônus recebido:</span>
            <span className="text-gray-900 font-medium">R$ 42.576,22</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total de saldo bloqueado:</span>
            <span className="text-red-500 font-medium">R$ 0,00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Saldo disponível:</span>
            <span className="text-[#02951e] font-medium">R$ 5.000,01</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
