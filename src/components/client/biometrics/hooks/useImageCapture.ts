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
      setImages(prev => ({ ...prev, [type]: imageData }));
      
      if (type === "facial") {
        onStepChange("document-instructions");
      } else if (type === "documentFront") {
        console.log("Front captured, moving to back in 5 seconds");
        toast({
          title: "Frente capturada com sucesso!",
          description: "Aguarde, em 5 segundos vamos capturar o verso do documento",
        });
        setTimeout(() => {
          onStepChange("document-back");
          toast({
            title: "Vamos lá!",
            description: "Agora vamos capturar o verso do documento",
          });
        }, 5000);
      } else if (type === "documentBack") {
        console.log("Back captured, moving to processing");
        onStepChange("processing");
        await processValidation();
      }
    } catch (error) {
      console.error("Erro na captura da imagem:", error);
      toast({
        title: "Erro na captura",
        description: "Ocorreu um erro ao capturar a imagem. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const processValidation = async () => {
    try {
      const session = await getSession();
      if (!session?.user) {
        throw new Error("Usuário não autenticado");
      }

      // Upload da imagem facial
      const facialPath = `biometrics/${session.user.id}/facial.jpg`;
      const { error: facialError } = await supabase.storage
        .from("biometrics")
        .upload(facialPath, images.facial!, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (facialError) throw facialError;

      // Upload do documento frente
      const frontPath = `biometrics/${session.user.id}/document-front.jpg`;
      const { error: frontError } = await supabase.storage
        .from("biometrics")
        .upload(frontPath, images.documentFront!, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (frontError) throw frontError;

      // Upload do documento verso
      const backPath = `biometrics/${session.user.id}/document-back.jpg`;
      const { error: backError } = await supabase.storage
        .from("biometrics")
        .upload(backPath, images.documentBack!, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (backError) throw backError;

      // Simular um tempo de processamento
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Atualizar status da validação no perfil
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          facial_validation_status: "approved",
          facial_validation_image: facialPath,
          document_validated: true,
          document_validation_date: new Date().toISOString(),
        })
        .eq("id", session.user.id);

      if (updateError) throw updateError;

      onStepChange("complete");
      toast({
        title: "Validação concluída!",
        description: "Suas informações foram validadas com sucesso.",
      });

    } catch (error: any) {
      console.error("Erro detalhado no processo de validação:", error);
      toast({
        title: "Erro no processo",
        description: "Ocorreu um erro ao processar suas imagens. Por favor, tente novamente.",
        variant: "destructive",
      });
      onStepChange("instructions");
      setImages({});
    }
  };

  return { handleImageCapture, images };
};