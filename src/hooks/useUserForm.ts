
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { 
  checkExistingUser, 
  createUser, 
  updateProfile, 
  deleteUser,
} from "@/components/admin/UserFormUtils";

interface UseUserFormProps {
  user: any;
  onUserUpdated: () => void;
  onOpenChange: (open: boolean) => void;
}

export function useUserForm({ user, onUserUpdated, onOpenChange }: UseUserFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [initialPassword, setInitialPassword] = useState("");
  
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
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

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    isLoading,
    isDeleting,
    initialPassword,
    setInitialPassword,
    handleDelete,
    handleSave,
  };
}
