
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const bankingFormSchema = z.object({
  key_pix: z.string().min(1, "Chave PIX é obrigatória"),
  type_key_pix: z.enum(["cpf", "email", "phone", "random"], {
    required_error: "Tipo da chave PIX é obrigatório",
  }),
});

export type BankingFormData = z.infer<typeof bankingFormSchema>;

export interface BankAccount {
  id: string;
  profile_id: string;
  key_pix: string;
  type_key_pix: 'cpf' | 'email' | 'phone' | 'random';
  created_at: string;
}

export const useBankingFormNew = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<BankingFormData>({
    resolver: zodResolver(bankingFormSchema),
    defaultValues: {
      key_pix: "",
      type_key_pix: "cpf",
    },
  });

  // Query para buscar contas bancárias
  const { data: bankAccounts, isLoading, error } = useQuery({
    queryKey: ['bank-accounts'],
    queryFn: async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('profile_bank_accounts')
        .select('*')
        .eq('profile_id', sessionData.session.user.id);

      if (error) throw error;
      return data as BankAccount[];
    },
  });

  // Mutation para criar conta bancária
  const createBankAccount = useMutation({
    mutationFn: async (formData: BankingFormData) => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('profile_bank_accounts')
        .insert({
          profile_id: sessionData.session.user.id,
          key_pix: formData.key_pix,
          type_key_pix: formData.type_key_pix
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
      form.reset();
      toast({
        title: "Sucesso!",
        description: "Conta bancária cadastrada com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao cadastrar conta bancária.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: BankingFormData) => {
    setIsSubmitting(true);
    try {
      await createBankAccount.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
    bankAccounts,
    isLoading,
    error,
  };
};
