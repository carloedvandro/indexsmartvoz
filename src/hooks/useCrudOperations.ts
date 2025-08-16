
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CrudConfig<T> {
  tableName: string;
  queryKey: string;
  idField?: string;
  profileField?: string;
}

export function useCrudOperations<T extends { id: string }, CreateT, UpdateT>(
  config: CrudConfig<T>
) {
  const { tableName, queryKey, idField = 'id', profileField } = config;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // GET ALL
  const useGetAll = (profileId?: string) => {
    return useQuery({
      queryKey: [queryKey, profileId],
      queryFn: async () => {
        let query = supabase.from(tableName).select('*');
        
        if (profileId && profileField) {
          query = query.eq(profileField, profileId);
        }
        
        const { data, error } = await query;
        if (error) throw error;
        return data as T[];
      },
      enabled: !profileField || !!profileId,
    });
  };

  // GET BY ID
  const useGetById = (id: string) => {
    return useQuery({
      queryKey: [queryKey, id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq(idField, id)
          .single();
        
        if (error) throw error;
        return data as T;
      },
      enabled: !!id,
    });
  };

  // CREATE
  const useCreate = () => {
    return useMutation({
      mutationFn: async (newData: CreateT) => {
        const { data, error } = await supabase
          .from(tableName)
          .insert(newData)
          .select()
          .single();
        
        if (error) throw error;
        return data as T;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast({
          title: "Sucesso",
          description: "Item criado com sucesso!",
        });
      },
      onError: (error: any) => {
        console.error(`Erro ao criar ${tableName}:`, error);
        toast({
          title: "Erro",
          description: `Erro ao criar item: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  // UPDATE
  const useUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: string; data: UpdateT }) => {
        const { data: result, error } = await supabase
          .from(tableName)
          .update(data)
          .eq(idField, id)
          .select()
          .single();
        
        if (error) throw error;
        return result as T;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        queryClient.invalidateQueries({ queryKey: [queryKey, data.id] });
        toast({
          title: "Sucesso",
          description: "Item atualizado com sucesso!",
        });
      },
      onError: (error: any) => {
        console.error(`Erro ao atualizar ${tableName}:`, error);
        toast({
          title: "Erro",
          description: `Erro ao atualizar item: ${error.message}`,
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
          .from(tableName)
          .delete()
          .eq(idField, id);
        
        if (error) throw error;
        return id;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast({
          title: "Sucesso",
          description: "Item removido com sucesso!",
        });
      },
      onError: (error: any) => {
        console.error(`Erro ao deletar ${tableName}:`, error);
        toast({
          title: "Erro",
          description: `Erro ao deletar item: ${error.message}`,
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
