
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Camera, Upload, FileCheck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

interface DocumentVerificationProps {
  onComplete: () => void;
  onBack: () => void;
}

type DocumentType = 'rg' | 'cnh';

export const DocumentVerification = ({ onComplete, onBack }: DocumentVerificationProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<DocumentType | null>(null);
  const [documents, setDocuments] = useState<{
    identity?: File;
    proofOfAddress?: File;
  }>({});
  const { toast } = useToast();
  const [showCamera, setShowCamera] = useState(false);

  const handleDocumentCapture = () => {
    if (!selectedDocType) {
      toast({
        title: "Selecione o tipo de documento",
        description: "Por favor, selecione RG ou CNH antes de continuar.",
        variant: "destructive",
      });
      return;
    }
    setShowCamera(true);
  };

  const verifyDocumentData = async (file: File) => {
    try {
      // Simulating document data extraction
      // In a real implementation, this would use OCR or a document verification API
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        throw new Error("Usuário não encontrado");
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, cpf")
        .eq("id", userData.user.id)
        .single();

      if (!profile) {
        throw new Error("Perfil não encontrado");
      }

      // Store verification attempt
      const { error: verificationError } = await supabase
        .from("document_verifications")
        .insert({
          user_id: userData.user.id,
          document_type: selectedDocType,
          full_name: profile.full_name,
          cpf: profile.cpf,
          verification_status: 'pending',
          document_image_url: null // In a real implementation, we would upload the image and store the URL
        });

      if (verificationError) {
        throw verificationError;
      }

      // For demo purposes, we'll simulate a successful verification
      // In a real implementation, this would be handled by a proper document verification service
      const simulatedMatch = true;

      if (!simulatedMatch) {
        toast({
          title: "Verificação falhou",
          description: "Os dados do documento não correspondem aos dados cadastrados.",
          variant: "destructive",
        });
        return false;
      }

      return true;
    } catch (error: any) {
      console.error("Erro na verificação do documento:", error);
      toast({
        title: "Erro na verificação",
        description: error.message || "Ocorreu um erro ao verificar o documento.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleCameraCapture = async (file: File) => {
    const isValid = await verifyDocumentData(file);
    if (isValid) {
      setDocuments(prev => ({
        ...prev,
        identity: file
      }));
      setShowCamera(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'proofOfAddress') => {
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
      setIsCapturing(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      // Update verification status
      const { error: updateError } = await supabase
        .from("document_verifications")
        .update({ verification_status: 'completed' })
        .eq('user_id', user.id)
        .eq('verification_status', 'pending');

      if (updateError) {
        throw updateError;
      }

      // Update profile status
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ 
          document_verification_status: 'completed',
          document_validation_date: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) {
        throw profileError;
      }

      onComplete();
    } catch (error: any) {
      console.error("Erro no upload:", error);
      toast({
        title: "Erro no upload",
        description: error.message || "Ocorreu um erro ao enviar os documentos. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsCapturing(false);
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
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-4">Documento de Identidade</h3>
          
          <RadioGroup
            value={selectedDocType || ''}
            onValueChange={(value: DocumentType) => setSelectedDocType(value)}
            className="mb-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rg" id="rg" />
              <Label htmlFor="rg">RG</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cnh" id="cnh" />
              <Label htmlFor="cnh">CNH</Label>
            </div>
          </RadioGroup>

          {showCamera ? (
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-12 h-12 text-gray-400" />
              {/* Camera component would be implemented here */}
            </div>
          ) : (
            <Button
              onClick={handleDocumentCapture}
              className="w-full mb-4"
              variant={documents.identity ? "outline" : "default"}
            >
              {documents.identity ? (
                <div className="flex items-center text-green-600">
                  <FileCheck className="w-6 h-6 mr-2" />
                  <span>Documento capturado</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Camera className="w-6 h-6 mr-2" />
                  <span>Capturar documento</span>
                </div>
              )}
            </Button>
          )}
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

        <div className="flex flex-col gap-2">
          <Button
            onClick={handleUpload}
            disabled={isCapturing || !documents.identity || !documents.proofOfAddress}
            className="w-full"
          >
            {isCapturing ? (
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
            disabled={isCapturing}
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};
