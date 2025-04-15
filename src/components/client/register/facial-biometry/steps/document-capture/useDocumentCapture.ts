
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UseDocumentCaptureProps {
  selectedDocType: 'rg' | 'cnh';
  isBackSide: boolean;
  onNext: (imageSrc: string) => void;
}

export const useDocumentCapture = ({
  selectedDocType,
  isBackSide,
  onNext
}: UseDocumentCaptureProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureAttempted, setCaptureAttempted] = useState(false);
  const { toast } = useToast();

  const handleDocumentCapture = async (imageSrc: string | null) => {
    if (!imageSrc) {
      toast({
        title: "Erro na Captura",
        description: "Não foi possível capturar a imagem do documento. Por favor, tente novamente.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCapturing(true);
      setCaptureAttempted(true);

      // Get user session - check if user is logged in
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session?.user) {
        console.error("No authenticated user found");
        toast({
          title: "Erro de Autenticação",
          description: "Usuário não está autenticado. Por favor, faça login novamente.",
          variant: "destructive",
        });
        return;
      }
      
      const user = sessionData.session.user;

      // Convert base64 to blob
      const blob = await fetch(imageSrc).then(res => res.blob());
      const file = new File([blob], `document-${Date.now()}.jpg`, { type: 'image/jpeg' });

      // Create filepath
      const filePath = `${user.id}/${selectedDocType}/${isBackSide ? 'back' : 'front'}/${Date.now()}.jpg`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Insert record in document_captures table
      const { error: dbError } = await supabase
        .from('document_captures')
        .insert({
          user_id: user.id,
          document_type: selectedDocType,
          side: isBackSide ? 'back' : 'front',
          image_url: filePath
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      toast({
        title: "Documento Capturado",
        description: "Imagem do documento capturada com sucesso!",
      });

      // Delay the onNext call slightly to ensure the user sees the success message
      setTimeout(() => {
        onNext(imageSrc);
      }, 1000);

    } catch (error) {
      console.error('Error saving document capture:', error);
      toast({
        title: "Erro ao Salvar",
        description: "Ocorreu um erro ao salvar a imagem do documento. Por favor, tente novamente.",
        variant: "destructive",
      });
      setCaptureAttempted(false);
    } finally {
      setIsCapturing(false);
    }
  };

  const retryCapture = () => {
    setCaptureAttempted(false);
    setIsCapturing(false);
  };

  return {
    isCapturing,
    captureAttempted,
    handleDocumentCapture,
    retryCapture
  };
};
