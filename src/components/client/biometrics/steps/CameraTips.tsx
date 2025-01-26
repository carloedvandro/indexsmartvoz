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
        <h3 className="text-lg font-semibold">Olá {profile?.full_name?.split(' ')[0]}</h3>
        <p className="text-sm text-gray-500">
          Verificamos que você esta realizando a contratação dos serviços da Vivo,
          precisamos que realize a biometria
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center">
          <Camera className="h-16 w-16 text-purple-600" />
        </div>
      </div>

      <p className="text-sm text-gray-600 text-center">
        A biometria é um processo de segurança da venda onde podemos validar a identidade do cliente.
      </p>

      <Button onClick={onNext} className="w-full bg-purple-600 hover:bg-purple-700">
        Avançar
      </Button>
    </div>
  );
}