
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatCurrency } from "@/utils/format";

interface BalanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BalanceDialog({ open, onOpenChange }: BalanceDialogProps) {
  // These would typically come from an API call in a real app
  const totalBonus = 42576.22;
  const blockedBalance = 0;
  const availableBalance = 5000.01;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="relative top-[10%] translate-y-0">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 mb-4">
            Detalhes do Saldo
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total de bônus recebido:</span>
            <span className="text-gray-900 font-medium">{formatCurrency(totalBonus)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total de saldo bloqueado:</span>
            <span className="text-red-500 font-medium">{formatCurrency(blockedBalance)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Saldo disponível:</span>
            <span className="text-[#02951e] font-medium">{formatCurrency(availableBalance)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
