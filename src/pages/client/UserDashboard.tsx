
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-600 p-6">
      <div className="container mx-auto max-w-2xl">
        {/* Título centralizado */}
        <h1 className="text-3xl font-bold text-white text-center mb-8">Painel do Usuário</h1>

        {/* Notificação de Status */}
        {statusValidacao === 'reprovado' && (
          <Alert className="mb-6 bg-red-600/90 border-red-500 text-white animate-pulse">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="font-bold">
              Sua validação foi reprovada. Verifique os dados e envie novamente.
            </AlertDescription>
          </Alert>
        )}

        {/* Card de Boas-vindas */}
        <div className="bg-black/20 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold text-white">Bem-vindo(a), {nomeUsuario}</h2>
          </div>
          <p className="text-white/90 mb-2">CPF: {cpfUsuario}</p>
          <p className="text-white/90">Data de Nascimento: {nascimentoUsuario}</p>
        </div>

        {/* Card de Última Verificação */}
        <div className="bg-black/20 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold text-white">Última verificação</h2>
          </div>
          <p className="text-white/90 mb-2">Documento validado com sucesso.</p>
          <p className="text-white/90">Protocolo: {protocolo}</p>
        </div>

        {/* Card de Histórico */}
        <div className="bg-black/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Histórico de Acessos</h2>
          <p className="text-white/90">Último acesso em: {ultimoAcesso}</p>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <Button
            onClick={reenviarDocumento}
            className="bg-white text-purple-800 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg"
          >
            <FileText className="h-5 w-5 mr-2" />
            Reenviar Documento
          </Button>
          
          <Button
            onClick={atualizarSelfie}
            className="bg-white text-purple-800 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg"
          >
            <Camera className="h-5 w-5 mr-2" />
            Atualizar Selfie
          </Button>
        </div>

        {/* Botão Acessar Dashboard */}
        <div className="text-center mb-8">
          <Button
            onClick={acessarDashboard}
            className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-bold px-12 py-4 rounded-lg text-lg"
          >
            🔓 Acessar Dashboard
          </Button>
        </div>

        {/* Botão de Logout */}
        <div className="text-center">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-white/50 text-white hover:bg-white/10 font-bold px-8 py-3 rounded-lg"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sair da Conta
          </Button>
        </div>
      </div>
    </div>
  );
}
