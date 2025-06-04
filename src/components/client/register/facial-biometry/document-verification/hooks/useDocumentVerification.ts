
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type DocumentType = 'rg' | 'cnh';

type VerificationStatus = {
  status: 'success' | 'error' | 'idle';
  message: string;
};

export const useDocumentVerification = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<DocumentType | null>(null);
  const [documents, setDocuments] = useState<{
    identity?: File;
    proofOfAddress?: File;
  }>({});
  const [showCamera, setShowCamera] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    status: 'idle',
    message: ''
  });
  const { toast } = useToast();

  const verifyDocumentData = async (file: File) => {
    try {
      setVerificationStatus({ status: 'idle', message: '' });
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        throw new Error("Usuário não encontrado");
      }

      const base64Image = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String.split(',')[1]);
        };
        reader.readAsDataURL(file);
      });

      const { data, error } = await supabase.functions.invoke('verify-document', {
        body: {
          imageBase64: base64Image,
          documentType: selectedDocType,
          userId: userData.user.id
        }
      });

      if (error) {
        console.error('Error verifying document:', error);
        setVerificationStatus({
          status: 'error',
          message: 'Erro ao verificar documento: ' + error.message
        });
        throw new Error(error.message);
      }

      if (!data.verified) {
        setVerificationStatus({
          status: 'error',
          message: data.message
        });
        toast({
          title: "Verificação falhou",
          description: data.message,
          variant: "destructive",
        });
        return false;
      }

      setVerificationStatus({
        status: 'success',
        message: 'Documento verificado com sucesso! Os dados correspondem ao cadastro.'
      });

      toast({
        title: "Documento verificado",
        description: "Dados do documento verificados com sucesso.",
      });

      return true;
    } catch (error: any) {
      console.error("Erro na verificação do documento:", error);
      setVerificationStatus({
        status: 'error',
        message: error.message || "Ocorreu um erro ao verificar o documento."
      });
      toast({
        title: "Erro na verificação",
        description: error.message || "Ocorreu um erro ao verificar o documento.",
        variant: "destructive",
      });
      return false;
    }
  };

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

  const handleProofOfAddressChange = (file: File) => {
    setDocuments(prev => ({
      ...prev,
      proofOfAddress: file
    }));
  };

  const handleUpload = async (onComplete: () => void) => {
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

      const { error: profileError } = await supabase
        .from("profiles")
        .update({ 
          document_verification_status: 'completed'
        })
        .eq('id', user.id);

      if (profileError) {
        console.error("Profile update error:", profileError);
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

  return {
    isCapturing,
    selectedDocType,
    setSelectedDocType,
    documents,
    showCamera,
    verificationStatus,
    handleDocumentCapture,
    handleCameraCapture,
    handleProofOfAddressChange,
    handleUpload
  };
};
