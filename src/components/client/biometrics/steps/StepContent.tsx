import { CpfValidation } from "../CpfValidation";
import { FacialCapture } from "../FacialCapture";
import { DocumentCapture } from "../DocumentCapture";
import { CameraTips } from "../steps/CameraTips";
import { DocumentTips } from "../steps/DocumentTips";
import { DocumentTypeSelector } from "../steps/DocumentTypeSelector";
import { ProcessingStep } from "../steps/ProcessingStep";
import { CompleteStep } from "../steps/CompleteStep";

interface StepContentProps {
  step: string;
  documentType: "rg" | "cnh";
  onCpfValidation: (cpf: string) => void;
  onImageCapture: (imageData: string, type: "facial" | "documentFront" | "documentBack") => void;
  onDocumentTypeSelect: (type: "rg" | "cnh") => void;
  onClose: () => void;
}

export function StepContent({
  step,
  documentType,
  onCpfValidation,
  onImageCapture,
  onDocumentTypeSelect,
  onClose
}: StepContentProps) {
  const renderStep = () => {
    switch (step) {
      case "cpf":
        return <CpfValidation onValidCpf={onCpfValidation} />;
      case "camera-tips":
        return <CameraTips onNext={() => onImageCapture("", "facial")} />;
      case "facial":
        return <FacialCapture onCapture={(image) => onImageCapture(image, "facial")} />;
      case "document-tips":
        return <DocumentTips onNext={() => onDocumentTypeSelect("rg")} />;
      case "document-type":
        return (
          <DocumentTypeSelector
            documentType={documentType}
            onSelect={(type) => {
              onDocumentTypeSelect(type);
              onImageCapture("", "documentFront");
            }}
          />
        );
      case "document-front":
        return (
          <DocumentCapture
            onCapture={(image) => onImageCapture(image, "documentFront")}
            side="front"
          />
        );
      case "document-back":
        return (
          <DocumentCapture
            onCapture={(image) => onImageCapture(image, "documentBack")}
            side="back"
          />
        );
      case "processing":
        return <ProcessingStep />;
      case "complete":
        return <CompleteStep onClose={onClose} />;
      default:
        return null;
    }
  };

  return <div className="w-full">{renderStep()}</div>;
}