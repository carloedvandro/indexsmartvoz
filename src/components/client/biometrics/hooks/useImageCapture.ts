import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";

type ImageType = "facial" | "documentFront" | "documentBack";

interface Images {
  facial?: string;
  documentFront?: string;
  documentBack?: string;
}

export const useImageCapture = (onStepChange: (step: string) => void) => {
  const [images, setImages] = useState<Images>({});
  const { toast } = useToast();
  const { getSession } = useSession();

  const handleImageCapture = async (imageData: string, type: ImageType) => {
    try {
      const session = await getSession();
      if (!session?.user) {
        throw new Error("Usuário não autenticado");
      }

      // Primeiro salvamos a imagem no estado
      setImages(prev => ({ ...prev, [type]: imageData }));

      // Se for imagem facial, tentamos fazer o upload imediatamente
      if (type === "facial") {
        const facialPath = `biometrics/${session.user.id}/facial.jpg`;
        
        // Converter base64 para blob
        const base64Data = imageData.split(',')[1];
        const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());
        
        console.log("Iniciando upload da imagem facial...");
        
        const { error: uploadError } = await supabase.storage
          .from("biometrics")
          .upload(facialPath, blob, {
            contentType: 'image/jpeg',
            upsert: true,
          });

        if (uploadError) {
          console.error("Erro no upload facial:", uploadError);
          throw new Error("Erro ao fazer upload da imagem facial");
        }

        console.log("Upload facial concluído com sucesso");
        onStepChange("document-instructions");
        
        toast({
          title: "Imagem facial capturada com sucesso!",
          description: "Agora vamos capturar seus documentos.",
        });
      } else if (type === "documentFront") {
        console.log("Frente do documento capturada");
        toast({
          title: "Frente capturada com sucesso!",
          description: "Aguarde, em 5 segundos vamos capturar o verso do documento",
        });
        setTimeout(() => {
          onStepChange("document-back");
        }, 5000);
      } else if (type === "documentBack") {
        console.log("Verso do documento capturado, iniciando processamento");
        onStepChange("processing");
        await processValidation();
      }
    } catch (error: any) {
      console.error("Erro detalhado na captura:", error);
      toast({
        title: "Erro no processo",
        description: error.message || "Ocorreu um erro ao processar sua imagem. Por favor, tente novamente.",
        variant: "destructive",
      });
      onStepChange("instructions");
    }
  };

  const processValidation = async () => {
    try {
      const session = await getSession();
      if (!session?.user) {
        throw new Error("Usuário não autenticado");
      }

      // Upload dos documentos
      const paths = {
        documentFront: `biometrics/${session.user.id}/document-front.jpg`,
        documentBack: `biometrics/${session.user.id}/document-back.jpg`
      };

      console.log("Iniciando upload dos documentos...");

      // Upload do documento frente
      const frontBlob = await fetch(`data:image/jpeg;base64,${images.documentFront?.split(',')[1]}`).then(res => res.blob());
      const { error: frontError } = await supabase.storage
        .from("biometrics")
        .upload(paths.documentFront, frontBlob, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (frontError) {
        throw new Error("Erro ao fazer upload da frente do documento");
      }

      // Upload do documento verso
      const backBlob = await fetch(`data:image/jpeg;base64,${images.documentBack?.split(',')[1]}`).then(res => res.blob());
      const { error: backError } = await supabase.storage
        .from("biometrics")
        .upload(paths.documentBack, backBlob, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (backError) {
        throw new Error("Erro ao fazer upload do verso do documento");
      }

      console.log("Upload dos documentos concluído, iniciando processamento...");

      // Simular tempo de processamento (2 minutos)
      toast({
        title: "Processando documentos",
        description: "Aguarde enquanto validamos seus documentos. Isso pode levar alguns minutos.",
      });

      await new Promise(resolve => setTimeout(resolve, 120000)); // 2 minutos

      // Atualizar status da validação
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          facial_validation_status: "approved",
          facial_validation_image: paths.documentFront,
          document_validated: true,
          document_validation_date: new Date().toISOString(),
        })
        .eq("id", session.user.id);

      if (updateError) {
        throw new Error("Erro ao atualizar o status da validação");
      }

      onStepChange("complete");
      toast({
        title: "Validação concluída!",
        description: "Suas informações foram validadas com sucesso.",
      });

    } catch (error: any) {
      console.error("Erro detalhado no processamento:", error);
      toast({
        title: "Erro no processamento",
        description: error.message || "Ocorreu um erro ao processar suas imagens. Por favor, tente novamente.",
        variant: "destructive",
      });
      onStepChange("instructions");
      setImages({});
    }
  };

  return { handleImageCapture, images };
};