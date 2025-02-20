import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronDown, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UsageInfoDisplay } from "./components/UsageInfoDisplay";
import { DataUsageChart } from "./components/DataUsageChart";
import { PhoneLineManager } from "./components/PhoneLineManager";
import { useDataUsage } from "./hooks/useDataUsage";
import type { PlanData } from "./types/dataUsage";

export const PlanOverview = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const { dataUsage, isLoading: isUsageLoading, error: usageError } = useDataUsage();

  useEffect(() => {
    const fetchPlanData = async () => {
      setIsLoading(true);
      try {
        // Simulate fetching plan data
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPlanData({
          planName: "Plano Premium",
          price: 99.90,
          renewalDate: new Date(),
          dataLimit: 50,
          dataUsed: 25,
          voiceMinutes: "Ilimitado",
          sms: "Ilimitado",
        });
      } catch (error) {
        console.error("Failed to fetch plan data:", error);
        toast.error("Failed to load plan data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanData();
  }, []);

  const handleRenewPlan = () => {
    toast.success("Plano renovado com sucesso!");
  };

  const handleUpgradePlan = () => {
    navigate("/client/upgrade");
  };

  return (
    <>
      <Card className="overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Visão Geral do Plano</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  Menos detalhes <ChevronDown className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Mais detalhes <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center">
              <RefreshCw className="inline-block h-6 w-6 animate-spin mb-2" />
              <p>Carregando informações do plano...</p>
            </div>
          ) : planData ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium">
                    {planData.planName}
                  </h3>
                  <p className="text-gray-500">
                    Próxima renovação:{" "}
                    {planData.renewalDate.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <h4 className="text-2xl font-bold">
                    {formatCurrency(planData.price)}
                  </h4>
                  <Button size="sm" onClick={handleRenewPlan}>
                    Renovar Plano
                  </Button>
                </div>
              </div>

              <DataUsageChart dataUsage={dataUsage} />

              <div className="mt-4">
                <UsageInfoDisplay
                  label="Dados"
                  used={planData.dataUsed}
                  limit={planData.dataLimit}
                  unit="GB"
                />
                <UsageInfoDisplay
                  label="Minutos de Voz"
                  used={0}
                  limit={planData.voiceMinutes === "Ilimitado" ? Infinity : 0}
                  unit=""
                  isUnlimited={planData.voiceMinutes === "Ilimitado"}
                />
                <UsageInfoDisplay
                  label="SMS"
                  used={0}
                  limit={planData.sms === "Ilimitado" ? Infinity : 0}
                  unit=""
                  isUnlimited={planData.sms === "Ilimitado"}
                />
              </div>

              {isExpanded && (
                <div className="mt-6 border-t pt-4">
                  <h4 className="text-lg font-medium mb-2">
                    Detalhes Adicionais
                  </h4>
                  <p className="text-gray-600">
                    Aqui estão alguns detalhes adicionais sobre o seu plano atual.
                  </p>
                  <Button
                    className="mt-4 bg-[#8425af] hover:bg-[#6c1e8f] text-white"
                    onClick={handleUpgradePlan}
                  >
                    Fazer Upgrade do Plano
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <p>
                Não foi possível carregar as informações do seu plano. Por favor,
                tente novamente mais tarde.
              </p>
            </div>
          )}
        </div>
      </Card>
      
      <PhoneLineManager />
    </>
  );
};
