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
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{backgroundColor: '#5f0889'}}>
      <div className="px-4 py-4 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 max-w-md w-full text-center">
        <X className="w-16 h-16 mx-auto mb-4" style={{color: '#ff0000'}} />
        
        <h1 className="text-2xl font-bold text-white mb-4">
          Verificação Reprovada
        </h1>
        
        <p className="text-white/90 mb-6 leading-relaxed">
          Nossa equipe da SmartVoz não conseguiu confirmar que os dados do documento e da selfie pertencem à mesma pessoa.
          <br /><br />
          Motivos comuns: documento de terceiros, rosto não visível, divergência nos dados.
          <br /><br />
          Por segurança, seu acesso foi bloqueado.
        </p>
      </div>
      
      <Button
        onClick={tentarNovamente}
        className="w-full mt-6 px-4 py-4 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 text-white font-bold hover:bg-white/20"
      >
        Tentar novamente
      </Button>
    </div>
  );
};