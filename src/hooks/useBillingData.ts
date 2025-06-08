
import { useState, useEffect } from "react";
import { BillingStatusMap } from "./billing/types";
import { INITIAL_BILLING_STATUS } from "./billing/billingConstants";
import { fetchBillingData } from "./billing/dataFetcher";
import { processClientData } from "./billing/dataProcessor";

// Re-export types for backward compatibility
export type { Client, BillingStatus } from "./billing/types";

export function useBillingData() {
  const [billingStatus, setBillingStatus] = useState<BillingStatusMap>(INITIAL_BILLING_STATUS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔄 useBillingData: useEffect executado');
    handleFetchBillingData();
  }, []);

  const handleFetchBillingData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { profiles, phoneLines, commissions } = await fetchBillingData();

      // Processar dados para criar a estrutura de billing status
      const processedData = processClientData(profiles, phoneLines, commissions);
      console.log('⚙️ useBillingData: Processed data:', processedData);
      
      // Manter os valores fixos mas atualizar contadores de clientes
      setBillingStatus(prev => {
        const newStatus = {
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
        };
        console.log('🔄 useBillingData: Setting new billing status:', newStatus);
        return newStatus;
      });

    } catch (err) {
      console.error('❌ useBillingData: Erro ao buscar dados de cobrança:', err);
      setError('Erro ao carregar dados de cobrança');
    } finally {
      setLoading(false);
      console.log('✅ useBillingData: fetchBillingData concluído');
    }
  };

  console.log('📋 useBillingData: Hook retornando:', {
    billingStatus: Object.keys(billingStatus).reduce((acc, key) => {
      acc[key] = {
        amount: billingStatus[key].amount,
        clients: billingStatus[key].clients,
        bills: billingStatus[key].bills
      };
      return acc;
    }, {} as any),
    loading,
    error
  });

  return {
    billingStatus,
    loading,
    error,
    refetch: handleFetchBillingData
  };
}
