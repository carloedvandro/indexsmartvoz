
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
import { supabase } from "@/integrations/supabase/client";
import { 
  checkExistingUser, 
  createUser, 
  updateProfile, 
  deleteUser,
} from "../UserFormUtils";
import { ProfileWithSponsor } from "@/types/profile";
import { UserFormHeader } from "./UserFormHeader";
import { UserInfoDisplay } from "./UserInfoDisplay";
import { UserFormFields } from "./UserFormFields";
import { UserFormButtons } from "./UserFormButtons";
import { UserPasswordActions } from "./UserPasswordActions";
import { useAvailableSponsors } from "../hooks/useAvailableSponsors";
import { useUserGroups } from "../hooks/useUserGroups";

export function UserEditDialog({ user, open, onOpenChange, onUserUpdated }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { availableSponsors } = useAvailableSponsors(open);
  const { saveUserGroups } = useUserGroups();
  
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
        fetchUserGroups(user.id);
      }
    }
  }, [user, reset]);

  const fetchUserGroups = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("user_groups")
        .select("group_name")
        .eq("user_id", userId);
      
      if (error) throw error;
      
      const groups = data?.map(item => item.group_name) || [];
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background p-0">
        <UserFormHeader user={user} />
        
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
          
          <UserInfoDisplay user={user} />
          
          <UserFormFields 
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            passwordMatch={passwordMatch}
            user={user}
            availableSponsors={availableSponsors}
          />
          
          {user?.id && (
            <UserPasswordActions 
              userId={user.id}
              userEmail={user.email}
            />
          )}
          
          <div className="mt-8">
            <UserFormButtons 
              onDelete={user?.id ? handleDelete : undefined}
              isDeleting={isDeleting}
              isLoading={isLoading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
