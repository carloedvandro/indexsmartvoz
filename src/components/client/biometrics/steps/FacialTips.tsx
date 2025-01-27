import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

interface FacialTipsProps {
  onNext: () => void;
}

export function FacialTips({ onNext }: FacialTipsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Hora de tirar sua foto de identificação</h3>
        <p className="text-sm text-gray-500">
          Antes de começar, algumas dicas:
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-32 h-32 bg-purple-100 rounded-lg flex items-center justify-center">
          <Smartphone className="w-16 h-16 text-purple-600" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>• Ambiente bem iluminado</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>• Fundo claro e sem reflexos</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>• Mantenha uma expressão neutra</span>
        </div>
      </div>

      <Button onClick={onNext} className="w-full bg-purple-600 hover:bg-purple-700">
        Avançar
      </Button>
    </div>
  );
}