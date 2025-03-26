
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
    <div className="bg-[#8425af] text-white p-8 rounded-lg">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 className="h-24 w-24 text-white" />
        </div>
        
        <h2 className="text-2xl font-semibold">Processo de biometria concluído!</h2>
        <p className="text-base">
          Seus dados foram verificados com sucesso. Você pode continuar para o painel.
        </p>
        
        <Button 
          onClick={handleComplete} 
          className="w-full bg-white text-[#8425af] hover:bg-gray-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Finalizando...
            </>
          ) : (
            "CONTINUAR"
          )}
        </Button>
      </div>
    </div>
  );
};
