import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function ValidationSuccess() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPanel, setShowPanel] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', isError: false });
  const [logEntries, setLogEntries] = useState<string[]>([]);
  const [statusIcon, setStatusIcon] = useState('✅');

  useEffect(() => {
    // Check status on load
    const statusAprovado = localStorage.getItem('statusValidacao') === 'aprovado';
    const statusReprovado = localStorage.getItem('statusValidacao') === 'reprovado';
    
    if (statusAprovado) {
      setStatusIcon('✅');
      setTimeout(() => {
        mostrarPainel();
      }, 800);
    } else if (statusReprovado) {
      setStatusIcon('❌');
      setNotification({
        show: true,
        message: '❌ Cadastro reprovado',
        isError: true
      });
      logAcesso('Tentativa de acesso negada.');
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
      message: '✅ Acesso liberado',
      isError: false
    });
    logAcesso('Painel acessado com sucesso');
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

  const handleConfiguracoes = () => {
    toast({
      title: "Configurações",
      description: "Abrindo configurações...",
    });
  };

  const sairDashboard = () => {
    toast({
      title: "Logout",
      description: "Você saiu da sessão com segurança.",
    });
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        .status-icon {
          animation: pulse 1.5s infinite;
        }
      `}</style>
      
      <div className="m-0 p-0 font-['Segoe_UI',sans-serif] bg-[#2f145e] text-white flex flex-col items-center justify-center min-h-screen">
        <div className="w-[90%] max-w-[400px] p-6 bg-[#3d1a7a] rounded-[20px] shadow-[0_0_24px_rgba(255,255,255,0.15)] text-center relative">
          <h1 className="text-[1.8rem] mb-4">Cadastro Validado!</h1>
          <p className="text-[1.1rem] text-[#ffd700]">Bem-vindo(a) ao App LOVABLE</p>
          
          <div className="status-icon text-[2rem] mt-3">
            {statusIcon}
          </div>

          {showPanel && (
            <div className="mt-7 flex flex-col gap-2.5">
              <button 
                onClick={handlePlanos}
                className="p-3 text-base bg-[#ffd700] text-[#2f145e] border-none rounded-[10px] cursor-pointer"
              >
                📦 Planos
              </button>
              
              <button 
                onClick={handlePerfil}
                className="p-3 text-base bg-[#ffd700] text-[#2f145e] border-none rounded-[10px] cursor-pointer"
              >
                🙋 Meu Perfil
              </button>
              
              <button 
                onClick={handleSuporte}
                className="p-3 text-base bg-[#ffd700] text-[#2f145e] border-none rounded-[10px] cursor-pointer"
              >
                🛠 Suporte
              </button>

              <button 
                onClick={handleConfiguracoes}
                className="p-3 text-base bg-[#ffd700] text-[#2f145e] border-none rounded-[10px] cursor-pointer"
              >
                ⚙️ Configurações
              </button>

              <button 
                onClick={sairDashboard}
                className="mt-2.5 p-3 bg-white text-[#3d1a7a] border-none rounded-[10px] cursor-pointer"
              >
                🚪 Sair
              </button>
              
              <div className="mt-4 text-[0.85rem] bg-[#5c2b8b] p-2.5 rounded-[10px] max-h-[100px] overflow-y-auto">
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
    </>
  );
}