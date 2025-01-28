import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface CompleteStepProps {
  onClose: () => void;
}

export function CompleteStep({ onClose }: CompleteStepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center">
          <CheckCircle className="h-16 w-16 text-white" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Pronto!</h3>
        <p className="text-sm text-gray-500">
          Após esses passos, seu processo terá sido concluído.
        </p>
      </div>

      <Button onClick={onClose} className="w-full bg-purple-600 hover:bg-purple-700">
        Concluir
      </Button>
    </div>
  );
}