
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CameraAccessStepProps {
  onNext: () => void;
}

export const CameraAccessStep = ({ onNext }: CameraAccessStepProps) => {
  const { toast } = useToast();

  const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      onNext();
    } catch (error) {
      console.error("Erro ao acessar câmera:", error);
      toast({
        title: "Erro de Acesso",
        description: "Por favor, permita o acesso à câmera para continuar.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold">Acesso à Câmera</h2>
      <p className="text-gray-600">
        Para iniciar, libere o acesso à câmera do aparelho
      </p>
      <div className="flex justify-center">
        <Button onClick={handleCameraAccess} className="w-full max-w-xs">
          <Camera className="mr-2" />
          Liberar Câmera
        </Button>
      </div>
    </div>
  );
};
