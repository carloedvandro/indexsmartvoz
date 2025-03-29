
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserFormTabs } from "./UserFormTabs";
import { UserFormActions } from "./dialogs/UserFormActions";
import { 
  checkExistingUser, 
  createUser, 
  updateProfile, 
  deleteUser,
  adminResetPassword,
  adminSetUserPassword 
} from "./UserFormUtils";

export function UserEditDialog({ user, open, onOpenChange, onUserUpdated }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      ...user,
      birth_date: user?.birth_date?.split('T')[0],
    },
  });

  const handleResetPassword = async () => {
    if (!user?.email) {
      toast({
        title: "Erro",
        description: "Email do usuário não encontrado",
        variant: "destructive",
      });
      return;
    }

    setIsResettingPassword(true);
    try {
      await adminResetPassword(user.email);
      toast({
        title: "Sucesso",
        description: "Email com instruções de redefinição de senha enviado para o usuário",
      });
      setShowPasswordInput(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao resetar senha",
        variant: "destructive",
      });
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleSetPassword = async () => {
    if (!newPassword) {
      toast({
        title: "Erro",
        description: "Digite a nova senha",
        variant: "destructive",
      });
      return;
    }

    if (!user?.id) {
      toast({
        title: "Erro",
        description: "ID do usuário não encontrado",
        variant: "destructive",
      });
      return;
    }

    setIsSettingPassword(true);
    try {
      await adminSetUserPassword(user.id, newPassword);
      toast({
        title: "Sucesso",
        description: "Senha alterada com sucesso",
      });
      setShowPasswordInput(false);
      setNewPassword("");
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao definir nova senha",
        variant: "destructive",
      });
    } finally {
      setIsSettingPassword(false);
    }
  };

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
      if (!user.id) {
        const existingUser = await checkExistingUser(data.email);
        if (existingUser) {
          toast({
            title: "Erro",
            description: "Este email já está cadastrado no sistema",
            variant: "destructive",
          });
          return;
        }

        const authData = await createUser(data);
        await updateProfile(authData.user.id, {
          ...data,
          id: authData.user.id,
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
            <div className="flex flex-col gap-4 px-6">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPasswordInput(!showPasswordInput)}
                  >
                    Definir Nova Senha
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResetPassword}
                    disabled={isResettingPassword}
                  >
                    {isResettingPassword ? "Enviando..." : "Enviar Email de Reset"}
                  </Button>
                </div>
                
                {showPasswordInput && (
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Digite a nova senha"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={handleSetPassword}
                      disabled={isSettingPassword}
                    >
                      {isSettingPassword ? "Salvando..." : "Salvar Senha"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
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
