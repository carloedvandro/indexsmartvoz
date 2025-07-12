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
    <div className="min-h-screen bg-gradient-to-b from-[#5f0889] to-[#9b30ff] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        
        {/* Ícone de erro */}
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Verificação Reprovada
          </h1>
        </div>

        {/* Card com explicação */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-red-500/30 p-6 space-y-4">
          <div className="text-white/90 leading-relaxed">
            <p className="mb-4">
              Nossa equipe da SmartVoz não conseguiu confirmar que os dados do documento 
              e da selfie pertencem à mesma pessoa.
            </p>
            
            {/* Motivos comuns */}
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-4">
              <h3 className="text-white font-semibold mb-2">Motivos comuns:</h3>
              <ul className="text-red-100 text-sm space-y-1">
                <li>• Documento de terceiros</li>
                <li>• Rosto não visível</li>
                <li>• Divergência nos dados</li>
              </ul>
            </div>
            
            <p className="text-sm">
              Por segurança, seu acesso foi bloqueado.
            </p>
          </div>
        </div>

        {/* Botão de tentar novamente */}
        <Button
          onClick={tentarNovamente}
          className="w-full py-4 bg-white text-[#5f0889] hover:bg-white/90 font-bold text-lg rounded-full"
        >
          Tentar novamente
        </Button>
      </div>
    </div>
  );
};