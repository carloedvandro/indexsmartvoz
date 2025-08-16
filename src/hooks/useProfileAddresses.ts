
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ProfileAddress {
  id: string;
  profile_id: string;
  cep: string | null;
  street: string | null;
  neighborhood: string | null;
  number: string | null;
  city: string | null;
  state: string | null;
  complement: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface CreateProfileAddress {
  profile_id: string;
  cep?: string;
  street?: string;
  neighborhood?: string;
  number?: string;
  city?: string;
  state?: string;
  complement?: string;
}

export interface UpdateProfileAddress {
  cep?: string;
  street?: string;
  neighborhood?: string;
  number?: string;
  city?: string;
  state?: string;
  complement?: string;
}

export function useProfileAddresses() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const useGetAll = (profileId: string) => {
    return useQuery({
      queryKey: ['profile-addresses', profileId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('profile_addresses')
          .select('*')
          .eq('profile_id', profileId);
        
        if (error) throw error;
        return data as ProfileAddress[];
      },
      enabled: !!profileId,
    });
  };

  const useCreate = () => {
    return useMutation({
      mutationFn: async (newData: CreateProfileAddress) => {
        const { data, error } = await supabase
          .from('profile_addresses')
          .insert(newData)
          .select()
          .single();
        
        if (error) throw error;
        return data as ProfileAddress;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile-addresses'] });
        toast({
          title: "Sucesso",
          description: "Endereço criado com sucesso!",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro",
          description: `Erro ao criar endereço: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  const useUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: string; data: UpdateProfileAddress }) => {
        const { data: result, error } = await supabase
          .from('profile_addresses')
          .update(data)
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        return result as ProfileAddress;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile-addresses'] });
        toast({
          title: "Sucesso",
          description: "Endereço atualizado com sucesso!",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro",
          description: `Erro ao atualizar endereço: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  const useDelete = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('profile_addresses')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        return id;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile-addresses'] });
        toast({
          title: "Sucesso",
          description: "Endereço removido com sucesso!",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro",
          description: `Erro ao deletar endereço: ${error.message}`,
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
