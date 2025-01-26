import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface CameraTipsProps {
  onNext: () => void;
}

export function CameraTips({ onNext }: CameraTipsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Dicas para a Foto</h3>
        <p className="text-sm text-gray-500">
          Para garantir uma boa captura da sua foto, siga estas orientações:
        </p>
      </div>

      <ul className="space-y-2 text-sm text-gray-600">
        <li>• Procure um ambiente bem iluminado</li>
        <li>• Mantenha uma expressão neutra</li>
        <li>• Retire óculos e acessórios do rosto</li>
        <li>• Posicione seu rosto no centro da câmera</li>
        <li>• Mantenha uma distância adequada da câmera</li>
      </ul>

      <Button onClick={onNext} className="w-full bg-purple-600 hover:bg-purple-700 gap-2">
        <Camera className="h-4 w-4" />
        Iniciar Captura
      </Button>
    </div>
  );
}