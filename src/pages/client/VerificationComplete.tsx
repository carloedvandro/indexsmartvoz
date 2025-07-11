import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const VerificationComplete = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Limpar dados temporários do localStorage
    const timer = setTimeout(() => {
      localStorage.removeItem('selfieBase64');
      localStorage.removeItem('documentoFrenteBase64');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-600 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <CheckCircle className="w-24 h-24 text-white mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Verificação Concluída!
        </h1>
        
        <p className="text-lg text-white/90 mb-8">
          Sua identidade foi verificada com sucesso. Todos os documentos foram validados e você está pronto para prosseguir.
        </p>
        
        <div className="space-y-4">
          <Button
            onClick={() => navigate('/client/dashboard')}
            className="w-full bg-white text-green-800 hover:bg-gray-100"
          >
            Ir para Dashboard
          </Button>
          
          <Button
            onClick={() => navigate('/client/plans')}
            variant="outline"
            className="w-full border-white text-white hover:bg-white/10"
          >
            Escolher Plano
          </Button>
        </div>
      </div>
    </div>
  );
};