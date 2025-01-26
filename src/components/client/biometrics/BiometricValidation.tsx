import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X, User, FileText, CheckCircle, Loader2, LightbulbIcon } from "lucide-react";
import { FacialCapture } from "./FacialCapture";
import { DocumentCapture } from "./DocumentCapture";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";

type Step = 
  | "instructions" 
  | "facial-instructions"
  | "facial" 
  | "document-instructions"
  | "document-front" 
  | "document-back" 
  | "processing" 
  | "complete";

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

      if (facialError) {
        console.error("Erro no upload facial:", facialError);
        throw facialError;
      }

      // Upload do documento frente
      const frontPath = `biometrics/${session.user.id}/document-front.jpg`;
      const { error: frontError } = await supabase.storage
        .from("biometrics")
        .upload(frontPath, images.documentFront!, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (frontError) {
        console.error("Erro no upload do documento frente:", frontError);
        throw frontError;
      }

      // Upload do documento verso
      const backPath = `biometrics/${session.user.id}/document-back.jpg`;
      const { error: backError } = await supabase.storage
        .from("biometrics")
        .upload(backPath, images.documentBack!, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (backError) {
        console.error("Erro no upload do documento verso:", backError);
        throw backError;
      }

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

      if (updateError) {
        console.error("Erro na atualização do perfil:", updateError);
        throw updateError;
      }

      setStep("complete");
      toast({
        title: "Validação concluída!",
        description: "Suas informações foram validadas com sucesso. Você será redirecionado para fazer login.",
      });

      // Aguarda 3 segundos antes de redirecionar e fechar o modal
      setTimeout(() => {
        setOpen(false);
        navigate("/client/login", { replace: true });
      }, 3000);

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
    navigate("/client/login");
  };

  const renderStepContent = () => {
    switch (step) {
      case "instructions":
        return (
          <div className="space-y-6 text-center">
            <h3 className="text-lg font-semibold">Siga as instruções abaixo:</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="flex items-center gap-2 font-medium">
                  <User className="h-5 w-5" />
                  Deixe seu rosto visível
                </p>
                <p className="text-sm text-gray-500">
                  Sem acessórios que encubram o rosto, como óculos, chapéus ou máscaras
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="flex items-center gap-2 font-medium">
                  <LightbulbIcon className="h-5 w-5" />
                  Fique num lugar com boa iluminação
                </p>
                <p className="text-sm text-gray-500">
                  Sem pessoas ou objetos ao fundo
                </p>
              </div>

              <div className="space-y-2">
                <p className="flex items-center gap-2 font-medium">
                  <FileText className="h-5 w-5" />
                  Prepare seu documento
                </p>
                <p className="text-sm text-gray-500">
                  Tenha em mãos seu documento de identificação (RG ou CNH)
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setStep("facial")} 
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Continuar
            </Button>
          </div>
        );

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
        return (
          <div className="space-y-6 text-center">
            <h3 className="text-lg font-semibold">Agora, vamos fotografar seu documento</h3>
            <p className="text-gray-600">
              Prepare seu RG ou CNH para fotografar a frente e o verso
            </p>
            <Button 
              onClick={() => setStep("document-front")} 
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Continuar
            </Button>
          </div>
        );

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
        return (
          <div className="text-center space-y-4">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Aguarde!</h3>
                <p className="text-sm text-gray-500">
                  Estamos analisando seus dados pra confirmar sua identidade
                </p>
                <p className="text-xs text-gray-400">
                  Se fechar o app, você volta pro início da confirmação de identidade
                </p>
              </div>
            </div>
          </div>
        );

      case "complete":
        return (
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
        );
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
