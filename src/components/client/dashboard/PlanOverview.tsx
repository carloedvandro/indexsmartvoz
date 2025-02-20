
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronDown, ChevronRight, Phone } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UsageInfoDisplay } from "./components/UsageInfoDisplay";
import { PhoneVerification } from "./components/PhoneVerification";
import { DataUsageChart } from "./components/DataUsageChart";
import { useDataUsage } from "./hooks/useDataUsage";
import type { PlanData } from "./types/dataUsage";

export const PlanOverview = () => {
  const navigate = useNavigate();
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const { dataUsage, loadDataUsage } = useDataUsage(undefined);

  const planData: PlanData = {
    type: dataUsage.activePlanName || "Controle",
    code: dataUsage.activePlanCode,
    number: phoneNumber || "(00) 00000-0000",
    internetUsage: {
      used: dataUsage.used,
      total: dataUsage.total,
      bonusUsed: dataUsage.bonusUsed,
      bonusTotal: dataUsage.bonusTotal,
      renewalDate: dataUsage.planRenewalDate 
        ? new Date(dataUsage.planRenewalDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
        : "15/set",
      bonusExpiration: dataUsage.bonusExpiration
        ? new Date(dataUsage.bonusExpiration).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
        : null
    },
    billing: {
      amount: 50.99,
      dueDate: "15/out",
      status: "paga"
    }
  };

  const loadPhoneVerification = async () => {
    console.log("Carregando verificação de telefone");
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) {
      console.log("Nenhuma sessão encontrada");
      return;
    }

    const { data: verification, error } = await supabase
      .from("phone_verifications")
      .select()
      .eq("user_id", session.session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Erro ao carregar verificação:", error);
      return;
    }

    if (verification) {
      console.log("Verificação encontrada:", verification);
      setPhoneNumber(verification.phone_number);
      setIsVerified(verification.verified);
      
      if (verification.verified) {
        await loadDataUsage(session.session.user.id);
      }
    } else {
      console.log("Nenhuma verificação encontrada");
    }
  };

  useEffect(() => {
    console.log("Inicializando componente");
    loadPhoneVerification();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isVerified) {
      console.log("Iniciando monitoramento de uso");
      const startMonitoring = async () => {
        const { data: session } = await supabase.auth.getSession();
        if (!session?.session?.user) return;

        interval = setInterval(async () => {
          await loadDataUsage(session.session.user.id);
        }, 5000);
      };

      startMonitoring();
    }

    return () => {
      if (interval) {
        console.log("Limpando intervalo de monitoramento");
        clearInterval(interval);
      }
    };
  }, [isVerified]);

  const handleNumberClick = () => {
    if (!isVerified) {
      setIsPhoneDialogOpen(true);
    }
  };

  const handlePlanDetails = () => {
    toast.info("Abrindo detalhes do plano...");
    navigate("/client/plan-details");
  };

  const handleChangePlan = () => {
    toast.info("Iniciando troca de plano...");
    navigate("/client/products");
  };

  const handleAdditionalPackages = () => {
    toast.info("Acessando pacotes adicionais...");
    navigate("/client/packages");
  };

  const handlePayNow = () => {
    toast.info("Redirecionando para pagamento...");
    navigate("/client/payment");
  };

  const handleViewBills = () => {
    toast.info("Abrindo faturas...");
    navigate("/client/bills");
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="bg-[#8425af] text-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl">Meu plano</span>
            <RefreshCw 
              className="h-5 w-5 cursor-pointer hover:rotate-180 transition-transform duration-500" 
              onClick={() => {
                toast.success("Dados atualizados!");
                loadPhoneVerification();
              }} 
            />
          </div>
          <button 
            className="flex items-center gap-2 bg-[#6c1e8f] rounded p-2 w-full hover:bg-[#5c1a7a] transition-colors"
            onClick={handleNumberClick}
          >
            <Phone className="h-4 w-4" />
            <span>{planData.type}</span>
            {planData.code && <span className="text-xs bg-[#8425af] px-2 py-1 rounded">{planData.code}</span>}
            <ChevronDown className="h-4 w-4" />
            <span className="text-sm text-gray-300">{planData.number}</span>
          </button>
        </div>

        <div className="p-4">
          <div className="flex flex-col items-center mb-6">
            <DataUsageChart dataUsage={dataUsage} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <UsageInfoDisplay planData={planData} dataUsage={dataUsage} />
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

      <PhoneVerification
        isPhoneDialogOpen={isPhoneDialogOpen}
        setIsPhoneDialogOpen={setIsPhoneDialogOpen}
        isVerificationDialogOpen={isVerificationDialogOpen}
        setIsVerificationDialogOpen={setIsVerificationDialogOpen}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        setIsVerified={setIsVerified}
        loadDataUsage={loadDataUsage}
      />
    </>
  );
};
