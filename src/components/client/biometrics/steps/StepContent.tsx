import { CpfValidation } from "../CpfValidation";
import { FacialCapture } from "../FacialCapture";
import { DocumentCapture } from "../DocumentCapture";
import { CameraTips } from "./CameraTips";
import { DocumentTips } from "./DocumentTips";
import { DocumentTypeSelector } from "./DocumentTypeSelector";
import { ProcessingStep } from "./ProcessingStep";
import { CompleteStep } from "./CompleteStep";
import { FacialTips } from "./FacialTips";

interface StepContentProps {
  step: string;
  documentType: "rg" | "cnh" | "outro";
  onCpfValidation: (cpf: string) => void;
  onImageCapture: (imageData: string, type: "facial" | "documentFront" | "documentBack") => void;
  onDocumentTypeSelect: (type: "rg" | "cnh" | "outro") => void;
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
      case "facial-tips":
        return <FacialTips onNext={() => onImageCapture("", "facial")} />;
      case "facial":
        return <FacialCapture onCapture={(image) => onImageCapture(image, "facial")} />;
      case "facial-processing":
        return <ProcessingStep />;
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
      case "document-processing":
        return <ProcessingStep />;
      case "complete":
        return <CompleteStep onClose={onClose} />;
      default:
        return null;
    }
  };

  return <div className="w-full">{renderStep()}</div>;
}