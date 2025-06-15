
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  const uploadDocumentImage = async (imageSrc: string): Promise<string> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      // Convert base64 to blob
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      
      // Generate filename
      const timestamp = Date.now();
      const side = isBackSide ? 'back' : 'front';
      const filename = `document-${selectedDocType}-${side}-${user.id}-${timestamp}.jpg`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('documents')
        .upload(filename, blob, {
          contentType: 'image/jpeg',
          upsert: false
        });

      if (error) {
        console.error('Storage upload error:', error);
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filename);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading document image:', error);
      throw error;
    }
  };

  const handleDocumentCapture = async (imageSrc: string) => {
    try {
      setIsCapturing(true);
      setCaptureAttempted(true);
      
      console.log("📸 Iniciando upload do documento...");
      
      // Upload image
      await uploadDocumentImage(imageSrc);
      
      console.log("✅ Upload do documento concluído");
      
      // Wait a bit for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Continue to next step
      onNext(imageSrc);
    } catch (error: any) {
      console.error('❌ Erro no upload do documento:', error);
      toast({
        title: "Erro no Upload",
        description: "Erro ao salvar documento. Tente novamente.",
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
