import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClientUpgrade() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Voltar
      </button>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Confira aqui as melhores ofertas para você</h1>
        <p className="text-xl text-gray-600">
          Tenha a melhor rede móvel com velocidade 5G no seu plano Smartvoz Pós
        </p>
      </div>

      {/* Empty state */}
      <div className="text-center text-gray-500 mt-12">
        <p>Nenhum plano disponível no momento.</p>
        <p>Em breve novos planos serão adicionados.</p>
      </div>
    </div>
  );
}