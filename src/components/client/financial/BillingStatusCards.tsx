
import { useEffect } from "react";
import { useBillingData } from "@/hooks/useBillingData";
import { useProgressBarTooltip } from "./hooks/useProgressBarTooltip";
import { useClientsModal } from "./hooks/useClientsModal";
import { cardConfigs } from "./config/cardConfigs";
import { BillingStatusHeader } from "./BillingStatusHeader";
import { BillingStatusLoading } from "./BillingStatusLoading";
import { BillingStatusError } from "./BillingStatusError";
import { ClientsModal } from "./ClientsModal";
import { ProgressBarTooltip } from "./ProgressBarTooltip";
import { BillingStatusCard } from "./BillingStatusCard";
import { ReceiptCalendar } from "./ReceiptCalendar";

export function BillingStatusCards() {
  const { billingStatus, loading, error, refetch } = useBillingData();
  const { tooltipState, handleProgressBarHover } = useProgressBarTooltip();
  const { clientsModal, handleClientsClick, closeModal } = useClientsModal(billingStatus);

  useEffect(() => {
    console.log('🎨 BillingStatusCards: Component mounted/updated');
    console.log('📊 BillingStatusCards: billingStatus recebido:', billingStatus);
    console.log('⏳ BillingStatusCards: loading:', loading);
    console.log('❌ BillingStatusCards: error:', error);
  }, [billingStatus, loading, error]);

  if (loading) {
    console.log('⏳ BillingStatusCards: Mostrando loading state');
    return <BillingStatusLoading />;
  }

  if (error) {
    console.log('❌ BillingStatusCards: Mostrando error state:', error);
    return <BillingStatusError error={error} onRetry={refetch} />;
  }

  console.log('🎨 BillingStatusCards: Renderizando cards com dados:', {
    received: {
      amount: billingStatus.received?.amount,
      clients: billingStatus.received?.clients,
      bills: billingStatus.received?.bills
    }
  });

  return (
    <div className="container">
      <ProgressBarTooltip {...tooltipState} />
      
      <BillingStatusHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(cardConfigs).map(([key, config]) => {
          const statusData = billingStatus[key as keyof typeof billingStatus];
          return (
            <BillingStatusCard
              key={key}
              title={config.title}
              amountA={statusData.amount+10}
              amountB={statusData.amount + 5}
              liquid={statusData.liquid}
              clients={statusData.clients}
              bills={statusData.bills}
              color={statusData.color}
              tooltip={statusData.tooltip}
              clientsData={statusData.clientsData}
              onClientsClick={() => handleClientsClick(key)}
              onProgressBarHover={handleProgressBarHover}
              barColors={config.barColors}
              cardType={key as 'received' | 'confirmed' | 'awaiting' | 'overdue'}
            />
          );
        })}
      </div>

      <div className="mt-8">
        <ReceiptCalendar />
      </div>

      <ClientsModal
        isOpen={clientsModal.isOpen}
        onOpenChange={closeModal}
        title={clientsModal.title}
        clients={clientsModal.clients}
      />
    </div>
  );
}
