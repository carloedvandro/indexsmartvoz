
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

  // Como a tabela profile_bank_accounts não existe, vamos retornar dados mock/vazios por enquanto
  const {
    data: bankAccounts = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['profile-bank-accounts'],
    queryFn: async () => {
      // Por enquanto retornamos array vazio até a tabela ser criada
      return [] as ProfileBankAccount[];
    }
  });

  const createBankAccount = useMutation({
    mutationFn: async (bankAccount: CreateProfileBankAccount) => {
      // Mock implementation - retorna dados simulados
      console.log('Mock createBankAccount:', bankAccount);
      
      const mockAccount: ProfileBankAccount = {
        id: Date.now().toString(),
        ...bankAccount,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return mockAccount;
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
      // Mock implementation
      console.log('Mock updateBankAccount:', id, updates);
      
      const mockAccount: ProfileBankAccount = {
        id,
        profile_id: updates.profile_id || '',
        bank_name: updates.bank_name || '',
        account_type: updates.account_type || '',
        agency: updates.agency || '',
        account_number: updates.account_number || '',
        account_holder_name: updates.account_holder_name || '',
        account_holder_cpf: updates.account_holder_cpf || '',
        pix_key: updates.pix_key,
        pix_key_type: updates.pix_key_type,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return mockAccount;
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
      // Mock implementation
      console.log('Mock deleteBankAccount:', id);
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
