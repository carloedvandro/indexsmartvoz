
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCameraManagement } from "@/hooks/useCameraManagement";

interface CameraAccessStepProps {
  onNext: () => void;
}

export const CameraAccessStep = ({ onNext }: CameraAccessStepProps) => {
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();
  const { hasBackCamera } = useCameraManagement(true);

  const handleCameraAccess = async () => {
    try {
      setIsLoading(true);
      setShowError(false);
      setErrorMessage("");
      
      console.log("🎥 Verificando suporte à câmera...");
      
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("UNSUPPORTED_BROWSER");
      }

      console.log("🎥 Solicitando acesso à câmera...");

      // Primeiro, tenta câmera traseira (environment)
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
        console.log("✅ Câmera traseira acessada com sucesso");
      } catch (envError) {
        console.log("⚠️ Câmera traseira não disponível, tentando frontal...");
        // Se falhar, tenta câmera frontal
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
        console.log("✅ Câmera frontal acessada com sucesso");
      }
      
      // Verificar se realmente obteve acesso
      const videoTrack = stream.getVideoTracks()[0];
      if (!videoTrack) {
        throw new Error("NO_VIDEO_TRACK");
      }

      console.log("📹 Informações da câmera:", {
        label: videoTrack.label,
        settings: videoTrack.getSettings(),
        capabilities: videoTrack.getCapabilities()
      });
      
      // Parar o stream após teste
      stream.getTracks().forEach(track => track.stop());
      
      toast({
        title: "Câmera liberada",
        description: videoTrack.label.includes("back") || videoTrack.label.includes("environment") 
          ? "Câmera traseira acessada com sucesso."
          : "Câmera frontal acessada com sucesso.",
      });
      
      console.log("✅ Teste de câmera concluído, prosseguindo...");
      onNext();
      
    } catch (error: any) {
      console.error("❌ Erro ao acessar câmera:", error);
      setShowError(true);
      
      let userMessage = "Por favor, permita o acesso à câmera para continuar.";
      
      if (error.message === "UNSUPPORTED_BROWSER") {
        userMessage = "Seu navegador não suporta acesso à câmera. Tente usar Chrome, Firefox ou Safari.";
      } else if (error.name === "NotAllowedError") {
        userMessage = "Acesso à câmera foi negado. Clique no ícone da câmera na barra de endereços e permita o acesso.";
      } else if (error.name === "NotFoundError") {
        userMessage = "Nenhuma câmera foi encontrada no dispositivo.";
      } else if (error.name === "NotReadableError") {
        userMessage = "A câmera pode estar sendo usada por outro aplicativo. Feche outros apps que usam câmera.";
      } else if (error.name === "OverconstrainedError") {
        userMessage = "Não foi possível encontrar uma câmera compatível com os requisitos.";
      } else if (error.name === "SecurityError") {
        userMessage = "Acesso à câmera bloqueado por questões de segurança. Verifique se está usando HTTPS.";
      } else if (error.message === "NO_VIDEO_TRACK") {
        userMessage = "Não foi possível inicializar a câmera corretamente.";
      }
      
      setErrorMessage(userMessage);
      
      toast({
        title: "Erro de Acesso",
        description: userMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 flex flex-col ">
      <div className="flex-1 flex items-start justify-center pt-10 p-6">
        <div className="w-full max-w-[280px] space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 text-center">Para iniciar libere o acesso à câmera do aparelho</h2>
          
          {showError && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Erro de Acesso</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-100 rounded-full p-6 mb-4">
              <Camera className="h-12 w-12 text-[#8425af]" />
            </div>
            <p className="text-sm text-gray-600 text-center">
              {isLoading 
                ? "Verificando acesso à câmera..." 
                : "Aperte o botão abaixo para iniciar"
              }
            </p>
          </div>
        </div>
      </div>

      {/* Botão fixado na parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <Button 
          onClick={handleCameraAccess} 
          disabled={isLoading}
          className="w-full h-12 bg-[#8425af] text-white hover:bg-[#7a1fa2] font-medium uppercase text-base tracking-wider rounded-none"
        >
          {isLoading ? "VERIFICANDO CÂMERA..." : "LIBERAR CÂMERA"}
        </Button>
      </div>
    </div>
  );
};
