import { FacialCapture } from "./FacialCapture";
import { DocumentCapture } from "./DocumentCapture";
import { InstructionsStep } from "./steps/InstructionsStep";
import { DocumentInstructionsStep } from "./steps/DocumentInstructionsStep";
import { ProcessingStep } from "./steps/ProcessingStep";
import { CompleteStep } from "./steps/CompleteStep";

interface BiometricValidationContentProps {
  step: string;
  onStepChange: (step: string) => void;
  onImageCapture: (image: string, type: "facial" | "documentFront" | "documentBack") => void;
  onClose: () => void;
}

export function BiometricValidationContent({
  step,
  onStepChange,
  onImageCapture,
  onClose
}: BiometricValidationContentProps) {
  switch (step) {
    case "instructions":
      return <InstructionsStep onContinue={() => onStepChange("facial")} />;

    case "facial":
      return (
        <div className="space-y-4">
          <p className="text-center text-gray-600">
            Vamos tirar uma foto do seu rosto pra sua segurança no app
          </p>
          <FacialCapture onCapture={(image) => onImageCapture(image, "facial")} />
        </div>
      );

    case "document-instructions":
      return <DocumentInstructionsStep onContinue={() => onStepChange("document-front")} />;

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
}