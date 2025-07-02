
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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const handleCameraAccess = async () => {
    try {
      setIsLoading(true);
      setShowError(false);
      setErrorMessage("");
      
      console.log("🎥 Iniciando verificação de câmera...");
      
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("UNSUPPORTED_BROWSER");
      }

      // Estratégia 1: Tentar câmera básica primeiro
      console.log("🎥 Tentativa 1: Câmera básica");
      let stream;
      
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        console.log("✅ Câmera básica funcionou");
      } catch (basicError: any) {
        console.log("⚠️ Câmera básica falhou:", basicError.name, basicError.message);
        
        // Estratégia 2: Tentar com constraints específicas
        console.log("🎥 Tentativa 2: Constraints específicas");
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { min: 320, ideal: 640, max: 1280 },
              height: { min: 240, ideal: 480, max: 720 },
              frameRate: { ideal: 15, max: 30 }
            },
            audio: false
          });
          console.log("✅ Câmera com constraints específicas funcionou");
        } catch (constraintError: any) {
          console.log("⚠️ Câmera com constraints falhou:", constraintError.name, constraintError.message);
          
          // Estratégia 3: Tentar com resolução mínima
          console.log("🎥 Tentativa 3: Resolução mínima");
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              video: {
                width: { ideal: 320 },
                height: { ideal: 240 }
              },
              audio: false
            });
            console.log("✅ Câmera com resolução mínima funcionou");
          } catch (minimalError: any) {
            console.log("❌ Todas as tentativas falharam");
            throw basicError; // Lança o erro original
          }
        }
      }
      
      // Verificar se realmente obteve acesso
      if (!stream) {
        throw new Error("NO_STREAM_OBTAINED");
      }

      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length === 0) {
        throw new Error("NO_VIDEO_TRACK");
      }

      const videoTrack = videoTracks[0];
      console.log("📹 Informações da câmera obtida:", {
        label: videoTrack.label,
        kind: videoTrack.kind,
        readyState: videoTrack.readyState,
        settings: videoTrack.getSettings(),
        capabilities: videoTrack.getCapabilities()
      });
      
      // Parar o stream após teste bem-sucedido
      stream.getTracks().forEach(track => {
        track.stop();
        console.log("🛑 Track parado:", track.kind);
      });
      
      toast({
        title: "Câmera liberada",
        description: "Acesso à câmera obtido com sucesso!",
      });
      
      console.log("✅ Teste de câmera concluído com sucesso");
      onNext();
      
    } catch (error: any) {
      console.error("❌ Erro ao acessar câmera:", error);
      setShowError(true);
      
      let userMessage = "Erro desconhecido ao acessar a câmera.";
      
      // Mensagens de erro mais específicas
      switch (error.message) {
        case "UNSUPPORTED_BROWSER":
          userMessage = "Seu navegador não suporta acesso à câmera. Use Chrome, Firefox ou Safari atualizado.";
          break;
        case "NO_STREAM_OBTAINED":
          userMessage = "Não foi possível obter acesso à câmera.";
          break;
        case "NO_VIDEO_TRACK":
          userMessage = "Câmera detectada mas sem vídeo disponível.";
          break;
        default:
          switch (error.name) {
            case "NotAllowedError":
              userMessage = "Acesso negado. Clique no ícone da câmera na barra de endereços e permita o acesso.";
              break;
            case "NotFoundError":
              userMessage = "Nenhuma câmera encontrada. Verifique se há uma câmera conectada ao dispositivo.";
              break;
            case "NotReadableError":
              userMessage = "Câmera está sendo usada por outro aplicativo ou há um problema de hardware.";
              break;
            case "OverconstrainedError":
              userMessage = "Não foi possível encontrar uma câmera compatível. Tente com outro dispositivo.";
              break;
            case "SecurityError":
              userMessage = "Acesso bloqueado por segurança. Certifique-se de estar usando HTTPS.";
              break;
            case "AbortError":
              userMessage = "Operação cancelada. Tente novamente.";
              break;
            default:
              if (error.message.includes("Permission")) {
                userMessage = "Permissão de câmera necessária. Permita o acesso quando solicitado.";
              } else if (error.message.includes("busy") || error.message.includes("use")) {
                userMessage = "Câmera em uso. Feche outros apps ou abas que possam estar usando a câmera.";
              } else {
                userMessage = `Erro: ${error.message}`;
              }
          }
      }
      
      setErrorMessage(userMessage);
      
      toast({
        title: "Erro de Acesso à Câmera",
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
            
            {isLoading && (
              <div className="mt-2 text-xs text-gray-500 text-center">
                Testando diferentes configurações...
              </div>
            )}
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
          {isLoading ? "TESTANDO CÂMERA..." : "LIBERAR CÂMERA"}
        </Button>
      </div>
    </div>
  );
};
