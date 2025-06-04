
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { DocumentTypeSelector } from "./document-verification/DocumentTypeSelector";
import { VerificationStatus } from "./document-verification/VerificationStatus";
import { DocumentCapture } from "./document-verification/DocumentCapture";
import { ProofOfAddressUpload } from "./document-verification/ProofOfAddressUpload";
import { useDocumentVerification } from "./document-verification/hooks/useDocumentVerification";

interface DocumentVerificationProps {
  onComplete: () => void;
  onBack: () => void;
}

export const DocumentVerification = ({ onComplete, onBack }: DocumentVerificationProps) => {
  const {
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
  } = useDocumentVerification();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Verificação de Documentos</h2>
        <p className="text-gray-600 mb-6">
          Por favor, envie os documentos solicitados para verificação.
        </p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <DocumentTypeSelector
          selectedDocType={selectedDocType}
          onDocTypeChange={setSelectedDocType}
        />

        <VerificationStatus
          status={verificationStatus.status}
          message={verificationStatus.message}
        />

        <DocumentCapture
          showCamera={showCamera}
          hasDocument={!!documents.identity}
          onCapture={handleDocumentCapture}
        />

        <ProofOfAddressUpload
          file={documents.proofOfAddress}
          onFileChange={handleProofOfAddressChange}
        />

        <div className="flex flex-col gap-2">
          <Button
            onClick={() => handleUpload(onComplete)}
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
