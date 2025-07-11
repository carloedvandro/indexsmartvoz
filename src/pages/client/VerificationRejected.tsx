
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const VerificationRejected = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Limpar dados do localStorage
    localStorage.removeItem('selfieBase64');
    localStorage.removeItem('documentoFrenteBase64');
    localStorage.removeItem('documentoTextoExtraido');
  }, []);

  const tentarNovamente = () => {
    navigate('/client/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="bg-white/5 p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <X className="w-16 h-16 text-red-400 mx-auto mb-4" />
        
        <h1 className="text-2xl font-bold text-white mb-4">
          Verificação Reprovada ❌
        </h1>
        
        <p className="text-white/90 mb-6 leading-relaxed">
          A equipe da SmartVoz não conseguiu validar as informações enviadas no processo de verificação.
          <br /><br />
          Motivos comuns: documento de terceiros, rosto não visível, divergência nos dados.
          <br /><br />
          Por segurança, seu acesso foi bloqueado.
        </p>
        
        <Button
          onClick={tentarNovamente}
          className="w-full bg-white text-purple-800 hover:bg-gray-100 font-bold py-3"
        >
          Tentar novamente
        </Button>
      </div>
    </div>
  );
};
