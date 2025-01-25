import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ScanFace, Sun, Camera } from "lucide-react";

export function BiometricValidation() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 p-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">
          Vamos confirmar a sua identidade
        </h2>
        <p className="text-gray-500">
          Deixe seu rosto visível
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <ScanFace className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-base">
              Sem acessórios que encubram o rosto, como óculos, chapéus ou máscaras
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Sun className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-base">
              Fique num lugar com boa iluminação
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Camera className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-base">
              Sem pessoas ou objetos ao fundo
            </p>
          </div>
        </div>
      </div>

      <Button
        className="w-full bg-purple-600 hover:bg-purple-700"
      >
        Continuar
      </Button>
    </div>
  );
}