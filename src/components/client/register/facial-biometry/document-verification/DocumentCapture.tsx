
import { Button } from "@/components/ui/button";
import { Camera, FileCheck } from "lucide-react";

interface DocumentCaptureProps {
  showCamera: boolean;
  hasDocument: boolean;
  onCapture: () => void;
}

export const DocumentCapture = ({ showCamera, hasDocument, onCapture }: DocumentCaptureProps) => {
  if (showCamera) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
        <Camera className="w-12 h-12 text-gray-400" />
        {/* Camera component would be implemented here */}
      </div>
    );
  }

  return (
    <Button
      onClick={onCapture}
      className="w-full mb-4"
      variant={hasDocument ? "outline" : "default"}
    >
      {hasDocument ? (
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
  );
};
