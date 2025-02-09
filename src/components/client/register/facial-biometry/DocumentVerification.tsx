
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, FileCheck } from "lucide-react";

interface DocumentVerificationProps {
  onComplete: () => void;
  onBack: () => void;
}

export const DocumentVerification = ({ onComplete, onBack }: DocumentVerificationProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const [documents, setDocuments] = useState<{
    identity?: File;
    proofOfAddress?: File;
  }>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'identity' | 'proofOfAddress') => {
    const file = event.target.files?.[0];
    if (file) {
      setDocuments(prev => ({
        ...prev,
        [type]: file
      }));
    }
  };

  const handleUpload = async () => {
    if (!documents.identity || !documents.proofOfAddress) {
      toast({
        title: "Documentos necessários",
        description: "Por favor, envie todos os documentos solicitados.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      // Here you would implement the actual document upload logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete();
    } catch (error) {
      console.error("Erro no upload:", error);
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao enviar os documentos. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Verificação de Documentos</h2>
        <p className="text-gray-600 mb-6">
          Por favor, envie os documentos solicitados para verificação.
        </p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Documento de Identidade</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'identity')}
              className="hidden"
              id="identity-upload"
            />
            <label
              htmlFor="identity-upload"
              className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
            >
              {documents.identity ? (
                <div className="flex items-center text-green-600">
                  <FileCheck className="w-6 h-6 mr-2" />
                  <span>{documents.identity.name}</span>
                </div>
              ) : (
                <div className="flex items-center text-gray-500">
                  <Upload className="w-6 h-6 mr-2" />
                  <span>Clique para enviar</span>
                </div>
              )}
            </label>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Comprovante de Residência</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'proofOfAddress')}
              className="hidden"
              id="address-upload"
            />
            <label
              htmlFor="address-upload"
              className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
            >
              {documents.proofOfAddress ? (
                <div className="flex items-center text-green-600">
                  <FileCheck className="w-6 h-6 mr-2" />
                  <span>{documents.proofOfAddress.name}</span>
                </div>
              ) : (
                <div className="flex items-center text-gray-500">
                  <Upload className="w-6 h-6 mr-2" />
                  <span>Clique para enviar</span>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={handleUpload}
            disabled={isUploading || !documents.identity || !documents.proofOfAddress}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Documentos"
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isUploading}
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};
