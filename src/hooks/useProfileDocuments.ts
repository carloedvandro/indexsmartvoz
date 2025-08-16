
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ProfileDocument {
  id: string;
  profile_id: string;
  image_url: string | null;
  state: string | null;
  side: string | null;
  created_at: string;
}

export interface CreateProfileDocument {
  profile_id: string;
  image_url?: string;
  state?: string;
  side?: string;
}

export interface UpdateProfileDocument {
  image_url?: string;
  state?: string;
  side?: string;
}

export function useProfileDocuments() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const useGetAll = (profileId: string) => {
    return useQuery({
      queryKey: ['profile-documents', profileId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('profile_document')
          .select('*')
          .eq('profile_id', profileId);
        
        if (error) throw error;
        return data as ProfileDocument[];
      },
      enabled: !!profileId,
    });
  };

  const useCreate = () => {
    return useMutation({
      mutationFn: async (newData: CreateProfileDocument) => {
        const { data, error } = await supabase
          .from('profile_document')
          .insert(newData)
          .select()
          .single();
        
        if (error) throw error;
        return data as ProfileDocument;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile-documents'] });
        toast({
          title: "Sucesso",
          description: "Documento criado com sucesso!",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro",
          description: `Erro ao criar documento: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  const useUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: string; data: UpdateProfileDocument }) => {
        const { data: result, error } = await supabase
          .from('profile_document')
          .update(data)
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        return result as ProfileDocument;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile-documents'] });
        toast({
          title: "Sucesso",
          description: "Documento atualizado com sucesso!",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro",
          description: `Erro ao atualizar documento: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  const useDelete = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('profile_document')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        return id;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile-documents'] });
        toast({
          title: "Sucesso",
          description: "Documento removido com sucesso!",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro",
          description: `Erro ao deletar documento: ${error.message}`,
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
