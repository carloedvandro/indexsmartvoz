
import { useState, useEffect } from "react";
import { BillingStatus } from "./useBillingData/types";
import { initialBillingStatus } from "./useBillingData/billingConfig";
import { processClientData } from "./useBillingData/dataProcessor";
import { fetchBillingApiData } from "./useBillingData/apiService";

export type { Client, BillingStatus } from "./useBillingData/types";

export function useBillingData() {
  const [billingStatus, setBillingStatus] = useState<Record<string, BillingStatus>>(initialBillingStatus);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { profiles, phoneLines, commissions } = await fetchBillingApiData();
      
      // Processar dados para criar a estrutura de billing status
      const processedData = processClientData(profiles, phoneLines, commissions);
      setBillingStatus(prev => ({
        received: {
          ...prev.received,
          clients: processedData.received.clients,
          bills: processedData.received.bills,
          clientsData: processedData.received.clientsData
        },
        confirmed: {
          ...prev.confirmed,
          clients: processedData.confirmed.clients,
          bills: processedData.confirmed.bills,
          clientsData: processedData.confirmed.clientsData
        },
        awaiting: {
          ...prev.awaiting,
          clients: processedData.awaiting.clients,
          bills: processedData.awaiting.bills,
          clientsData: processedData.awaiting.clientsData
        },
        overdue: {
          ...prev.overdue,
          clients: processedData.overdue.clients,
          bills: processedData.overdue.bills,
          clientsData: processedData.overdue.clientsData
        }
      }));

    } catch (err) {
      console.error('Erro ao buscar dados de cobrança:', err);
      setError('Erro ao carregar dados de cobrança');
    } finally {
      setLoading(false);
    }
  };

  return {
    billingStatus,
    loading,
    error,
    refetch: fetchBillingData
  };
}
