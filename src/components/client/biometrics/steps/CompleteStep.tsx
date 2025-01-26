import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface CompleteStepProps {
  onClose: () => void;
}

export function CompleteStep({ onClose }: CompleteStepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Validação Enviada</h3>
        <p className="text-sm text-gray-500">
          Suas imagens foram enviadas com sucesso e serão analisadas em breve.
          Você receberá uma notificação quando o processo for concluído.
        </p>
      </div>

      <Button onClick={onClose} className="w-full bg-purple-600 hover:bg-purple-700">
        Concluir
      </Button>
    </div>
  );
}