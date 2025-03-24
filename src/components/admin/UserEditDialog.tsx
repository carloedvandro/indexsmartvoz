
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { UserForm } from "./forms/UserForm";
import { UserFormActions } from "./dialogs/UserFormActions";
import { UserPasswordManagement } from "./dialogs/UserPasswordManagement";
import { useUserForm } from "./hooks/useUserForm";
import { deleteUser } from "./UserFormUtils";

export function UserEditDialog({ user, open, onOpenChange, onUserUpdated }) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    isLoading,
    handleSave
  } = useUserForm(user, onUserUpdated, onOpenChange);

  const handleDelete = async () => {
    if (!user?.id) {
      toast({
        title: "Erro",
        description: "ID do usuário não encontrado",
        variant: "destructive",
      });
      return;
    }
    
    setIsDeleting(true);
    try {
      console.log("Deleting user with ID:", user.id);
      await deleteUser(user.id);
      toast({
        title: "Sucesso",
        description: "Usuário excluído com sucesso",
      });
      onUserUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error('Error details:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir usuário",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle>{user?.id ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
          <UserForm 
            register={register}
            setValue={setValue}
            watch={watch}
            userId={user?.id}
          />
          
          {user?.id && (
            <UserPasswordManagement 
              userId={user.id} 
              userEmail={user.email} 
            />
          )}
          
          <DialogFooter>
            <UserFormActions
              userId={user?.id}
              isLoading={isLoading}
              isDeleting={isDeleting}
              onDelete={handleDelete}
              onCancel={() => onOpenChange(false)}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
