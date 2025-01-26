import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface DocumentTipsProps {
  onNext: () => void;
}

export function DocumentTips({ onNext }: DocumentTipsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Dicas para o Documento</h3>
        <p className="text-sm text-gray-500">
          Para garantir uma boa captura do seu documento, siga estas orientações:
        </p>
      </div>

      <ul className="space-y-2 text-sm text-gray-600">
        <li>• Utilize um documento oficial com foto</li>
        <li>• Certifique-se que o documento está limpo</li>
        <li>• Evite reflexos e sombras no documento</li>
        <li>• Posicione o documento dentro da área indicada</li>
        <li>• Mantenha o documento totalmente visível</li>
      </ul>

      <Button onClick={onNext} className="w-full bg-purple-600 hover:bg-purple-700 gap-2">
        <FileText className="h-4 w-4" />
        Continuar
      </Button>
    </div>
  );
}