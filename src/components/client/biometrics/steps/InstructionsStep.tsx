import { Button } from "@/components/ui/button";
import { User, LightbulbIcon, FileText } from "lucide-react";

interface InstructionsStepProps {
  onContinue: () => void;
}

export function InstructionsStep({ onContinue }: InstructionsStepProps) {
  return (
    <div className="space-y-6 text-center">
      <h3 className="text-lg font-semibold">Siga as instruções abaixo:</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="flex items-center gap-2 font-medium">
            <User className="h-5 w-5" />
            Deixe seu rosto visível
          </p>
          <p className="text-sm text-gray-500">
            Sem acessórios que encubram o rosto, como óculos, chapéus ou máscaras
          </p>
        </div>
        
        <div className="space-y-2">
          <p className="flex items-center gap-2 font-medium">
            <LightbulbIcon className="h-5 w-5" />
            Fique num lugar com boa iluminação
          </p>
          <p className="text-sm text-gray-500">
            Sem pessoas ou objetos ao fundo
          </p>
        </div>

        <div className="space-y-2">
          <p className="flex items-center gap-2 font-medium">
            <FileText className="h-5 w-5" />
            Prepare seu documento
          </p>
          <p className="text-sm text-gray-500">
            Tenha em mãos seu documento de identificação (RG ou CNH)
          </p>
        </div>
      </div>
      <Button 
        onClick={onContinue} 
        className="w-full bg-purple-600 hover:bg-purple-700"
      >
        Continuar
      </Button>
    </div>
  );
}