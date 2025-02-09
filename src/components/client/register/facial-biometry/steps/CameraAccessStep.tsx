
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CameraAccessStepProps {
  onNext: () => void;
}

export const CameraAccessStep = ({ onNext }: CameraAccessStepProps) => {
  const [showError, setShowError] = useState(false);
  const { toast } = useToast();

  const handleCameraAccess = async () => {
    try {
      setShowError(false);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      // Stop the stream immediately after getting permission
      stream.getTracks().forEach(track => track.stop());
      
      toast({
        title: "Câmera liberada",
        description: "Acesso à câmera concedido com sucesso.",
      });
      
      onNext();
    } catch (error) {
      console.error("Erro ao acessar câmera:", error);
      setShowError(true);
      toast({
        title: "Erro de Acesso",
        description: "Por favor, permita o acesso à câmera para continuar.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Acesso à Câmera</h2>
        <p className="text-gray-600">
          Para iniciar, libere o acesso à câmera do aparelho
        </p>
      </div>

      {showError && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Erro de Acesso</AlertTitle>
          <AlertDescription>
            Por favor, permita o acesso à câmera para continuar.
          </AlertDescription>
        </Alert>
      )}

      <Button 
        onClick={handleCameraAccess} 
        className="w-full bg-primary hover:bg-primary/90"
        size="lg"
      >
        <Camera className="mr-2 h-5 w-5" />
        Liberar Câmera
      </Button>
    </div>
  );
};
