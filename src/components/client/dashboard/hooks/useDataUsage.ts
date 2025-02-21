
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { DataUsageState } from '../types/dataUsage';
import { toast } from "sonner";

export const useDataUsage = (userId: string | undefined, isVerified: boolean) => {
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

  const loadDataUsage = async (userId: string) => {
    console.log("Carregando dados de uso para usuário:", userId);
    const { data: usage, error } = await supabase
      .from("data_usage")
      .select()
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Erro ao carregar dados de uso:", error);
      return;
    }

    if (usage) {
      console.log("Dados de uso encontrados:", usage);
      setDataUsage({
        used: Number((Number(usage.usage_mb) / 1024).toFixed(2)),
        total: Number(usage.total_package_mb) / 1024,
        percentage: (Number(usage.usage_mb) / Number(usage.total_package_mb)) * 100,
        bonusUsed: Number((Number(usage.bonus_usage_mb) / 1024).toFixed(2)),
        bonusTotal: Number(usage.bonus_package_mb) / 1024,
        bonusPercentage: usage.bonus_package_mb > 0 
          ? (Number(usage.bonus_usage_mb) / Number(usage.bonus_package_mb)) * 100 
          : 0,
        bonusExpiration: usage.bonus_expiration_date ? new Date(usage.bonus_expiration_date) : null,
        planRenewalDate: usage.plan_renewal_date ? new Date(usage.plan_renewal_date) : null,
        activePlanName: usage.active_plan_name || "",
        activePlanCode: usage.active_plan_code || ""
      });
    } else {
      console.log("Nenhum dado de uso encontrado para o usuário");
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isVerified && userId) {
      console.log("Iniciando monitoramento de uso");
      loadDataUsage(userId);

      interval = setInterval(() => {
        loadDataUsage(userId);
      }, 5000);
    }

    return () => {
      if (interval) {
        console.log("Limpando intervalo de monitoramento");
        clearInterval(interval);
      }
    };
  }, [isVerified, userId]);

  const refreshData = async () => {
    if (userId) {
      await loadDataUsage(userId);
      toast.success("Dados atualizados!");
    }
  };

  return { dataUsage, refreshData };
};
