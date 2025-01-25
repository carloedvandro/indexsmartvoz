import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-2" />
      <p className="text-gray-600 text-sm">Carregando...</p>
    </div>
  );
};