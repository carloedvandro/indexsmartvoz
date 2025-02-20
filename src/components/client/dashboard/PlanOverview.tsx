
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronDown, ChevronRight, Phone } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const PlanOverview = () => {
  const navigate = useNavigate();
  const planData = {
    type: "Controle",
    number: "(99) 99999-9999",
    internetUsage: {
      used: 7.5,
      total: 15,
      renewalDate: "15/set"
    },
    billing: {
      amount: 50.99,
      dueDate: "15/out",
      status: "paga"
    }
  };

  const handlePlanDetails = () => {
    toast.info("Abrindo detalhes do plano...");
    // Navegação para detalhes do plano
    navigate("/client/plan-details");
  };

  const handleChangePlan = () => {
    toast.info("Iniciando troca de plano...");
    // Navegação para página de troca de plano
    navigate("/client/products");
  };

  const handleAdditionalPackages = () => {
    toast.info("Acessando pacotes adicionais...");
    // Navegação para pacotes adicionais
    navigate("/client/packages");
  };

  const handlePayNow = () => {
    toast.info("Redirecionando para pagamento...");
    // Navegação para página de pagamento
    navigate("/client/payment");
  };

  const handleViewBills = () => {
    toast.info("Abrindo faturas...");
    // Navegação para página de faturas
    navigate("/client/bills");
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-[#8425af] text-white p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl">Meu plano</span>
          <RefreshCw className="h-5 w-5 cursor-pointer hover:rotate-180 transition-transform duration-500" onClick={() => toast.success("Dados atualizados!")} />
        </div>
        <button 
          className="flex items-center gap-2 bg-[#6c1e8f] rounded p-2 w-full hover:bg-[#5c1a7a] transition-colors"
          onClick={() => toast.info("Selecionando linha...")}
        >
          <Phone className="h-4 w-4" />
          <span>{planData.type}</span>
          <ChevronDown className="h-4 w-4" />
          <span className="text-sm text-gray-300">{planData.number}</span>
        </button>
      </div>

      <div className="p-4">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#8425af"
                strokeWidth="8"
                fill="none"
                strokeDasharray="351.86"
                strokeDashoffset={351.86 * (1 - planData.internetUsage.used / planData.internetUsage.total)}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-2xl font-semibold text-[#8425af]">{planData.internetUsage.used} GB</div>
              <div className="text-sm text-gray-500">de {planData.internetUsage.total} GB</div>
            </div>
          </div>
          <p className="text-gray-600 mt-2">
            Internet pra usar como quiser
          </p>
          <p className="text-sm text-gray-500">
            Renova em {planData.internetUsage.renewalDate}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <button 
            className="flex flex-col items-center p-3 border rounded hover:bg-gray-50 transition-colors"
            onClick={handlePlanDetails}
          >
            <Phone className="h-5 w-5 text-gray-600 mb-1" />
            <span className="text-xs">Detalhe do plano</span>
          </button>
          <button 
            className="flex flex-col items-center p-3 border rounded hover:bg-gray-50 transition-colors"
            onClick={handleChangePlan}
          >
            <RefreshCw className="h-5 w-5 text-gray-600 mb-1" />
            <span className="text-xs">Trocar de plano</span>
          </button>
          <button 
            className="flex flex-col items-center p-3 border rounded hover:bg-gray-50 transition-colors"
            onClick={handleAdditionalPackages}
          >
            <ChevronRight className="h-5 w-5 text-gray-600 mb-1" />
            <span className="text-xs">Pacotes adicionais</span>
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-green-600">Fatura {planData.billing.status}</p>
              <p className="text-sm text-gray-500">Vence em {planData.billing.dueDate}</p>
            </div>
            <p className="text-xl font-semibold">{formatCurrency(planData.billing.amount)}</p>
          </div>
          <div className="flex justify-between">
            <Button 
              className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
              onClick={handlePayNow}
            >
              Pagar agora
            </Button>
            <Button 
              variant="link" 
              className="text-[#8425af]"
              onClick={handleViewBills}
            >
              Ver faturas
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
