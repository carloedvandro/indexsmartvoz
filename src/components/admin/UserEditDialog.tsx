import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserFormTabs } from "./UserFormTabs";
import { checkExistingUser, createUser, updateProfile } from "./UserFormUtils";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function UserEditDialog({ user, open, onOpenChange, onUserUpdated }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      ...user,
      birth_date: user?.birth_date?.split('T')[0],
    },
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase.rpc('delete_user_and_profile', {
        user_id: user.id
      });

      if (error) throw error;

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

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (!user.id) {
        // Check if user exists
        const existingUser = await checkExistingUser(data.email);

        if (existingUser) {
          toast({
            title: "Erro",
            description: "Este email já está cadastrado no sistema",
            variant: "destructive",
          });
          return;
        }

        try {
          // Create new user
          const authData = await createUser(data);
          
          // Update the profile
          await updateProfile(authData.user.id, {
            ...data,
            id: authData.user.id,
          });

          toast({
            title: "Sucesso",
            description: "Usuário criado com sucesso",
          });
        } catch (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Erro",
              description: "Este email já está cadastrado no sistema",
              variant: "destructive",
            });
            return;
          }
          throw error;
        }
      } else {
        // Update existing user
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <UserFormTabs 
            register={register} 
            setValue={setValue} 
            watch={watch} 
            readOnly={!!user?.id}
          />
          <DialogFooter className="flex justify-between items-center">
            <div className="flex gap-2">
              {user?.id && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Excluindo..." : "Excluir"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}