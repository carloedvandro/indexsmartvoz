import { useState, useEffect } from "react";
import { ScannerContainer } from "./scanner/ScannerContainer";
import { toast } from "@/components/ui/use-toast";

interface BarcodeScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);

  useEffect(() => {
    // Solicita permissão da câmera ao montar o componente
    const requestCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
        // Limpa o stream após obter permissão
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error("Erro ao solicitar permissão da câmera:", err);
        setHasPermission(false);
        toast({
          variant: "destructive",
          title: "Erro de câmera",
          description: "Por favor, permita o acesso à câmera para escanear o código."
        });
      }
    };

    requestCameraPermission();
  }, []);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    toast({
      variant: "destructive",
      title: "Erro na leitura",
      description: errorMessage
    });
    setTimeout(() => setError(null), 3000);
  };

  const handleValidCode = (code: string) => {
    setLastScannedCode(code);
    toast({
      title: "Código lido com sucesso",
      description: "O código foi capturado corretamente."
    });
  };

  if (hasPermission === null) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg">
          <p className="text-center">Solicitando acesso à câmera...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {hasPermission === false ? (
        <div className="bg-white p-6 rounded-lg text-center space-y-4">
          <p className="text-red-500">
            {error || "Por favor, permita o acesso à câmera para escanear o código."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#8425af] text-white rounded-lg hover:bg-[#6c1e8f]"
          >
            Tentar Novamente
          </button>
        </div>
      ) : (
        <ScannerContainer
          onResult={onResult}
          onClose={onClose}
          error={error}
          lastScannedCode={lastScannedCode}
          onValidCode={handleValidCode}
          onError={handleError}
        />
      )}
    </div>
  );
}