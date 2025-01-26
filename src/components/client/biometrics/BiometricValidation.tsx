import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X, User, FileText, CheckCircle, Loader2, LightbulbIcon, Camera } from "lucide-react";
import { FacialCapture } from "./FacialCapture";
import { DocumentCapture } from "./DocumentCapture";
import { CpfValidation } from "./CpfValidation";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";

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

export function BiometricValidation() {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState<Step>("cpf");
  const [cpf, setCpf] = useState("");
  const [documentType, setDocumentType] = useState<DocumentType>("rg");
  const [images, setImages] = useState<{
    facial?: string;
    documentFront?: string;
    documentBack?: string;
  }>({});
  const { toast } = useToast();
  const navigate = useNavigate();
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

      // Upload do documento verso (se houver)
      let backPath;
      if (images.documentBack) {
        backPath = `biometrics/${session.user.id}/document-back.jpg`;
        const { error: backError } = await supabase.storage
          .from("biometrics")
          .upload(backPath, images.documentBack, { upsert: true });

        if (backError) throw backError;
      }

      // Atualizar status da validação no perfil
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

  const handleClose = () => {
    setOpen(false);
    navigate("/client/dashboard");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {step === "cpf" && "Vamos confirmar sua identidade"}
            {step === "camera-tips" && "Prepare sua câmera"}
            {step === "facial" && "Captura Facial"}
            {step === "document-tips" && "Prepare seu documento"}
            {step === "document-type" && "Selecione o documento"}
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
          {step === "cpf" && (
            <CpfValidation onValidCpf={handleCpfValidation} />
          )}

          {step === "camera-tips" && (
            <>
              <div className="space-y-6 text-center">
                <div className="space-y-2">
                  <Camera className="mx-auto h-12 w-12 text-purple-600" />
                  <h3 className="text-lg font-semibold">Prepare sua câmera</h3>
                  <div className="space-y-4 text-sm text-gray-500">
                    <p>• Procure um lugar bem iluminado</p>
                    <p>• Mantenha seu rosto centralizado</p>
                    <p>• Retire óculos e acessórios</p>
                    <p>• Evite fundos muito claros ou escuros</p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setStep("facial")} 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Continuar
              </Button>
            </>
          )}

          {step === "facial" && (
            <FacialCapture onCapture={(image) => handleImageCapture(image, "facial")} />
          )}

          {step === "document-tips" && (
            <>
              <div className="space-y-6 text-center">
                <div className="space-y-2">
                  <FileText className="mx-auto h-12 w-12 text-purple-600" />
                  <h3 className="text-lg font-semibold">Prepare seu documento</h3>
                  <div className="space-y-4 text-sm text-gray-500">
                    <p>• Use RG ou CNH</p>
                    <p>• Documento deve estar em bom estado</p>
                    <p>• Evite reflexos e sombras</p>
                    <p>• Capture todas as informações</p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setStep("document-type")} 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Continuar
              </Button>
            </>
          )}

          {step === "document-type" && (
            <div className="space-y-4 w-full">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={documentType === "rg" ? "default" : "outline"}
                  onClick={() => {
                    setDocumentType("rg");
                    setStep("document-front");
                  }}
                  className={documentType === "rg" ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  RG
                </Button>
                <Button
                  variant={documentType === "cnh" ? "default" : "outline"}
                  onClick={() => {
                    setDocumentType("cnh");
                    setStep("document-front");
                  }}
                  className={documentType === "cnh" ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  CNH
                </Button>
              </div>
            </div>
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
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Aguarde!</h3>
                  <p className="text-sm text-gray-500">
                    Estamos analisando seus dados para confirmar sua identidade
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === "complete" && (
            <div className="text-center space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Deu certo!</h3>
                  <p className="text-gray-600">
                    Nós confirmamos sua identidade e você já pode continuar sua jornada
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleClose} 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Continuar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}