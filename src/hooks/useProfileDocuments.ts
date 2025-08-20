
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ProfileDocument {
  id: string;
  profile_id: string;
  document_type: string;
  image_url: string;
  side: string;
  created_at: string;
}

export interface CreateProfileDocument {
  profile_id: string;
  document_type: string;
  image_url: string;
  side: string;
}

export const useProfileDocuments = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: documents = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['profile-documents'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('document_captures')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      
      return data.map(doc => ({
        id: doc.id,
        profile_id: doc.user_id,
        document_type: doc.document_type,
        image_url: doc.image_url,
        side: doc.side,
        created_at: doc.created_at
      })) as ProfileDocument[];
    }
  });

  const createDocument = useMutation({
    mutationFn: async (document: CreateProfileDocument) => {
      const { data, error } = await supabase
        .from('document_captures')
        .insert({
          user_id: document.profile_id,
          document_type: document.document_type,
          image_url: document.image_url,
          side: document.side
        })
        .select()
        .single();

      if (error) throw error;
      
      return {
        id: data.id,
        profile_id: data.user_id,
        document_type: data.document_type,
        image_url: data.image_url,
        side: data.side,
        created_at: data.created_at
      } as ProfileDocument;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-documents'] });
      toast({
        title: "Documento salvo",
        description: "Documento salvo com sucesso!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao salvar documento",
        description: error.message || "Erro ao salvar documento",
        variant: "destructive",
      });
    }
  });

  const updateDocument = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<CreateProfileDocument> }) => {
      const { data, error } = await supabase
        .from('document_captures')
        .update({
          document_type: updates.document_type,
          image_url: updates.image_url,
          side: updates.side
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      return {
        id: data.id,
        profile_id: data.user_id,
        document_type: data.document_type,
        image_url: data.image_url,
        side: data.side,
        created_at: data.created_at
      } as ProfileDocument;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-documents'] });
      toast({
        title: "Documento atualizado",
        description: "Documento atualizado com sucesso!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar documento",
        description: error.message || "Erro ao atualizar documento",
        variant: "destructive",
      });
    }
  });

  const deleteDocument = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('document_captures')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-documents'] });
      toast({
        title: "Documento removido",
        description: "Documento removido com sucesso!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao remover documento",
        description: error.message || "Erro ao remover documento",
        variant: "destructive",
      });
    }
  });

  return {
    documents,
    isLoading,
    error,
    createDocument: createDocument.mutate,
    updateDocument: updateDocument.mutate,
    deleteDocument: deleteDocument.mutate,
    isCreating: createDocument.isPending,
    isUpdating: updateDocument.isPending,
    isDeleting: deletDocument.isPending
  };
};
