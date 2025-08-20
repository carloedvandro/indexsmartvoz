
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileDocument {
  id: string;
  user_id: string;
  document_type: string;
  side: string;
  image_url: string;
  created_at: string;
}

interface CreateProfileDocument {
  user_id: string;
  document_type: string;
  side: string;
  image_url: string;
}

export const useProfileDocuments = (userId?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getDocuments = useQuery({
    queryKey: ['profileDocuments', userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from('document_captures')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching documents:', error);
        throw error;
      }

      return data as ProfileDocument[];
    },
    enabled: !!userId,
  });

  const createDocument = useMutation({
    mutationFn: async (documentData: CreateProfileDocument) => {
      const { data, error } = await supabase
        .from('document_captures')
        .insert(documentData)
        .select()
        .single();

      if (error) {
        console.error('Error creating document:', error);
        throw error;
      }

      return data as ProfileDocument;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profileDocuments', userId] });
      toast({
        title: "Sucesso",
        description: "Documento salvo com sucesso",
      });
    },
    onError: (error: any) => {
      console.error('Error in createDocument:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao salvar documento",
        variant: "destructive",
      });
    },
  });

  const updateDocument = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<ProfileDocument> }) => {
      const { data, error } = await supabase
        .from('document_captures')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating document:', error);
        throw error;
      }

      return data as ProfileDocument;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profileDocuments', userId] });
      toast({
        title: "Sucesso",
        description: "Documento atualizado com sucesso",
      });
    },
    onError: (error: any) => {
      console.error('Error in updateDocument:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar documento",
        variant: "destructive",
      });
    },
  });

  const deleteDocument = useMutation({
    mutationFn: async (documentId: string) => {
      const { error } = await supabase
        .from('document_captures')
        .delete()
        .eq('id', documentId);

      if (error) {
        console.error('Error deleting document:', error);
        throw error;
      }

      return documentId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profileDocuments', userId] });
      toast({
        title: "Sucesso",
        description: "Documento excluído com sucesso",
      });
    },
    onError: (error: any) => {
      console.error('Error in deleteDocument:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir documento",
        variant: "destructive",
      });
    },
  });

  return {
    documents: getDocuments.data || [],
    isLoading: getDocuments.isLoading,
    error: getDocuments.error,
    createDocument: createDocument.mutate,
    updateDocument: updateDocument.mutate,
    deleteDocument: deleteDocument.mutate,
    isCreating: createDocument.isPending,
    isUpdating: updateDocument.isPending,
    isDeleting: deleteDocument.isPending,
  };
};
