import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { FacialCapture } from "./FacialCapture";
import { DocumentCapture } from "./DocumentCapture";
import { InstructionsStep } from "./steps/InstructionsStep";
import { ProcessingStep } from "./steps/ProcessingStep";
import { CompleteStep } from "./steps/CompleteStep";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";

type Step = 
  | "instructions" 
  | "facial" 
  | "document-front" 
  | "document-back" 
  | "processing" 
  | "complete";

export function BiometricValidation() {
  const location = useLocation();
  const initialStep = location.state?.initialStep || "instructions";
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState<Step>(initialStep);
  const [images, setImages] = useState<{
    facial?: string;
    documentFront?: string;
    documentBack?: string;
  }>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  const { getSession } = useSession();

  useEffect(() => {
    if (!open) {
      navigate("/client/dashboard");
    }
  }, [open, navigate]);

  const handleImageCapture = async (imageData: string, type: "facial" | "documentFront" | "documentBack") => {
    setImages(prev => ({ ...prev, [type]: imageData }));
    
    if (type === "facial") {
      setStep("document-front");
    } else if (type === "documentFront") {
      setStep("document-back");
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

      // Upload da imagem facial
      const facialPath = `biometrics/${session.user.id}/facial.jpg`;
      const { error: facialError } = await supabase.storage
        .from("biometrics")
        .upload(facialPath, images.facial!, { upsert: true });

      if (facialError) throw facialError;

      // Upload do documento frente
      const frontPath = `biometrics/${session.user.id}/document-front.jpg`;
      const { error: frontError } = await supabase.storage
        .from("biometrics")
        .upload(frontPath, images.documentFront!, { upsert: true });

      if (frontError) throw frontError;

      // Upload do documento verso
      const backPath = `biometrics/${session.user.id}/document-back.jpg`;
      const { error: backError } = await supabase.storage
        .from("biometrics")
        .upload(backPath, images.documentBack!, { upsert: true });

      if (backError) throw backError;

      // Atualizar status da validação no perfil
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          facial_validation_status: "pending",
          facial_validation_image: facialPath,
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

  const handleClose = () => {
    setOpen(false);
  };

  const renderStep = () => {
    switch (step) {
      case "instructions":
        return <InstructionsStep onContinue={() => setStep("facial")} />;
      case "facial":
        return <FacialCapture onCapture={(image) => handleImageCapture(image, "facial")} />;
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
      default:
        return null;
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
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
}