import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface CompleteStepProps {
  onClose: () => void;
}

export function CompleteStep({ onClose }: CompleteStepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Deu certo!</h3>
          <p className="text-gray-600">
            Nós confirmamos sua identidade e você já pode continuar sua jornada
          </p>
        </div>
      </div>
      <Button 
        onClick={onClose} 
        className="w-full bg-purple-600 hover:bg-purple-700"
      >
        Continuar
      </Button>
    </div>
  );
}