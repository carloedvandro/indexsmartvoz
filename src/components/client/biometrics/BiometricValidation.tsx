import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { FacialCapture } from "./FacialCapture";
import { DocumentCapture } from "./DocumentCapture";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";
import { InstructionsStep } from "./steps/InstructionsStep";
import { DocumentInstructionsStep } from "./steps/DocumentInstructionsStep";
import { ProcessingStep } from "./steps/ProcessingStep";
import { CompleteStep } from "./steps/CompleteStep";

type Step = 
  | "instructions" 
  | "facial" 
  | "document-instructions"
  | "document-front" 
  | "document-back" 
  | "processing" 
  | "complete";

interface BiometricValidationProps {
  onComplete?: () => void;
}

export function BiometricValidation({ onComplete }: BiometricValidationProps) {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState<Step>("instructions");
  const [images, setImages] = useState<{
    facial?: string;
    documentFront?: string;
    documentBack?: string;
  }>({});
  const { toast } = useToast();
  const { getSession } = useSession();

  const handleImageCapture = async (imageData: string, type: "facial" | "documentFront" | "documentBack") => {
    try {
      setImages(prev => ({ ...prev, [type]: imageData }));
      
      if (type === "facial") {
        setStep("document-instructions");
      } else if (type === "documentFront") {
        console.log("Front captured, moving to back in 5 seconds");
        toast({
          title: "Frente capturada com sucesso!",
          description: "Aguarde, em 5 segundos vamos capturar o verso do documento",
        });
        setTimeout(() => {
          setStep("document-back");
          toast({
            title: "Vamos lá!",
            description: "Agora vamos capturar o verso do documento",
          });
        }, 5000);
      } else if (type === "documentBack") {
        console.log("Back captured, moving to processing");
        setStep("processing");
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

      setStep("complete");
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
      setStep("instructions");
      setImages({});
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (onComplete) {
      onComplete();
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case "instructions":
        return <InstructionsStep onContinue={() => setStep("facial")} />;

      case "facial":
        return (
          <div className="space-y-4">
            <p className="text-center text-gray-600">
              Vamos tirar uma foto do seu rosto pra sua segurança no app
            </p>
            <FacialCapture onCapture={(image) => handleImageCapture(image, "facial")} />
          </div>
        );

      case "document-instructions":
        return <DocumentInstructionsStep onContinue={() => setStep("document-front")} />;

      case "document-front":
        return (
          <DocumentCapture
            onCapture={(image) => handleImageCapture(image, "documentFront")}
            side="front"
          />
        );

      case "document-back":
        return (
          <DocumentCapture
            onCapture={(image) => handleImageCapture(image, "documentBack")}
            side="back"
          />
        );

      case "processing":
        return <ProcessingStep />;

      case "complete":
        return <CompleteStep onClose={handleClose} />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {step === "instructions" && "Vamos confirmar a sua identidade"}
            {step === "facial" && "Captura Facial"}
            {step === "document-front" && "Documento - Frente"}
            {step === "document-back" && "Documento - Verso"}
            {step === "processing" && "Processando"}
            {step === "complete" && "Deu certo!"}
          </DialogTitle>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          {renderStepContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}