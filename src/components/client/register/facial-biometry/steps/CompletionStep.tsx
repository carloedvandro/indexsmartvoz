
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";

interface CompletionStepProps {
  onComplete: () => void;
}

export const CompletionStep = ({ onComplete }: CompletionStepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      // Simular algum processamento final
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-[calc(100vh-100px)] relative flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 p-8 rounded-full mb-6">
            <CheckCircle2 size={64} color="#8425af" strokeWidth={1.5} />
          </div>
          
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Processo de biometria concluído!</h2>
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            Seus dados foram verificados com sucesso.<br />
            Você pode continuar para o painel.
          </p>
        </div>
      </div>

      <button
        onClick={handleComplete}
        disabled={isSubmitting}
        className="w-full h-12 bg-[#8425af] text-white uppercase text-xs font-medium hover:bg-[#7a1fa2] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Finalizando...
          </div>
        ) : (
          "CONTINUAR"
        )}
      </button>
    </div>
  );
};
