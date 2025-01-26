import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { BiometricValidationContent } from "./BiometricValidationContent";
import { useImageCapture } from "./hooks/useImageCapture";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface BiometricValidationProps {
  onComplete?: () => void;
}

export function BiometricValidation({ onComplete }: BiometricValidationProps) {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState("instructions");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { handleImageCapture } = useImageCapture(setStep);

  const handleClose = () => {
    setOpen(false);
    if (onComplete) {
      onComplete();
    }
    
    // Mostrar toast de redirecionamento
    toast({
      title: "Validação concluída!",
      description: "Você será redirecionado para a página de login em 5 segundos.",
    });

    // Forçar redirecionamento para a página de login após 5 segundos
    setTimeout(() => {
      navigate('/client/login', { replace: true });
    }, 5000);
  };

  const getStepTitle = () => {
    switch (step) {
      case "instructions":
        return "Vamos confirmar a sua identidade";
      case "facial":
        return "Captura Facial";
      case "document-instructions":
        return "Documento - Instruções";
      case "document-front":
        return "Documento - Frente";
      case "document-back":
        return "Documento - Verso";
      case "processing":
        return "Processando sua validação";
      case "complete":
        return "Deu certo!";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{getStepTitle()}</DialogTitle>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          <BiometricValidationContent
            step={step}
            onStepChange={setStep}
            onImageCapture={handleImageCapture}
            onClose={handleClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}