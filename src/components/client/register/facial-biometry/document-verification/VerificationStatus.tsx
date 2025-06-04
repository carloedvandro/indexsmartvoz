
import { Alert } from "@/components/ui/alert";
import { FileCheck, AlertCircle } from "lucide-react";

interface VerificationStatusProps {
  status: 'success' | 'error' | 'idle';
  message: string;
}

export const VerificationStatus = ({ status, message }: VerificationStatusProps) => {
  if (status === 'idle') return null;

  return (
    <Alert variant={status === 'success' ? "default" : "destructive"} className="mb-4">
      <div className="flex items-center gap-2">
        {status === 'success' ? (
          <FileCheck className="h-4 w-4" />
        ) : (
          <AlertCircle className="h-4 w-4" />
        )}
        {message}
      </div>
    </Alert>
  );
};
