import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const VerificationComplete = () => {
  const navigate = useNavigate();
  const [protocolo, setProtocolo] = useState("");
  const [dadosCadastrais, setDadosCadastrais] = useState<any>({});
  const [selfie, setSelfie] = useState("");
  const [documentoTexto, setDocumentoTexto] = useState("");

  useEffect(() => {
    // Gerar protocolo
    const novoProtocolo = 'P' + new Date().getTime();
    setProtocolo(novoProtocolo);

    // Recuperar dados do localStorage
    const dados = JSON.parse(localStorage.getItem('dadosCadastrais') || '{}');
    const selfieBase64 = localStorage.getItem('selfieBase64') || '';
    const textoDocumento = localStorage.getItem('documentoTextoExtraido') || '';

    setDadosCadastrais(dados);
    setSelfie(selfieBase64);
    setDocumentoTexto(textoDocumento);

    // Limpar dados temporários após 10 segundos
    const timer = setTimeout(() => {
      localStorage.removeItem('selfieBase64');
      localStorage.removeItem('documentoFrenteBase64');
      localStorage.removeItem('documentoTextoExtraido');
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const irParaDashboard = () => {
    navigate('/client/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="bg-white/5 p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
        
        <h1 className="text-2xl font-bold text-white mb-2">
          Identidade Confirmada ✅
        </h1>
        
        <p className="text-white/90 mb-6">
          Seus dados foram validados com sucesso pela inteligência artificial.
        </p>
        
        {/* Detalhes dos dados */}
        <div className="text-left mb-4 space-y-2">
          <p className="text-white">
            <strong>Nome:</strong> {dadosCadastrais.nome || 'João da Silva'}
          </p>
          <p className="text-white">
            <strong>CPF:</strong> {dadosCadastrais.cpf || '123.456.789-00'}
          </p>
          <p className="text-white">
            <strong>Nascimento:</strong> {dadosCadastrais.nascimento || '01/01/1990'}
          </p>
          
          {documentoTexto && (
            <div className="text-white">
              <strong>Documento:</strong>
              <pre className="text-xs bg-black/20 p-2 rounded mt-1 max-h-20 overflow-y-auto">
                {documentoTexto}
              </pre>
            </div>
          )}
        </div>

        {/* Selfie capturada */}
        {selfie && (
          <div className="mb-4">
            <img 
              src={selfie} 
              alt="Selfie capturada" 
              className="w-24 h-24 rounded-full border-2 border-white mx-auto object-cover"
            />
          </div>
        )}
        
        {/* Protocolo */}
        <div className="text-xl font-bold text-white mb-6">
          Protocolo: {protocolo}
        </div>
        
        <Button
          onClick={irParaDashboard}
          className="w-full bg-white text-purple-800 hover:bg-gray-100 font-bold py-3"
        >
          Acessar Painel
        </Button>
      </div>
    </div>
  );
};