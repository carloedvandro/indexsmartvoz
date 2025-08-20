
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ProfileDocument {
  id: string;
  profile_id: string;
  image_url: string;
  side: 'front' | 'back';
  state?: string;
  created_at: string;
}

export interface CreateProfileDocument {
  profile_id: string;
  image_url: string;
  side: 'front' | 'back';
  state?: string;
}

export const useProfileDocuments = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: documents, isLoading, error } = useQuery({
    queryKey: ['profile-documents'],
    queryFn: async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('profile_document')
        .select('*')
        .eq('profile_id', sessionData.session.user.id);

      if (error) throw error;
      return data as ProfileDocument[];
    },
  });

  const createDocument = useMutation({
    mutationFn: async (documentData: CreateProfileDocument) => {
      const { data, error } = await supabase
        .from('profile_document')
        .insert({
          profile_id: documentData.profile_id,
          image_url: documentData.image_url,
          side: documentData.side,
          state: documentData.state || 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return data as ProfileDocument;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-documents'] });
      toast({
        title: "Documento enviado",
        description: "Documento foi enviado com sucesso para análise.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar documento",
        description: error.message || "Ocorreu um erro ao enviar o documento.",
        variant: "destructive",
      });
    },
  });

  const updateDocument = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<ProfileDocument> }) => {
      const { data, error } = await supabase
        .from('profile_document')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as ProfileDocument;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-documents'] });
      toast({
        title: "Documento atualizado",
        description: "Documento foi atualizado com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar documento",
        description: error.message || "Ocorreu um erro ao atualizar o documento.",
        variant: "destructive",
      });
    },
  });

  const deleteDocument = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('profile_document')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-documents'] });
      toast({
        title: "Documento removido",
        description: "Documento foi removido com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao remover documento",
        description: error.message || "Ocorreu um erro ao remover o documento.",
        variant: "destructive",
      });
    },
  });

  const uploadFile = async (file: File, documentSide: 'front' | 'back') => {
    try {
      setIsUploading(true);
      
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.user) {
        throw new Error('User not authenticated');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${sessionData.session.user.id}/${documentSide}_${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('document_images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('document_images')
        .getPublicUrl(fileName);

      await createDocument.mutateAsync({
        profile_id: sessionData.session.user.id,
        image_url: urlData.publicUrl,
        side: documentSide,
        state: 'pending'
      });

      return urlData.publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    documents,
    isLoading,
    error,
    isUploading,
    uploadFile,
    createDocument: createDocument.mutate,
    updateDocument: updateDocument.mutate,
    deleteDocument: deleteDocument.mutate,
    isCreating: createDocument.isPending,
    isUpdating: updateDocument.isPending,
    isDeleting: deleteDocument.isPending,
  };
};
