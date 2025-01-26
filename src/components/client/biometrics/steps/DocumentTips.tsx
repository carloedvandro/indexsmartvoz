import { Button } from "@/components/ui/button";
import { FileText, Lock } from "lucide-react";

interface DocumentTipsProps {
  onNext: () => void;
}

export function DocumentTips({ onNext }: DocumentTipsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Captura do Documento</h3>
        <p className="text-sm text-gray-500">
          Prepare seu documento de identificação para a captura
        </p>
      </div>

      <div className="flex justify-center">
        <img 
          src="/lovable-uploads/945cb68b-0a00-4ebb-9a1a-3f6062f0673f.png" 
          alt="Document capture example"
          className="w-48 h-48 object-contain"
        />
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Lock className="h-4 w-4" />
        <span>Essa informação não será compartilhada</span>
      </div>

      <div className="space-y-2">
        <Button onClick={onNext} className="w-full bg-purple-600 hover:bg-purple-700">
          Avançar
        </Button>
        <Button variant="outline" className="w-full">
          Voltar
        </Button>
      </div>
    </div>
  );
}