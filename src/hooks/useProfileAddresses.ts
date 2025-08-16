
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProfileAddress, CreateProfileAddress, UpdateProfileAddress } from '@/types/database';

export const useProfileAddresses = (profileId: string) => {
  return useQuery({
    queryKey: ['profile-addresses', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile_addresses')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ProfileAddress[];
    },
    enabled: !!profileId,
  });
};

export const useCreateProfileAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (address: CreateProfileAddress) => {
      const { data, error } = await supabase
        .from('profile_addresses')
        .insert(address)
        .select()
        .single();

      if (error) throw error;
      return data as ProfileAddress;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile-addresses', data.profile_id] });
    },
  });
};

export const useUpdateProfileAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, address }: { id: string; address: UpdateProfileAddress }) => {
      const { data, error } = await supabase
        .from('profile_addresses')
        .update(address)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as ProfileAddress;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile-addresses', data.profile_id] });
    },
  });
};

export const useDeleteProfileAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // Primeiro buscar o profile_id antes de deletar
      const { data: address } = await supabase
        .from('profile_addresses')
        .select('profile_id')
        .eq('id', id)
        .single();

      const { error } = await supabase
        .from('profile_addresses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { id, profile_id: address?.profile_id };
    },
    onSuccess: (data) => {
      if (data.profile_id) {
        queryClient.invalidateQueries({ queryKey: ['profile-addresses', data.profile_id] });
      }
    },
  });
};
