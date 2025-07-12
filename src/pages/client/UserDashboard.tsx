
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [nomeUsuario, setNomeUsuario] = useState("João da Silva");
  const [cpfUsuario, setCpfUsuario] = useState("123.456.789-00");
  const [nascimentoUsuario, setNascimentoUsuario] = useState("01/01/1990");
  const [protocolo, setProtocolo] = useState("P1752276394642");
  const [ultimoAcesso, setUltimoAcesso] = useState("11/07/2025, 20:26:34");
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
    <div 
      className="min-h-screen bg-gradient-to-b from-purple-700 to-purple-500 text-white flex flex-col items-center justify-start p-0"
      style={{ 
        fontFamily: "'Segoe UI', sans-serif",
        background: "linear-gradient(to bottom, #6a0dad, #9b30ff)"
      }}
    >
      {/* Header fixo branco */}
      <div className="w-full bg-white py-3 flex justify-center items-center shadow-md fixed top-0 z-50">
        <img 
          src="/lovable-uploads/25c69f01-7304-4dbf-8548-f4003901513c.png" 
          alt="SmartVoz Logo" 
          className="h-9"
        />
      </div>

      {/* Notificação de Status */}
      {statusValidacao === 'reprovado' && (
        <Alert className="mb-4 bg-red-600/90 border-red-500 text-white animate-pulse max-w-6xl mx-auto mt-20">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="font-bold">
            Sua validação foi reprovada. Verifique os dados e envie novamente.
          </AlertDescription>
        </Alert>
      )}

      {/* Container principal */}
      <div 
        className="w-full max-w-[600px] rounded-2xl p-6 flex flex-col justify-center shadow-2xl"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          margin: "120px auto 40px auto",
          boxShadow: "0 0 24px rgba(0, 0, 0, 0.2)"
        }}
      >
        <h1 className="text-2xl text-center mb-6">SmartVoz – Área Segura do Cliente</h1>

        {/* Card de Boas-vindas */}
        <div 
          className="rounded-xl p-4 mb-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
        >
          <h2 className="text-xl font-semibold mb-2">👤 Bem-vindo(a), {nomeUsuario}</h2>
          <p className="text-sm mb-1">
            <strong>CPF:</strong> {cpfUsuario}
          </p>
          <p className="text-sm">
            <strong>Data de Nascimento:</strong> {nascimentoUsuario}
          </p>
        </div>

        {/* Card de Última Verificação */}
        <div 
          className="rounded-xl p-4 mb-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
        >
          <h2 className="text-xl font-semibold mb-2">📄 Última Verificação</h2>
          <p className="text-sm mb-1">Documento validado com sucesso.</p>
          <p className="text-sm">
            <strong>Protocolo:</strong> {protocolo}
          </p>
        </div>

        {/* Card de Histórico */}
        <div 
          className="rounded-xl p-4 mb-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
        >
          <h2 className="text-xl font-semibold mb-2">⏱ Histórico de Acessos</h2>
          <p className="text-sm">
            Último acesso em: {ultimoAcesso}
          </p>
        </div>

        {/* Ações */}
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <Button 
            onClick={reenviarDocumento}
            className="bg-white text-purple-700 hover:bg-gray-100 font-bold rounded-lg py-2 px-4 flex-1 min-w-[40%]"
          >
            📄 Reenviar Documento
          </Button>
          
          <Button 
            onClick={atualizarSelfie}
            className="bg-white text-purple-700 hover:bg-gray-100 font-bold rounded-lg py-2 px-4 flex-1 min-w-[40%]"
          >
            📷 Atualizar Selfie
          </Button>
          
          <Button 
            onClick={acessarDashboard}
            className="bg-white text-purple-700 hover:bg-gray-100 font-bold rounded-lg py-2 px-4 flex-1 min-w-[40%]"
          >
            🔓 Acessar Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
