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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-600">
      {/* Header */}
      <header className="bg-black/20 p-4 text-center border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">Painel do Usuário</h1>
      </header>

      <div className="container mx-auto p-6 max-w-4xl">
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
        <Card className="mb-4 bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Bem-vindo(a), {nomeUsuario}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">CPF: {cpfUsuario}</p>
            <p>Data de Nascimento: {nascimentoUsuario}</p>
          </CardContent>
        </Card>

        {/* Card de Última Verificação */}
        <Card className="mb-4 bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Última verificação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Documento validado com sucesso.</p>
            <p>Protocolo: {protocolo}</p>
          </CardContent>
        </Card>

        {/* Card de Histórico */}
        <Card className="mb-6 bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Histórico de Acessos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Último acesso em: {ultimoAcesso}</p>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="text-center mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={reenviarDocumento}
              className="bg-white text-purple-800 hover:bg-gray-100 font-bold"
            >
              <FileText className="h-4 w-4 mr-2" />
              Reenviar Documento
            </Button>
            
            <Button
              onClick={atualizarSelfie}
              className="bg-white text-purple-800 hover:bg-gray-100 font-bold"
            >
              <Camera className="h-4 w-4 mr-2" />
              Atualizar Selfie
            </Button>
          </div>
        </div>

        {/* Logout */}
        <div className="text-center">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-white text-white hover:bg-white/10 font-bold"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair da Conta
          </Button>
        </div>
      </div>
    </div>
  );
}