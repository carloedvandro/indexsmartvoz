
import { Button } from "@/components/ui/button";
import { FileCheck, ArrowRight } from "lucide-react";

interface CompletionStepProps {
  onComplete: () => void;
}

export const CompletionStep = ({ onComplete }: CompletionStepProps) => {
  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold">Biometria Concluída!</h2>
      <p className="text-gray-600">
        Você finalizou o processo de coleta de documentos.
      </p>
      <div className="flex justify-center">
        <FileCheck className="w-16 h-16 text-green-500" />
      </div>
      <Button onClick={onComplete} className="w-full max-w-xs">
        Finalizar
        <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
};
