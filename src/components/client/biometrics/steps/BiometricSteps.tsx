import { useState } from "react";
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/integrations/supabase/client";
import { StepHeader } from "./StepHeader";
import { StepContent } from "./StepContent";
import { useToast } from "@/hooks/use-toast";

type Step = 
  | "cpf"
  | "camera-tips"
  | "facial"
  | "document-tips"
  | "document-type"
  | "document-front"
  | "document-back"
  | "processing"
  | "complete";

type DocumentType = "rg" | "cnh";

interface BiometricStepsProps {
  onClose: () => void;
  toast: ReturnType<typeof useToast>;
}

export function BiometricSteps({ onClose, toast }: BiometricStepsProps) {
  const [step, setStep] = useState<Step>("cpf");
  const [cpf, setCpf] = useState("");
  const [documentType, setDocumentType] = useState<DocumentType>("rg");
  const [images, setImages] = useState<{
    facial?: string;
    documentFront?: string;
    documentBack?: string;
  }>({});
  const { getSession } = useSession();

  const handleCpfValidation = (validCpf: string) => {
    setCpf(validCpf);
    setStep("camera-tips");
  };

  const handleImageCapture = async (imageData: string, type: "facial" | "documentFront" | "documentBack") => {
    setImages(prev => ({ ...prev, [type]: imageData }));
    
    if (type === "facial") {
      setStep("document-tips");
    } else if (type === "documentFront") {
      if (documentType === "cnh") {
        setStep("processing");
        await processValidation();
      } else {
        setStep("document-back");
      }
    } else if (type === "documentBack") {
      setStep("processing");
      await processValidation();
    }
  };

  const processValidation = async () => {
    try {
      const session = await getSession();
      if (!session?.user) {
        throw new Error("Usuário não autenticado");
      }

      const uploadImage = async (imageData: string, path: string) => {
        const { error } = await supabase.storage
          .from("biometrics")
          .upload(`${session.user.id}/${path}`, imageData, { upsert: true });
        if (error) throw error;
        return `${session.user.id}/${path}`;
      };

      const facialPath = await uploadImage(images.facial!, "facial.jpg");
      const frontPath = await uploadImage(images.documentFront!, "document-front.jpg");
      const backPath = documentType === "rg" 
        ? await uploadImage(images.documentBack!, "document-back.jpg")
        : null;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          cpf,
          facial_validation_status: "pending",
          facial_validation_image: facialPath,
          document_type: documentType,
          document_front_image: frontPath,
          document_back_image: backPath,
          document_validation_status: "pending",
        })
        .eq("id", session.user.id);

      if (updateError) throw updateError;

      setStep("complete");
      toast({
        title: "Validação enviada com sucesso!",
        description: "Suas imagens foram enviadas para análise. Em breve você receberá uma resposta.",
      });

    } catch (error: any) {
      console.error("Erro no processo de validação:", error);
      toast({
        title: "Erro no processo",
        description: "Ocorreu um erro ao processar suas imagens. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-4">
      <StepHeader step={step} />
      <StepContent
        step={step}
        documentType={documentType}
        onCpfValidation={handleCpfValidation}
        onImageCapture={handleImageCapture}
        onDocumentTypeSelect={setDocumentType}
        onClose={onClose}
      />
    </div>
  );
}