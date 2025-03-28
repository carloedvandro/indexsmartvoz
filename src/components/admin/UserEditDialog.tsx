
import { useState, useEffect } from "react";
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
  
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      document_id: "",
      cnpj: "",
      phone: "",
      mobile: "",
      custom_id: "",
      status: "active",
      sponsor_id: null,
      country: "Brasil",
      ...user,
      birth_date: user?.birth_date?.split('T')[0],
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        ...user,
        birth_date: user?.birth_date?.split('T')[0],
      });
    }
  }, [user, reset]);

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background p-0">
        <div className="bg-[#5438a0] text-white p-4 flex items-center">
          <div className="bg-[#4a3195] p-2 rounded-full mr-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4a4 4 0 100 8 4 4 0 000-8zM6 12a6 6 0 1112 0v0M5.25 19h13.5c.414 0 .75-.336.75-.75 0-2.5-2.5-7.25-7.5-7.25S4.5 15.75 4.5 18.25c0 .414.336.75.75.75z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <DialogTitle className="text-xl font-bold m-0">{user?.id ? 'Editar Usuário' : 'Adicionar Usuário'}</DialogTitle>
          
          <div className="ml-auto text-sm">
            Página inicial do administrador &gt; Lista de Usuário &gt; {user?.id ? 'Editar Usuário' : 'Adicionar Usuário'}
          </div>
        </div>
        
        <form onSubmit={handleSubmit(handleSave)} className="px-6 py-4">
          <div className="mb-4 flex gap-2">
            <Button
              type="button"
              variant="default"
              className="bg-[#5438a0] hover:bg-[#4a3195]"
            >
              Usuário
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-[#5438a0] text-[#5438a0]"
            >
              Adicionar Transação
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input {...register("full_name")} placeholder="Nome completo" />
              </div>
              <div className="space-y-2">
                <Label>Sobrenome</Label>
                <Input {...register("last_name")} placeholder="Sobrenome" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Email</Label>
              <Input {...register("email")} type="email" placeholder="email@exemplo.com" readOnly={!!user?.id} />
            </div>
            
            <div className="space-y-2">
              <Label>Status do fornecedor</Label>
              <select 
                {...register("status")} 
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="active">Habilitar</option>
                <option value="blocked">Desabilitar</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Telefone</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                    <img src="/br-flag.svg" alt="Brasil" className="w-5 h-3 mr-1" /> +55
                  </span>
                  <Input {...register("phone")} className="rounded-l-none" placeholder="Telefone" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nome de usuário</Label>
                <Input {...register("custom_id")} placeholder="Nome de usuário" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Senha</Label>
                <Input type="password" {...register("password")} placeholder="Senha" />
              </div>
              <div className="space-y-2">
                <Label>Repetir a Senha</Label>
                <Input type="password" placeholder="Repetir a senha" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Em Afiliado</Label>
              <select 
                {...register("sponsor_id")} 
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="">-- Nenhum --</option>
                {/* Lista de afiliados aqui */}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>País</Label>
              <select 
                {...register("country")} 
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="Brasil">Brasil</option>
                <option value="Portugal">Portugal</option>
                <option value="Estados Unidos">Estados Unidos</option>
                <option value="Canadá">Canadá</option>
                <option value="Espanha">Espanha</option>
                <option value="Itália">Itália</option>
                <option value="França">França</option>
                <option value="Alemanha">Alemanha</option>
                <option value="Reino Unido">Reino Unido</option>
                <option value="Japão">Japão</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Grupos</Label>
              <Input placeholder="Atribuir grupos de usuários" />
            </div>
          </div>
          
          <div className="mt-8">
            <Button
              type="submit"
              className="w-full bg-[#18cb9f] hover:bg-[#16bb92] text-white h-12 text-lg font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
