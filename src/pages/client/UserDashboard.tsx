
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

    const protocoloSalvo = localStorage.getItem('protocoloGerado') || 'P' + Date.now();
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-600">
      {/* Header */}
      <header className="p-4 text-center">
        <h1 className="text-2xl font-bold text-white">Área Segura do Cliente</h1>
      </header>

      <div className="px-4 py-4 bg-transparent max-w-[390px] mx-auto mt-16">
        {/* Notificação de Status */}
        {statusValidacao === 'reprovado' && (
          <Alert className="mb-4 bg-red-600/90 border-red-500 text-white animate-pulse">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="font-bold">
              Sua validação foi reprovada. Verifique os dados e envie novamente.
            </AlertDescription>
          </Alert>
        )}

        {/* Card de Boas-vindas com fundo transparente */}
        <div className="px-4 py-4 bg-transparent backdrop-blur-sm rounded-lg border border-white/20 shadow-lg mb-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-5 w-5 text-white" />
            <h2 className="text-xl font-semibold text-white">Bem-vindo(a), {nomeUsuario}</h2>
          </div>
          <p className="text-white/90 text-sm">CPF: {cpfUsuario}</p>
          <p className="text-white/90 text-sm">Data de Nascimento: {nascimentoUsuario}</p>
        </div>

        {/* Card de Última Verificação com fundo transparente */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-white" />
            <h2 className="text-xl font-semibold text-white">Última verificação</h2>
          </div>
          <p className="text-white/90 text-sm mb-1">Documento validado com sucesso.</p>
          <p className="text-white/90 text-sm">Protocolo: {protocolo}</p>
        </div>

        {/* Card de Histórico com fundo transparente */}
        <div className="px-4 py-4 bg-transparent rounded-lg border border-white/20 shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Histórico de Acessos</h2>
          <p className="text-white/90 text-sm">Último acesso em: {ultimoAcesso}</p>
        </div>

        {/* Ações com botões transparentes */}
        <div className="px-4 py-4 bg-transparent flex flex-wrap gap-3 justify-center mb-6">
          <Button
            onClick={reenviarDocumento}
            className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 shadow-lg font-bold flex-1 min-w-[140px]"
          >
            <FileText className="h-4 w-4 mr-2" />
            Reenviar Documento
          </Button>
          
          <Button
            onClick={atualizarSelfie}
            className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 shadow-lg font-bold flex-1 min-w-[140px]"
          >
            <Camera className="h-4 w-4 mr-2" />
            Atualizar Selfie
          </Button>
        </div>

        {/* Botão para acessar dashboard com styling atualizado */}
        <div className="text-center mb-6">
          <Button
            onClick={acessarDashboard}
            className="px-4 py-4 bg-transparent text-white hover:bg-white/20 border border-white/20 shadow-lg font-bold"
          >
            Acessar Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
