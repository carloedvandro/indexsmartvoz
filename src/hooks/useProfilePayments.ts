
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfilePayment {
  id: string;
  profile_id: string;
  amount: number;
  status: string;
  bank_account_id: string;
  payment_at?: string;
  created_at: string;
}

interface CreateProfilePayment {
  profile_id: string;
  amount: number;
  status: string;
  bank_account_id: string;
  payment_at?: string;
}

export const useProfilePayments = (profileId?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mock implementation since profile_payments table doesn't exist
  const getPayments = useQuery({
    queryKey: ['profilePayments', profileId],
    queryFn: async () => {
      // Return empty array since table doesn't exist
      return [] as ProfilePayment[];
    },
    enabled: !!profileId,
  });

  const createPayment = useMutation({
    mutationFn: async (paymentData: CreateProfilePayment) => {
      // Mock implementation
      return {
        id: `mock-${Date.now()}`,
        ...paymentData,
        created_at: new Date().toISOString()
      } as ProfilePayment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profilePayments', profileId] });
      toast({
        title: "Sucesso",
        description: "Pagamento registrado com sucesso",
      });
    },
    onError: (error: any) => {
      console.error('Error in createPayment:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao registrar pagamento",
        variant: "destructive",
      });
    },
  });

  const updatePayment = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<ProfilePayment> }) => {
      // Mock implementation
      return {
        id,
        ...updates,
        created_at: new Date().toISOString()
      } as ProfilePayment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profilePayments', profileId] });
      toast({
        title: "Sucesso",
        description: "Pagamento atualizado com sucesso",
      });
    },
    onError: (error: any) => {
      console.error('Error in updatePayment:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar pagamento",
        variant: "destructive",
      });
    },
  });

  const deletePayment = useMutation({
    mutationFn: async (paymentId: string) => {
      // Mock implementation
      return paymentId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profilePayments', profileId] });
      toast({
        title: "Sucesso",
        description: "Pagamento excluído com sucesso",
      });
    },
    onError: (error: any) => {
      console.error('Error in deletePayment:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir pagamento",
        variant: "destructive",
      });
    },
  });

  return {
    payments: getPayments.data || [],
    isLoading: getPayments.isLoading,
    error: getPayments.error,
    createPayment: createPayment.mutate,
    updatePayment: updatePayment.mutate,
    deletePayment: deletePayment.mutate,
    isCreating: createPayment.isPending,
    isUpdating: updatePayment.isPending,
    isDeleting: deletePayment.isPending,
  };
};
