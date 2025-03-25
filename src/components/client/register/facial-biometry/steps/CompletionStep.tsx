
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CompletionStepProps {
  onComplete: () => void;
}

export const CompletionStep = ({ onComplete }: CompletionStepProps) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const navigate = useNavigate();

  const handleCompletion = () => {
    setIsCompleting(true);
    
    // Call the parent's completion handler
    onComplete();
  };

  const handleLogin = () => {
    navigate("/client/login");
  };

  return (
    <div className="space-y-8 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-semibold">Verificação Concluída!</h2>
        <p className="text-gray-600 max-w-md">
          Sua verificação foi concluída com sucesso. Você já pode acessar sua conta.
        </p>
      </div>

      <div className="space-y-3">
        <Button 
          onClick={handleCompletion}
          className="w-full bg-purple-700 hover:bg-purple-800"
          disabled={isCompleting}
        >
          {isCompleting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Finalizando...
            </>
          ) : (
            "Ir para o Dashboard"
          )}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleLogin}
          className="w-full"
          disabled={isCompleting}
        >
          Fazer Login
        </Button>
      </div>
    </div>
  );
};
