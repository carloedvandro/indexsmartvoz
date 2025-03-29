
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  checkExistingUser, 
  createUser, 
  updateProfile, 
  deleteUser 
} from "../UserFormUtils";
import { ProfileWithSponsor } from "@/types/profile";
import { useUserGroups } from "./useUserGroups";
import { useAvailableSponsors } from "./useAvailableSponsors";

export const useUserForm = (
  user: ProfileWithSponsor | null, 
  open: boolean, 
  onOpenChange: (open: boolean) => void, 
  onUserUpdated: () => void
) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { availableSponsors } = useAvailableSponsors(open);
  const { fetchUserGroups, saveUserGroups } = useUserGroups();
  
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      full_name: "",
      last_name: "",
      email: "",
      document_id: "",
      cnpj: "",
      phone: "",
      mobile: "",
      custom_id: "",
      status: "active",
      sponsor_id: null,
      country: "Brasil",
      password: "",
      repeat_password: "",
      user_groups: "",
      ...user,
      birth_date: user?.birth_date?.split('T')[0],
    },
  });

  useEffect(() => {
    if (user) {
      // Reset form with user data
      reset({
        ...user,
        birth_date: user?.birth_date?.split('T')[0],
        user_groups: "", // Will be set by fetchUserGroups
      });
      
      if (user.id) {
        fetchUserGroupsForUser(user.id);
      }
    }
  }, [user, reset]);

  const fetchUserGroupsForUser = async (userId: string) => {
    try {
      const groups = await fetchUserGroups(userId);
      setValue("user_groups", groups.join(", "));
    } catch (error) {
      console.error("Error fetching user groups:", error);
    }
  };

  const watchPassword = watch("password");
  const watchRepeatPassword = watch("repeat_password");

  useEffect(() => {
    if (watchPassword || watchRepeatPassword) {
      setPasswordMatch(watchPassword === watchRepeatPassword);
    }
  }, [watchPassword, watchRepeatPassword]);

  const handleDelete = async () => {
    if (!user?.id) return;
    
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
    if (data.password && data.password !== data.repeat_password) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

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

        // Save user groups
        const groups = data.user_groups ? data.user_groups.split(",").map(g => g.trim()).filter(g => g) : [];
        if (groups.length > 0) {
          await saveUserGroups(authData.user.id, groups);
        }

        toast({
          title: "Sucesso",
          description: "Usuário criado com sucesso",
        });
      } else {
        await updateProfile(user.id, data);
        
        // Save user groups
        const groups = data.user_groups ? data.user_groups.split(",").map(g => g.trim()).filter(g => g) : [];
        await saveUserGroups(user.id, groups);
        
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
    errors,
    isLoading,
    isDeleting,
    passwordMatch,
    availableSponsors,
    handleDelete,
    handleSave
  };
};
