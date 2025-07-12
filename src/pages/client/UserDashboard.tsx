
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, FileText, Camera, LogOut, AlertTriangle } from "lucide-react";
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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.clear();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      navigate('/');
    } catch (error) {
      console.error('Erro no logout:', error);
      toast({
        title: "Erro no logout",
        description: "Ocorreu um erro ao sair da conta.",
        variant: "destructive",
      });
    }
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
      <header className="bg-black/20 p-4 text-center border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">Painel do Usuário</h1>
      </header>

      <div className="container mx-auto p-6 max-w-2xl">
        {/* Notificação de Status */}
        {statusValidacao === 'reprovado' && (
          <Alert className="mb-4 bg-red-600/90 border-red-500 text-white animate-pulse">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="font-bold">
              Sua validação foi reprovada. Verifique os dados e envie novamente.
            </AlertDescription>
          </Alert>
        )}

        {/* Card de Boas-vindas - Mais compacto */}
        <div className="bg-black/15 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-5 w-5" />
            <h2 className="text-xl font-semibold text-white">Bem-vindo(a), {nomeUsuario}</h2>
          </div>
          <p className="text-white/90 text-sm">CPF: {cpfUsuario}</p>
          <p className="text-white/90 text-sm">Data de Nascimento: {nascimentoUsuario}</p>
        </div>

        {/* Card de Última Verificação - Mais compacto */}
        <div className="bg-black/15 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5" />
            <h2 className="text-xl font-semibold text-white">Última verificação</h2>
          </div>
          <p className="text-white/90 text-sm mb-1">Documento validado com sucesso.</p>
          <p className="text-white/90 text-sm">Protocolo: {protocolo}</p>
        </div>

        {/* Card de Histórico - Mais compacto */}
        <div className="bg-black/15 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Histórico de Acessos</h2>
          <p className="text-white/90 text-sm">Último acesso em: {ultimoAcesso}</p>
        </div>

        {/* Ações - Layout mais limpo */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <Button
            onClick={reenviarDocumento}
            className="bg-white text-purple-800 hover:bg-gray-100 font-bold flex-1 min-w-[140px]"
          >
            <FileText className="h-4 w-4 mr-2" />
            Reenviar Documento
          </Button>
          
          <Button
            onClick={atualizarSelfie}
            className="bg-white text-purple-800 hover:bg-gray-100 font-bold flex-1 min-w-[140px]"
          >
            <Camera className="h-4 w-4 mr-2" />
            Atualizar Selfie
          </Button>
        </div>

        {/* Botão para acessar dashboard */}
        <div className="text-center mb-6">
          <Button
            onClick={acessarDashboard}
            className="bg-purple-700 text-white hover:bg-purple-800 font-bold px-8"
          >
            🔓 Acessar Dashboard
          </Button>
        </div>

        {/* Logout */}
        <div className="text-center">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-white/50 text-white hover:bg-white/10 font-bold"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair da Conta
          </Button>
        </div>
      </div>
    </div>
  );
}
