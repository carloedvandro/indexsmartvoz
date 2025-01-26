import { Loader2 } from "lucide-react";

export function ProcessingStep() {
  return (
    <div className="text-center space-y-4">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Processando...</h3>
          <p className="text-gray-600">
            Aguarde enquanto validamos suas informações. Isso pode levar alguns minutos.
          </p>
        </div>
      </div>
    </div>
  );
}