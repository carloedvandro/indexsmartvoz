
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PaymentDetailsDialogProps {
  user: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaymentDetailsDialog = ({ user, isOpen, onOpenChange }: PaymentDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalhes de pagamento do usuário</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-3">Dados bancários</h3>
          <div className="grid grid-cols-4 gap-4 border rounded-md p-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Nome do banco</p>
              <p className="font-medium">{user?.bank_name || "-"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Número de conta</p>
              <p className="font-medium">{user?.account_number || "-"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Nome da conta</p>
              <p className="font-medium">{user?.account_name || "-"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Código IFSC</p>
              <p className="font-medium">{user?.ifsc_code || "-"}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">E-mails do Paypal</h3>
          <div className="border rounded-md p-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">E-mail</p>
              <p className="font-medium">{user?.paypal_email || "-"}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Detalhes do Usuário</h3>
          <div className="grid grid-cols-2 gap-4 border rounded-md p-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Primeiro nome</p>
              <p className="font-medium">Marcio</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Sobrenome</p>
              <p className="font-medium">Sales Sousa</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Usuário</p>
              <p className="font-medium">marciosales</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">E-mail</p>
              <p className="font-medium">contratos@mssalarmes.com.br</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Telefone</p>
              <p className="font-medium">(85) 98888-7777</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Endereço</p>
              <p className="font-medium">{user?.address || "-"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Estado</p>
              <p className="font-medium">Ceará</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">País</p>
              <p className="font-medium">Brasil</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Fechar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
