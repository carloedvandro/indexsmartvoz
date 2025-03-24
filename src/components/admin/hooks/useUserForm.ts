
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { 
  checkExistingUser, 
  createUser, 
  updateProfile 
} from "../UserFormUtils";

export function useUserForm(user, onUserUpdated, onOpenChange) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      ...user,
      birth_date: user?.birth_date?.split('T')[0],
    },
  });

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

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    isLoading,
    handleSave
  };
}
