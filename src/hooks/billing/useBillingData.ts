import { useState, useEffect } from "react";
import { BillingStatusRecord } from './types';
import { getDefaultBillingStatus } from './billingDefaults';
import { billingService } from './billingService';
import { processClientData } from './billingUtils';

export function useBillingData() {
  const [billingStatus, setBillingStatus] = useState<BillingStatusRecord>(getDefaultBillingStatus());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔄 useBillingData: useEffect executed');
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      console.log('📊 useBillingData: Starting fetchBillingData');
      setLoading(true);
      setError(null);

      const [profiles, phoneLines, commissions] = await Promise.all([
        billingService.fetchProfiles(),
        billingService.fetchPhoneLines(),
        billingService.fetchCommissions()
      ]);

      const processedData = processClientData(profiles, phoneLines, commissions);
      console.log('⚙️ useBillingData: Processed data:', processedData);
      
      // Update billing status with processed data while keeping fixed amounts
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
      console.error('❌ useBillingData: Error fetching billing data:', err);
      setError('Erro ao carregar dados de cobrança');
    } finally {
      setLoading(false);
      console.log('✅ useBillingData: fetchBillingData completed');
    }
  };

  console.log('📋 useBillingData: Hook returning:', {
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
    refetch: fetchBillingData
  };
}
