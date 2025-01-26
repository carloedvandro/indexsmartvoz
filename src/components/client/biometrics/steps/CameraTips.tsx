import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

interface CameraTipsProps {
  onNext: () => void;
}

export function CameraTips({ onNext }: CameraTipsProps) {
  const { data: profile } = useProfile();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">
          Olá, {profile?.full_name?.split(' ')[0]}!
        </h3>
        <p className="text-sm text-gray-500">
          Vamos fazer uma foto sua para validar sua identidade
        </p>
      </div>

      <div className="flex justify-center">
        <img 
          src="/lovable-uploads/945cb68b-0a00-4ebb-9a1a-3f6062f0673f.png" 
          alt="Camera example"
          className="w-48 h-48 object-contain"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Camera className="h-4 w-4" />
          <span>Posicione seu rosto no centro da câmera</span>
        </div>
      </div>

      <Button onClick={onNext} className="w-full bg-purple-600 hover:bg-purple-700">
        Começar
      </Button>
    </div>
  );
}