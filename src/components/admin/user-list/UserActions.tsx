
import { Button } from "@/components/ui/button";
import { Edit, Eye, Info, Key, Mail, Trash, UserCheck } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteUser } from "@/services/user/userDelete";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface UserActionsProps {
  user: any;
  onEdit: (user: any) => void;
}

export const UserActions = ({ user, onEdit }: UserActionsProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTransactions, setDeleteTransactions] = useState(true);
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

  return (
    <div className="flex space-x-1">
      <Button size="sm" variant="default" className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0">
        <Eye className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="default" className="bg-cyan-500 hover:bg-cyan-600 h-8 w-8 p-0">
        <UserCheck className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0"
        onClick={() => onEdit(user)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="default" className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0">
        <Info className="h-4 w-4" />
      </Button>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            size="sm" 
            variant="default" 
            className="bg-red-500 hover:bg-red-600 h-8 w-8 p-0"
            disabled={isDeleting}
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
              disabled={isDeleting}
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Button size="sm" variant="default" className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 p-0">
        <Key className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="default" className="bg-green-500 hover:bg-green-600 h-8 w-8 p-0">
        <Mail className="h-4 w-4" />
      </Button>
    </div>
  );
};
