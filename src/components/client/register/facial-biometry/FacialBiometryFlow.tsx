
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Camera } from "lucide-react";

interface FacialBiometryFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

export const FacialBiometryFlow = ({ onComplete, onBack }: FacialBiometryFlowProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const { toast } = useToast();

  const handleCapture = async () => {
    try {
      setIsCapturing(true);
      // TODO: Implement actual facial biometry capture
      // This is just a simulation for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Biometria facial coletada",
        description: "Aguarde enquanto verificamos sua identidade...",
      });

      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onComplete();
    } catch (error) {
      console.error("Erro na captura biométrica:", error);
      toast({
        title: "Erro na verificação",
        description: "Ocorreu um erro durante a verificação biométrica. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Verificação Biométrica</h2>
        <p className="text-gray-600">
          Para finalizar seu cadastro, precisamos fazer uma verificação facial.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
          <Camera className="w-24 h-24 text-gray-400" />
        </div>

        <div className="flex flex-col gap-2 w-full max-w-xs">
          <Button
            onClick={handleCapture}
            disabled={isCapturing}
            className="w-full"
          >
            {isCapturing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Capturando...
              </>
            ) : (
              "Iniciar Verificação"
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isCapturing}
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};
