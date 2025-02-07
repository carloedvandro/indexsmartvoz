
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { UserFormTabs } from "./UserFormTabs";
import { UserFormActions } from "./dialogs/UserFormActions";
import { PasswordManagement } from "./dialogs/PasswordManagement";
import { 
  checkExistingUser, 
  createUser, 
  updateProfile, 
  deleteUser,
} from "./UserFormUtils";

export function UserEditDialog({ user, open, onOpenChange, onUserUpdated }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [initialPassword, setInitialPassword] = useState("");
  
  // Initialize form with user data
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      ...user,
      birth_date: user?.birth_date?.split('T')[0],
    },
  });

  // Reset form when user changes
  useEffect(() => {
    if (user) {
      reset({
        ...user,
        birth_date: user?.birth_date?.split('T')[0],
      });
      setInitialPassword(user?.initial_password || "");
    }
  }, [user, reset]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUser(user.id);
      toast({
        title: "Sucesso",
        description: "Usuário excluído com sucesso",
      });
      onUserUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir usuário",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = async (data) => {
    setIsLoading(true);
    try {
      if (!user?.id) {
        const existingUser = await checkExistingUser(data.email);
        if (existingUser) {
          toast({
            title: "Erro",
            description: "Este email já está cadastrado no sistema",
            variant: "destructive",
          });
          return;
        }

        // Generate a random password if not provided
        const password = Math.random().toString(36).slice(-8);
        
        const authData = await createUser({
          ...data,
          password
        });
        
        await updateProfile(authData.user.id, {
          ...data,
          id: authData.user.id,
          initial_password: password
        });

        toast({
          title: "Sucesso",
          description: "Usuário criado com sucesso",
        });
      } else {
        await updateProfile(user.id, data);
        toast({
          title: "Sucesso",
          description: "Usuário atualizado com sucesso",
        });
      }
      
      onUserUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao salvar usuário",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle>{user?.id ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
          <UserFormTabs 
            register={register} 
            setValue={setValue} 
            watch={watch} 
            readOnly={!!user?.id}
          />
          {user?.id && (
            <PasswordManagement
              user={user}
              initialPassword={initialPassword}
              setInitialPassword={setInitialPassword}
            />
          )}
          <DialogFooter>
            <UserFormActions
              userId={user?.id}
              user={user}
              isLoading={isLoading}
              isDeleting={isDeleting}
              onDelete={handleDelete}
              onCancel={() => onOpenChange(false)}
              onSuccess={onUserUpdated}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
