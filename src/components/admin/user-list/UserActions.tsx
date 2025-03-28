
import { Button } from "@/components/ui/button";
import { Edit, Eye, Info, Key, Mail, Trash, UserCheck } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteUser } from "@/services/user/userDelete";
import { useToast } from "@/hooks/use-toast";

interface UserActionsProps {
  user: any;
  onEdit: (user: any) => void;
}

export const UserActions = ({ user, onEdit }: UserActionsProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o usuário {user.full_name}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-red-500 hover:bg-red-600"
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
