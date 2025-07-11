import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function ValidationSuccess() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPanel, setShowPanel] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', isError: false });
  const [logEntries, setLogEntries] = useState<string[]>([]);

  useEffect(() => {
    // Check status on load
    const statusAprovado = localStorage.getItem('statusValidacao') === 'aprovado';
    const statusReprovado = localStorage.getItem('statusValidacao') === 'reprovado';
    
    if (statusAprovado) {
      setTimeout(() => {
        mostrarPainel();
      }, 1000);
    } else if (statusReprovado) {
      setNotification({
        show: true,
        message: '❌ Cadastro reprovado. Dados não conferem.',
        isError: true
      });
      logAcesso('Tentativa de acesso reprovada.');
    }
  }, []);

  const logAcesso = (mensagem: string) => {
    const dataHora = new Date().toLocaleString('pt-BR');
    const entry = `[${dataHora}] ${mensagem}`;
    setLogEntries(prev => [entry, ...prev]);
  };

  const mostrarPainel = () => {
    setShowPanel(true);
    setNotification({
      show: true,
      message: '✅ Último acesso confirmado com sucesso!',
      isError: false
    });
    logAcesso('Acesso ao painel confirmado.');
  };

  const handlePlanos = () => {
    toast({
      title: "Carregando planos...",
      description: "Redirecionando para seleção de planos.",
    });
    navigate('/client/plan-selection');
  };

  const handlePerfil = () => {
    toast({
      title: "Abrindo perfil",
      description: "Carregando dados do usuário.",
    });
    navigate('/client/dashboard');
  };

  const handleSuporte = () => {
    toast({
      title: "Suporte",
      description: "Funcionalidade em construção.",
    });
  };

  return (
    <div className="m-0 p-0 font-['Segoe_UI',sans-serif] bg-[#2f145e] text-white flex flex-col items-center justify-center min-h-screen">
      <div className="w-[90%] max-w-[400px] p-6 bg-[#3d1a7a] rounded-[20px] shadow-[0_0_24px_rgba(255,255,255,0.15)] text-center">
        <h1 className="text-[1.8rem] mb-4">Cadastro Validado com Sucesso!</h1>
        <p className="mt-3 text-[1.1rem] text-[#ffd700]">Seja bem-vindo(a) à sua área segura.</p>
        
        {!showPanel && (
          <button 
            onClick={mostrarPainel}
            className="mt-5 px-6 py-3 bg-white text-[#2f145e] font-bold border-none rounded-[10px] cursor-pointer transition-colors duration-300 hover:bg-[#ddd]"
          >
            Entrar no Dashboard
          </button>
        )}

        {showPanel && (
          <div className="mt-8 flex flex-col gap-3">
            <button 
              onClick={handlePlanos}
              className="p-2.5 text-base bg-[#ffd700] text-[#2f145e] border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#e6c200]"
            >
              Planos Disponíveis
            </button>
            
            <button 
              onClick={handlePerfil}
              className="p-2.5 text-base bg-[#ffd700] text-[#2f145e] border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#e6c200]"
            >
              Meu Perfil
            </button>
            
            <button 
              onClick={handleSuporte}
              className="p-2.5 text-base bg-[#ffd700] text-[#2f145e] border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#e6c200]"
            >
              Suporte
            </button>
            
            <div className="mt-5 text-[0.85rem] bg-[#5c2b8b] p-2.5 rounded-[10px] max-h-[120px] overflow-y-auto">
              {logEntries.length === 0 ? (
                <p className="text-gray-300">Nenhum log registrado ainda.</p>
              ) : (
                logEntries.map((entry, index) => (
                  <div key={index} className="mb-1">
                    {entry}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {notification.show && (
          <div className={`mt-5 text-[0.95rem] p-2.5 rounded-[10px] ${
            notification.isError 
              ? 'bg-[#ff4c4c] text-white' 
              : 'bg-[#4b267f]'
          }`}>
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
}