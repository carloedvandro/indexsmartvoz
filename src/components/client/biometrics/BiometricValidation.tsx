import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X, User, FileText, CheckCircle, Loader2 } from "lucide-react";
import { FacialCapture } from "./FacialCapture";
import { DocumentCapture } from "./DocumentCapture";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";

type Step = "instructions" | "facial" | "document-front" | "document-back" | "processing" | "complete";

export function BiometricValidation() {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState<Step>("instructions");
  const [images, setImages] = useState<{
    facial?: string;
    documentFront?: string;
    documentBack?: string;
  }>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  const { getSession } = useSession();

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
    navigate("/client/dashboard");
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
          {step === "instructions" && (
            <>
              <div className="space-y-4 text-center">
                <h3 className="text-lg font-semibold">Siga as instruções abaixo:</h3>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Deixe seu rosto visível
                  </p>
                  <p className="text-sm text-gray-500">
                    Sem acessórios que encubram o rosto, como óculos, chapéus ou máscaras
                  </p>
                  <p className="flex items-center gap-2 mt-4">
                    <FileText className="h-5 w-5" />
                    Prepare seu documento
                  </p>
                  <p className="text-sm text-gray-500">
                    Tenha em mãos seu documento de identificação (RG ou CNH)
                  </p>
                </div>
              </div>
              <Button onClick={() => setStep("facial")} className="w-full">
                Continuar
              </Button>
            </>
          )}

          {step === "facial" && (
            <FacialCapture onCapture={(image) => handleImageCapture(image, "facial")} />
          )}

          {step === "document-front" && (
            <DocumentCapture
              onCapture={(image) => handleImageCapture(image, "documentFront")}
              side="front"
            />
          )}

          {step === "document-back" && (
            <DocumentCapture
              onCapture={(image) => handleImageCapture(image, "documentBack")}
              side="back"
            />
          )}

          {step === "processing" && (
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              <p>Processando suas imagens...</p>
            </div>
          )}

          {step === "complete" && (
            <div className="text-center space-y-4">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">Validação Enviada!</h3>
                <p className="text-sm text-gray-500">
                  Suas imagens foram enviadas para análise. Em breve você receberá uma resposta.
                </p>
              </div>
              <Button onClick={handleClose} className="w-full">
                Continuar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}