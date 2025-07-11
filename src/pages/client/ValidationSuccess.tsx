import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function ValidationSuccess() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const entrarDashboard = () => {
    toast({
      title: "Bem-vindo(a)!",
      description: "Redirecionando para seu painel...",
    });
    
    setTimeout(() => {
      navigate('/client/dashboard');
    }, 1000);
  };

  return (
    <div className="m-0 p-0 font-['Segoe_UI',sans-serif] bg-[#2f145e] text-white flex flex-col items-center justify-center min-h-screen">
      <div className="w-[90%] max-w-[400px] p-6 bg-[#3d1a7a] rounded-[20px] shadow-[0_0_24px_rgba(255,255,255,0.15)] text-center">
        <h1 className="text-[1.8rem] mb-4">Cadastro Validado com Sucesso!</h1>
        <p className="mt-3 text-[1.1rem] text-[#ffd700]">Seja bem-vindo(a) à sua área segura.</p>
        
        <button 
          onClick={entrarDashboard}
          className="mt-5 px-6 py-3 bg-white text-[#2f145e] font-bold border-none rounded-[10px] cursor-pointer transition-colors duration-300 hover:bg-[#ddd]"
        >
          Entrar no Dashboard
        </button>
      </div>
    </div>
  );
}