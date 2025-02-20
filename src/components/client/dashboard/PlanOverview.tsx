import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronDown, ChevronRight, Phone } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

interface DataUsageState {
  used: number;
  total: number;
  percentage: number;
  bonusUsed: number;
  bonusTotal: number;
  bonusPercentage: number;
  bonusExpiration: Date | null;
  planRenewalDate: Date | null;
  activePlanName: string;
  activePlanCode: string;
}

export const PlanOverview = () => {
  const navigate = useNavigate();
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [dataUsage, setDataUsage] = useState<DataUsageState>({
    used: 0,
    total: 15,
    percentage: 0,
    bonusUsed: 0,
    bonusTotal: 0,
    bonusPercentage: 0,
    bonusExpiration: null,
    planRenewalDate: null,
    activePlanName: "",
    activePlanCode: ""
  });

  const planData = {
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

  const sendVerificationSMS = async (phoneNumber: string, code: string) => {
    try {
      console.log(`Enviando SMS para ${phoneNumber} com o código: ${code}`);
      toast.success(`Código de verificação enviado para ${phoneNumber}`);
      return true;
    } catch (error) {
      console.error('Erro ao enviar SMS:', error);
      toast.error('Erro ao enviar código de verificação');
      return false;
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const init = async () => {
      await loadPhoneVerification();
      if (isVerified) {
        await startDataUsageMonitoring();
      }
    };

    init();

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isVerified]);

  const loadPhoneVerification = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) return;

    const { data: verification } = await supabase
      .from("phone_verifications")
      .select()
      .eq("user_id", session.session.user.id)
      .maybeSingle();

    if (verification) {
      setPhoneNumber(verification.phone_number);
      setIsVerified(verification.verified);
    }
  };

  const startDataUsageMonitoring = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) return;

    const { data: usage } = await supabase
      .from("data_usage")
      .select()
      .eq("user_id", session.session.user.id)
      .maybeSingle();

    if (!usage) {
      const { error } = await supabase
        .from("data_usage")
        .insert([{
          user_id: session.session.user.id,
          phone_number: phoneNumber,
          usage_mb: 0,
          total_package_mb: 15360, // 15GB em MB
          active_plan_name: "Controle 15GB",
          active_plan_code: "CTRL15",
          bonus_package_mb: 5120, // 5GB de bônus
          bonus_usage_mb: 0,
          bonus_expiration_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias
          plan_renewal_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 dias
        }]);

      if (error) {
        console.error('Erro ao criar registro de uso:', error);
        return;
      }
    }

    const interval = setInterval(async () => {
      const randomUsage = Math.random() * 0.1;
      
      const { data: currentUsage } = await supabase
        .from("data_usage")
        .select()
        .eq("user_id", session.session.user.id)
        .maybeSingle();

      if (currentUsage) {
        const newUsage = Number(currentUsage.usage_mb) + randomUsage;
        const percentage = (newUsage / Number(currentUsage.total_package_mb)) * 100;
        const bonusPercentage = currentUsage.bonus_package_mb > 0 
          ? (Number(currentUsage.bonus_usage_mb) / Number(currentUsage.bonus_package_mb)) * 100
          : 0;

        await supabase
          .from("data_usage")
          .update({
            usage_mb: newUsage,
            last_updated: new Date().toISOString()
          })
          .eq("user_id", session.session.user.id);

        setDataUsage({
          used: Number((newUsage / 1024).toFixed(2)),
          total: Number(currentUsage.total_package_mb) / 1024,
          percentage,
          bonusUsed: Number((Number(currentUsage.bonus_usage_mb) / 1024).toFixed(2)),
          bonusTotal: Number(currentUsage.bonus_package_mb) / 1024,
          bonusPercentage,
          bonusExpiration: currentUsage.bonus_expiration_date ? new Date(currentUsage.bonus_expiration_date) : null,
          planRenewalDate: currentUsage.plan_renewal_date ? new Date(currentUsage.plan_renewal_date) : null,
          activePlanName: currentUsage.active_plan_name || "",
          activePlanCode: currentUsage.active_plan_code || ""
        });

        if (percentage >= 100 && bonusPercentage >= 100 && !currentUsage.notification_sent) {
          toast.error("Você atingiu 100% da sua franquia de dados e do bônus!");
          await supabase
            .from("data_usage")
            .update({
              notification_sent: true
            })
            .eq("user_id", session.session.user.id);
        }
      }
    }, 5000);

    return interval;
  };

  const handlePhoneNumberSubmit = async () => {
    if (!phoneNumber.match(/^\(\d{2}\) \d{5}-\d{4}$/)) {
      toast.error("Número de telefone inválido");
      return;
    }

    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) return;

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const smsSent = await sendVerificationSMS(phoneNumber, verificationCode);
    
    if (!smsSent) {
      toast.error("Erro ao enviar SMS de verificação");
      return;
    }

    const { error } = await supabase
      .from("phone_verifications")
      .upsert({
        user_id: session.session.user.id,
        phone_number: phoneNumber,
        verification_code: verificationCode,
        verified: false
      });

    if (error) {
      toast.error("Erro ao registrar número");
      return;
    }

    setIsPhoneDialogOpen(false);
    setIsVerificationDialogOpen(true);
  };

  const handleVerificationSubmit = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) return;

    const { data: verification } = await supabase
      .from("phone_verifications")
      .select()
      .eq("user_id", session.session.user.id)
      .maybeSingle();

    if (verification?.verification_code === verificationCode) {
      await supabase
        .from("phone_verifications")
        .update({
          verified: true
        })
        .eq("user_id", session.session.user.id);

      setIsVerified(true);
      setIsVerificationDialogOpen(false);
      toast.success("Número verificado com sucesso!");
      
      startDataUsageMonitoring();
    } else {
      toast.error("Código de verificação inválido");
    }
  };

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

  const getUsageInfo = () => {
    if (dataUsage.bonusTotal > 0) {
      return (
        <>
          <div className="text-2xl font-semibold text-[#8425af]">
            {planData.internetUsage.used} GB
            <span className="text-sm text-gray-500"> + {dataUsage.bonusUsed} GB bônus</span>
          </div>
          <div className="text-sm text-gray-500">
            de {planData.internetUsage.total} GB
            {dataUsage.bonusTotal > 0 && ` + ${dataUsage.bonusTotal} GB bônus`}
          </div>
          {dataUsage.bonusExpiration && (
            <div className="text-xs text-orange-600">
              Bônus expira em {planData.internetUsage.bonusExpiration}
            </div>
          )}
        </>
      );
    }

    return (
      <>
        <div className="text-2xl font-semibold text-[#8425af]">{planData.internetUsage.used} GB</div>
        <div className="text-sm text-gray-500">de {planData.internetUsage.total} GB</div>
      </>
    );
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
                  strokeDashoffset={351.86 * (1 - dataUsage.percentage / 100)}
                />
                {dataUsage.bonusTotal > 0 && (
                  <circle
                    cx="64"
                    cy="64"
                    r="48"
                    stroke="#e5e7eb"
                    strokeWidth="4"
                    fill="none"
                  />
                )}
                {dataUsage.bonusTotal > 0 && (
                  <circle
                    cx="64"
                    cy="64"
                    r="48"
                    stroke="#ff6b6b"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="301.59"
                    strokeDashoffset={301.59 * (1 - dataUsage.bonusPercentage / 100)}
                  />
                )}
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                {getUsageInfo()}
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

      <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Digite seu número de telefone</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="(00) 00000-0000"
            value={phoneNumber}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, '');
              if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
                setPhoneNumber(value);
              }
            }}
          />
          <DialogFooter>
            <Button onClick={() => setIsPhoneDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handlePhoneNumberSubmit} className="bg-[#8425af] hover:bg-[#6c1e8f] text-white">
              Enviar código
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Digite o código de verificação</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="000000"
            value={verificationCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 6) {
                setVerificationCode(value);
              }
            }}
            maxLength={6}
          />
          <DialogFooter>
            <Button onClick={() => setIsVerificationDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleVerificationSubmit} className="bg-[#8425af] hover:bg-[#6c1e8f] text-white">
              Verificar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
