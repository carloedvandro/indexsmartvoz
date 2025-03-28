
import { Button } from "@/components/ui/button";
import { Edit, Eye, Info, Lock, LockOpen, Mail, Trash, UserCheck } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteUser } from "@/services/user/userDelete";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

interface UserActionsProps {
  user: any;
  onEdit: (user: any) => void;
}

export const UserActions = ({ user, onEdit }: UserActionsProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTransactions, setDeleteTransactions] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPaymentDetailsOpen, setIsPaymentDetailsOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!user.id) {
      toast({
        title: "Erro",
        description: "ID do usuário não encontrado",
        variant: "destructive"
      });
      return;
    }

    setIsDeleting(true);
    try {
      await deleteUser(user.id);
      toast({
        title: "Sucesso",
        description: "Usuário excluído com sucesso",
      });
      // Refresh the page to update the user list
      window.location.reload();
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: "Erro ao excluir usuário",
        description: error.message || "Ocorreu um erro ao excluir o usuário",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleLock = () => {
    setIsUnlocked(!isUnlocked);
    
    // Show toast notification for lock status change
    toast({
      title: isUnlocked ? "Usuário bloqueado" : "Usuário desbloqueado",
      description: isUnlocked 
        ? "As configurações do usuário foram bloqueadas." 
        : "As configurações do usuário foram desbloqueadas para edição.",
    });
  };

  const openPaymentDetails = () => {
    setIsPaymentDetailsOpen(true);
  };

  return (
    <div className="flex space-x-1">
      <Button 
        size="sm" 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0"
        disabled={!isUnlocked}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant="default" 
        className="bg-cyan-500 hover:bg-cyan-600 h-8 w-8 p-0"
        disabled={!isUnlocked}
      >
        <UserCheck className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0"
        onClick={() => onEdit(user)}
        disabled={!isUnlocked}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0"
        onClick={openPaymentDetails}
        disabled={!isUnlocked}
      >
        <Info className="h-4 w-4" />
      </Button>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            size="sm" 
            variant="default" 
            className="bg-red-500 hover:bg-red-600 h-8 w-8 p-0"
            disabled={isDeleting || !isUnlocked}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl">Tem certeza?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="py-4 border-t border-b">
            <p className="mb-4">Comissão Total Não Paga: R$0,00</p>
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox 
                id="deleteTransactions" 
                checked={deleteTransactions}
                onCheckedChange={(checked) => setDeleteTransactions(checked as boolean)}
              />
              <label htmlFor="deleteTransactions" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Excluir Todas as Transações ou Comissões?
              </label>
            </div>
          </div>
          <AlertDialogFooter className="flex gap-2 sm:gap-0">
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 mt-0 w-full">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-purple-600 hover:bg-purple-700 text-white w-full"
              disabled={isDeleting || !deleteTransactions}
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Button 
        size="sm" 
        variant="default" 
        className={`${isUnlocked ? "bg-red-500 hover:bg-red-600" : "bg-purple-600 hover:bg-purple-700"} h-8 w-8 p-0`}
        onClick={toggleLock}
      >
        {isUnlocked ? <LockOpen className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
      </Button>
      <Button 
        size="sm" 
        variant="default" 
        className="bg-green-500 hover:bg-green-600 h-8 w-8 p-0"
        disabled={!isUnlocked}
      >
        <Mail className="h-4 w-4" />
      </Button>

      {/* Payment Details Dialog */}
      <Dialog open={isPaymentDetailsOpen} onOpenChange={setIsPaymentDetailsOpen}>
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
    </div>
  );
};
