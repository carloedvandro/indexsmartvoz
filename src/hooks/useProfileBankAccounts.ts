
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ProfileBankAccount {
  id: string;
  profile_id: string;
  bank_name: string;
  account_type: string;
  agency: string;
  account_number: string;
  account_holder_name: string;
  account_holder_cpf: string;
  pix_key?: string;
  pix_key_type?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateProfileBankAccount {
  profile_id: string;
  bank_name: string;
  account_type: string;
  agency: string;
  account_number: string;
  account_holder_name: string;
  account_holder_cpf: string;
  pix_key?: string;
  pix_key_type?: string;
}

export const useProfileBankAccounts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: bankAccounts = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['profile-bank-accounts'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profile_bank_accounts')
        .select('*')
        .eq('profile_id', user.id)
        .eq('is_active', true);

      if (error) throw error;
      return data as ProfileBankAccount[];
    }
  });

  const createBankAccount = useMutation({
    mutationFn: async (bankAccount: CreateProfileBankAccount) => {
      const { data, error } = await supabase
        .from('profile_bank_accounts')
        .insert(bankAccount)
        .select()
        .single();

      if (error) throw error;
      return data as ProfileBankAccount;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-bank-accounts'] });
      toast({
        title: "Conta bancária salva",
        description: "Dados bancários salvos com sucesso!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao salvar",
        description: error.message || "Erro ao salvar dados bancários",
        variant: "destructive",
      });
    }
  });

  const updateBankAccount = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<CreateProfileBankAccount> }) => {
      const { data, error } = await supabase
        .from('profile_bank_accounts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as ProfileBankAccount;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-bank-accounts'] });
      toast({
        title: "Conta atualizada",
        description: "Dados bancários atualizados com sucesso!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar",
        description: error.message || "Erro ao atualizar dados bancários",
        variant: "destructive",
      });
    }
  });

  const deleteBankAccount = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('profile_bank_accounts')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-bank-accounts'] });
      toast({
        title: "Conta removida",
        description: "Conta bancária removida com sucesso!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao remover",
        description: error.message || "Erro ao remover conta bancária",
        variant: "destructive",
      });
    }
  });

  return {
    bankAccounts,
    isLoading,
    error,
    createBankAccount: createBankAccount.mutate,
    updateBankAccount: updateBankAccount.mutate,
    deleteBankAccount: deleteBankAccount.mutate,
    isCreating: createBankAccount.isPending,
    isUpdating: updateBankAccount.isPending,
    isDeleting: deleteBankAccount.isPending
  };
};
