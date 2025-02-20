
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { UsageChart } from "./components/UsageChart";
import { VerificationDialogs } from "./components/VerificationDialogs";
import { useDataUsage } from "./hooks/useDataUsage";
import { usePhoneVerification } from "./hooks/usePhoneVerification";
import { PlanData } from "./types/dataUsage";
import { useSession } from "@/hooks/useSession";
import { PlanHeader } from "./components/PlanHeader";
import { ActionButtons } from "./components/ActionButtons";
import { BillingSection } from "./components/BillingSection";
import { UsageInfo } from "./components/UsageInfo";

export const PlanOverview = () => {
  const navigate = useNavigate();
  const { getSession } = useSession();
  const [userId, setUserId] = useState<string | null>(null);

  const {
    isPhoneDialogOpen,
    setIsPhoneDialogOpen,
    isVerificationDialogOpen,
    setIsVerificationDialogOpen,
    phoneNumber,
    setPhoneNumber,
    verificationCode,
    setVerificationCode,
    isVerified,
    loadPhoneVerification,
    handlePhoneNumberSubmit,
    handleVerificationSubmit
  } = usePhoneVerification(async () => {
    const session = await getSession();
    if (session?.user) {
      refreshData();
    }
  });

  useEffect(() => {
    const initSession = async () => {
      const session = await getSession();
      if (session?.user) {
        setUserId(session.user.id);
      }
    };
    initSession();
  }, [getSession]);

  const { dataUsage, refreshData } = useDataUsage(userId, isVerified);

  useEffect(() => {
    loadPhoneVerification();
  }, []);

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
        <PlanHeader
          planType={planData.type}
          planCode={planData.code}
          phoneNumber={planData.number}
          onRefresh={refreshData}
          onNumberClick={handleNumberClick}
        />

        <div className="p-4">
          <UsageChart 
            dataUsage={dataUsage} 
            getUsageInfo={() => (
              <UsageInfo
                used={dataUsage.used}
                total={dataUsage.total}
                bonusUsed={dataUsage.bonusUsed}
                bonusTotal={dataUsage.bonusTotal}
                bonusExpiration={dataUsage.bonusExpiration}
              />
            )}
          />
          
          <p className="text-gray-600 mt-2 text-center">
            Internet pra usar como quiser
          </p>
          <p className="text-sm text-gray-500 text-center">
            Renova em {planData.internetUsage.renewalDate}
          </p>

          <ActionButtons
            onPlanDetails={handlePlanDetails}
            onChangePlan={handleChangePlan}
            onAdditionalPackages={handleAdditionalPackages}
          />

          <BillingSection
            amount={planData.billing.amount}
            dueDate={planData.billing.dueDate}
            status={planData.billing.status}
            onPayNow={handlePayNow}
            onViewBills={handleViewBills}
          />
        </div>
      </Card>

      <VerificationDialogs
        isPhoneDialogOpen={isPhoneDialogOpen}
        setIsPhoneDialogOpen={setIsPhoneDialogOpen}
        isVerificationDialogOpen={isVerificationDialogOpen}
        setIsVerificationDialogOpen={setIsVerificationDialogOpen}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        handlePhoneNumberSubmit={handlePhoneNumberSubmit}
        handleVerificationSubmit={handleVerificationSubmit}
      />
    </>
  );
};
