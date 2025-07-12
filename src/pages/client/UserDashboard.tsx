
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, FileText, Camera, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [nomeUsuario, setNomeUsuario] = useState("Usuário");
  const [cpfUsuario, setCpfUsuario] = useState("---");
  const [nascimentoUsuario, setNascimentoUsuario] = useState("---");
  const [protocolo, setProtocolo] = useState("N/A");
  const [ultimoAcesso, setUltimoAcesso] = useState("");
  const [statusValidacao, setStatusValidacao] = useState("");

  useEffect(() => {
    carregarDadosUsuario();
    atualizarUltimoAcesso();
  }, []);

  const carregarDadosUsuario = () => {
    // Carregar dados do localStorage (simulando dados persistidos)
    const dados = JSON.parse(localStorage.getItem('dadosCadastrais') || '{}');
    setNomeUsuario(dados.nome || 'João da Silva');
    setCpfUsuario(dados.cpf || '123.456.789-00');
    setNascimentoUsuario(dados.nascimento || '01/01/1990');
    const protocoloSalvo = localStorage.getItem('protocoloGerado') || 'P1752276394642';
    setProtocolo(protocoloSalvo);
    const status = localStorage.getItem('statusValidacao') || '';
    setStatusValidacao(status);
  };

  const atualizarUltimoAcesso = () => {
    const agora = new Date().toLocaleString('pt-BR');
    setUltimoAcesso(agora);
    localStorage.setItem('ultimoAcesso', agora);
  };

  const reenviarDocumento = () => {
    navigate('/client/document-verification');
  };

  const atualizarSelfie = () => {
    navigate('/client/facial-biometry');
  };

  const acessarDashboard = () => {
    navigate('/client/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 to-purple-500 flex flex-col">
      {/* Header fixo branco */}
      <div className="fixed top-0 left-0 right-0 bg-white py-3 flex justify-center items-center shadow-md z-50">
        <img 
          src="/lovable-uploads/25c69f01-7304-4dbf-8548-f4003901513c.png" 
          alt="SmartVoz Logo" 
          className="h-9"
        />
      </div>

      {/* Container principal com margem do header */}
      <div className="flex-1 flex items-center justify-center px-6 pt-20 pb-10">
        <div className="w-full max-width-[600px] bg-white/5 rounded-2xl p-6 shadow-2xl">
          
          <h1 className="text-2xl font-semibold text-white text-center mb-6">
            SmartVoz – Área Segura do Cliente
          </h1>

          {/* Notificação de Status */}
          {statusValidacao === 'reprovado' && (
            <Alert className="mb-4 bg-red-600/90 border-red-500 text-white animate-pulse">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="font-bold">
                Sua validação foi reprovada. Verifique os dados e envie novamente.
              </AlertDescription>
            </Alert>
          )}

          {/* Card de Boas-vindas */}
          <div className="bg-black/15 rounded-xl p-4 mb-4">
            <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
              👤 Bem-vindo(a), {nomeUsuario}
            </h2>
            <p className="text-white/90 text-sm mb-1">
              <strong>CPF:</strong> {cpfUsuario}
            </p>
            <p className="text-white/90 text-sm">
              <strong>Data de Nascimento:</strong> {nascimentoUsuario}
            </p>
          </div>

          {/* Card de Última Verificação */}
          <div className="bg-black/15 rounded-xl p-4 mb-4">
            <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
              📄 Última Verificação
            </h2>
            <p className="text-white/90 text-sm mb-1">
              Documento validado com sucesso.
            </p>
            <p className="text-white/90 text-sm">
              <strong>Protocolo:</strong> {protocolo}
            </p>
          </div>

          {/* Card de Histórico */}
          <div className="bg-black/15 rounded-xl p-4 mb-6">
            <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
              ⏱ Histórico de Acessos
            </h2>
            <p className="text-white/90 text-sm">
              Último acesso em: {ultimoAcesso}
            </p>
          </div>

          {/* Ações */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button 
              onClick={reenviarDocumento} 
              className="bg-white text-purple-700 hover:bg-gray-100 font-bold flex-1 min-w-[140px] rounded-lg"
            >
              📄 Reenviar Documento
            </Button>
            
            <Button 
              onClick={atualizarSelfie} 
              className="bg-white text-purple-700 hover:bg-gray-100 font-bold flex-1 min-w-[140px] rounded-lg"
            >
              📷 Atualizar Selfie
            </Button>
            
            <Button 
              onClick={acessarDashboard} 
              className="bg-white text-purple-700 hover:bg-gray-100 font-bold w-full rounded-lg mt-2"
            >
              🔓 Acessar Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
