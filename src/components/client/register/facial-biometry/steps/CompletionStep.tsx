
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
    <div className="bg-white text-gray-800 flex flex-col">
      <div className="flex-1 flex items-start justify-center pt-10 p-6">
        <div className="flex flex-col items-center w-full max-w-[280px]">
          <div className="bg-gray-100 p-8 rounded-full mb-6">
            <CheckCircle2 size={64} color="#8425af" strokeWidth={1.5} />
          </div>
          
          <h2 className="text-xl font-semibold mb-2 text-gray-800 text-center">Processo de biometria concluído!</h2>
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            Seus dados foram verificados com sucesso.<br />
            Você pode continuar para o painel.
          </p>
        </div>
      </div>

      {/* Botão fixado na parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <button
          onClick={handleComplete}
          disabled={isSubmitting}
          className="w-full h-12 bg-[#8425af] text-white hover:bg-[#7a1fa2] font-medium uppercase text-base tracking-wider rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
};
