
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProfileBankAccount, CreateProfileBankAccount, UpdateProfileBankAccount } from "@/types/database";

export function useProfileBankAccounts() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // GET ALL por profile
  const useGetAll = (profileId: string) => {
    return useQuery({
      queryKey: ['profile-bank-accounts', profileId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('profile_bank_accounts')
          .select('*')
          .eq('profile_id', profileId);
        
        if (error) throw error;
        return data as ProfileBankAccount[];
      },
      enabled: !!profileId,
    });
  };

  // GET BY ID
  const useGetById = (id: string) => {
    return useQuery({
      queryKey: ['profile-bank-accounts', id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('profile_bank_accounts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        return data as ProfileBankAccount;
      },
      enabled: !!id,
    });
  };

  // CREATE
  const useCreate = () => {
    return useMutation({
      mutationFn: async (newData: CreateProfileBankAccount) => {
        const { data, error } = await supabase
          .from('profile_bank_accounts')
          .insert(newData)
          .select()
          .single();
        
        if (error) throw error;
        return data as ProfileBankAccount;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile-bank-accounts'] });
        toast({
          title: "Sucesso",
          description: "Conta bancária criada com sucesso!",
        });
      },
      onError: (error: any) => {
        console.error('Erro ao criar conta bancária:', error);
        toast({
          title: "Erro",
          description: `Erro ao criar conta bancária: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  // UPDATE
  const useUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: string; data: UpdateProfileBankAccount }) => {
        const { data: result, error } = await supabase
          .from('profile_bank_accounts')
          .update(data)
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        return result as ProfileBankAccount;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile-bank-accounts'] });
        toast({
          title: "Sucesso",
          description: "Conta bancária atualizada com sucesso!",
        });
      },
      onError: (error: any) => {
        console.error('Erro ao atualizar conta bancária:', error);
        toast({
          title: "Erro",
          description: `Erro ao atualizar conta bancária: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  // DELETE
  const useDelete = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('profile_bank_accounts')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        return id;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile-bank-accounts'] });
        toast({
          title: "Sucesso",
          description: "Conta bancária removida com sucesso!",
        });
      },
      onError: (error: any) => {
        console.error('Erro ao deletar conta bancária:', error);
        toast({
          title: "Erro",
          description: `Erro ao deletar conta bancária: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  return {
    useGetAll,
    useGetById,
    useCreate,
    useUpdate,
    useDelete,
  };
}
