
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
  const { videoConstraints } = useCameraManagement();

  const storeCameraCapabilities = async (capabilities: MediaTrackCapabilities) => {
    try {
      const { error } = await supabase.from('camera_capabilities').insert({
        device_id: capabilities.deviceId,
        facing_mode: capabilities.facingMode,
        min_width: capabilities.width?.min,
        max_width: capabilities.width?.max,
        min_height: capabilities.height?.min,
        max_height: capabilities.height?.max,
        supported_constraints: capabilities,
        user_id: (await supabase.auth.getUser()).data.user?.id
      });

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
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera API não suportada neste navegador");
      }

      // Try to get all video devices first
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      
      if (videoDevices.length === 0) {
        throw new Error("Nenhuma câmera encontrada no dispositivo");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          ...videoConstraints,
          deviceId: videoDevices[0].deviceId
        },
        audio: false
      });
      
      // Test if we actually got a video track
      const videoTrack = stream.getVideoTracks()[0];
      if (!videoTrack) {
        throw new Error("Não foi possível acessar a câmera");
      }

      // Get and store camera capabilities
      const capabilities = videoTrack.getCapabilities();
      await storeCameraCapabilities(capabilities);
      
      // Stop the stream immediately after getting permission
      stream.getTracks().forEach(track => track.stop());
      
      toast({
        title: "Câmera liberada",
        description: "Acesso à câmera concedido com sucesso.",
      });
      
      onNext();
    } catch (error: any) {
      console.error("Erro ao acessar câmera:", error);
      setShowError(true);
      
      let errorMessage = "Por favor, permita o acesso à câmera para continuar.";
      
      if (error.name === "NotAllowedError") {
        errorMessage = "Acesso à câmera foi negado. Por favor, permita o acesso nas configurações do seu navegador.";
      } else if (error.name === "NotFoundError" || error.message.includes("Nenhuma câmera")) {
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
        className="w-full bg-purple-600 hover:bg-purple-700"
        size="lg"
        disabled={isLoading}
      >
        <Camera className="mr-2 h-5 w-5" />
        {isLoading ? "Verificando câmera..." : "Liberar Câmera"}
      </Button>
    </div>
  );
};
