import { Loader2 } from "lucide-react";

export function ProcessingStep() {
  return (
    <div className="text-center space-y-4">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Aguarde!</h3>
          <p className="text-sm text-gray-500">
            Estamos analisando seus dados pra confirmar sua identidade
          </p>
          <p className="text-xs text-gray-400">
            Se fechar o app, você volta pro início da confirmação de identidade
          </p>
        </div>
      </div>
    </div>
  );
}