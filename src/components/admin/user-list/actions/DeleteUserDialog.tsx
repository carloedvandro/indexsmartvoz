
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  AlertDialog,
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { deleteUser } from "@/services/user/userDelete";

interface DeleteUserDialogProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const DeleteUserDialog = ({ user, isOpen, onClose, onConfirm }: DeleteUserDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTransactions, setDeleteTransactions] = useState(false);
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
      await onConfirm();
      onClose();
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

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
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
  );
};
