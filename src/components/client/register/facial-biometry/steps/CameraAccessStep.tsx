
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCameraManagement } from "@/hooks/useCameraManagement";
import { supabase } from "@/integrations/supabase/client";

interface CameraAccessStepProps {
  onNext: () => void;
}

export const CameraAccessStep = ({ onNext }: CameraAccessStepProps) => {
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { videoConstraints, hasBackCamera } = useCameraManagement(true);

  const storeCameraCapabilities = async (capabilities: MediaTrackCapabilities) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const jsonCapabilities = JSON.parse(JSON.stringify(capabilities));
      
      const { error } = await supabase.from('camera_capabilities').insert([{
        device_id: capabilities.deviceId?.toString() || null,
        facing_mode: capabilities.facingMode?.toString() || null,
        min_width: capabilities.width?.min || null,
        max_width: capabilities.width?.max || null,
        min_height: capabilities.height?.min || null,
        max_height: capabilities.height?.max || null,
        supported_constraints: jsonCapabilities,
        user_id: user.id
      }]);

      if (error) {
        console.error('Error storing camera capabilities:', error);
      }
    } catch (error) {
      console.error('Error storing camera capabilities:', error);
    }
  };

  const handleCameraAccess = async () => {
    try {
      setIsLoading(true);
      setShowError(false);
      
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Câmera não suportada neste navegador");
      }

      // Try to get camera access with environment mode first
      const constraints = {
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Get video track capabilities
      const videoTrack = stream.getVideoTracks()[0];
      if (!videoTrack) {
        throw new Error("Não foi possível acessar a câmera");
      }

      // Store camera capabilities
      const capabilities = videoTrack.getCapabilities();
      await storeCameraCapabilities(capabilities);
      
      // Stop the stream after testing
      stream.getTracks().forEach(track => track.stop());
      
      toast({
        title: "Câmera liberada",
        description: hasBackCamera 
          ? "Câmera traseira acessada com sucesso."
          : "Câmera frontal acessada com sucesso.",
      });
      
      onNext();
    } catch (error: any) {
      console.error("Erro ao acessar câmera:", error);
      setShowError(true);
      
      let errorMessage = "Por favor, permita o acesso à câmera para continuar.";
      
      if (error.name === "NotAllowedError") {
        errorMessage = "Acesso à câmera foi negado. Por favor, permita o acesso nas configurações do seu navegador/dispositivo.";
      } else if (error.name === "NotFoundError") {
        errorMessage = "Nenhuma câmera encontrada no dispositivo.";
      } else if (error.name === "NotReadableError") {
        errorMessage = "A câmera pode estar sendo usada por outro aplicativo.";
      } else if (error.name === "OverconstrainedError") {
        errorMessage = "Não foi possível encontrar uma câmera que atenda aos requisitos.";
      }
      
      toast({
        title: "Erro de Acesso",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 p-8 flex flex-col justify-center">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Para iniciar libere o acesso à câmera do aparelho</h2>
        
        {showError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Erro de Acesso</AlertTitle>
            <AlertDescription>
              Por favor, permita o acesso à câmera para continuar.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col items-center justify-center ">
          <div className="bg-gray-100 rounded-full p-6 mb-4">
            <Camera className="h-12 w-12 text-[#8425af]" />
          </div>
          <p className="text-sm text-gray-600">Aperte o botão abaixo para iniciar</p>
        </div>

        <Button 
          onClick={handleCameraAccess} 
          className="w-full max-w-xs bg-[#8425af] text-white hover:bg-[#7a1fa2]"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? "Verificando câmera..." : "LIBERAR CÂMERA"}
        </Button>
      </div>
    </div>
  );
};
