
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ProfilePayment {
  id: string;
  profile_id: string | null;
  amount: number | null;
  status: string | null;
  bank_account_id: string | null;
  payment_at: string | null;
  created_at: string;
}

export interface CreateProfilePayment {
  profile_id: string;
  amount?: number;
  status?: string;
  bank_account_id?: string;
  payment_at?: string;
}

export interface UpdateProfilePayment {
  amount?: number;
  status?: string;
  bank_account_id?: string;
  payment_at?: string;
}

export function useProfilePayments() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const useGetAll = (profileId: string) => {
    return useQuery({
      queryKey: ['profile-payments', profileId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('profile_payments')
          .select('*')
          .eq('profile_id', profileId);
        
        if (error) throw error;
        return data as ProfilePayment[];
      },
      enabled: !!profileId,
    });
  };

  const useCreate = () => {
    return useMutation({
      mutationFn: async (newData: CreateProfilePayment) => {
        const { data, error } = await supabase
          .from('profile_payments')
          .insert(newData)
          .select()
          .single();
        
        if (error) throw error;
        return data as ProfilePayment;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile-payments'] });
        toast({
          title: "Sucesso",
          description: "Pagamento criado com sucesso!",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro",
          description: `Erro ao criar pagamento: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  const useUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: string; data: UpdateProfilePayment }) => {
        const { data: result, error } = await supabase
          .from('profile_payments')
          .update(data)
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        return result as ProfilePayment;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile-payments'] });
        toast({
          title: "Sucesso",
          description: "Pagamento atualizado com sucesso!",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro",
          description: `Erro ao atualizar pagamento: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  const useDelete = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('profile_payments')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        return id;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile-payments'] });
        toast({
          title: "Sucesso",
          description: "Pagamento removido com sucesso!",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro",
          description: `Erro ao deletar pagamento: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  return {
    useGetAll,
    useCreate,
    useUpdate,
    useDelete,
  };
}
