
import { useEffect } from "react";
import { ClientsModal } from "./ClientsModal";
import { useBillingData } from "@/hooks/useBillingData";
import { ProgressBarTooltip } from "./ProgressBarTooltip";
import { BillingStatusFilters } from "./BillingStatusFilters";
import { BillingStatusCardsGrid } from "./BillingStatusCardsGrid";
import { useTooltipState } from "@/hooks/useTooltipState";
import { useClientsModal } from "@/hooks/useClientsModal";

export function BillingStatusCards() {
  const { billingStatus, loading, error, refetch } = useBillingData();
  const { tooltipState, handleProgressBarHover } = useTooltipState();
  const { clientsModal, handleClientsClick, closeModal } = useClientsModal();

  useEffect(() => {
    console.log('🎨 BillingStatusCards: Component mounted/updated');
    console.log('📊 BillingStatusCards: billingStatus recebido:', billingStatus);
    console.log('⏳ BillingStatusCards: loading:', loading);
    console.log('❌ BillingStatusCards: error:', error);
  }, [billingStatus, loading, error]);

  const handleCardClientsClick = (type: string) => {
    handleClientsClick(type, billingStatus);
  };

  if (loading) {
    console.log('⏳ BillingStatusCards: Mostrando loading state');
    return (
      <div className="container">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Carregando dados...</span>
        </div>
      </div>
    );
  }

  if (error) {
    console.log('❌ BillingStatusCards: Mostrando error state:', error);
    return (
      <div className="container">
        <div className="flex items-center justify-center py-8">
          <div className="text-red-600">
            {error}
            <button
              onClick={refetch}
              className="ml-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
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

      <BillingStatusFilters />

      <BillingStatusCardsGrid
        billingStatus={billingStatus}
        onClientsClick={handleCardClientsClick}
        onProgressBarHover={handleProgressBarHover}
      />

      <ClientsModal
        isOpen={clientsModal.isOpen}
        onOpenChange={closeModal}
        title={clientsModal.title}
        clients={clientsModal.clients}
      />
    </div>
  );
}
