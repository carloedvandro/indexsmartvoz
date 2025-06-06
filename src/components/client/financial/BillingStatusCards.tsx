
import { useState, useEffect } from "react";
import { ClientsModal } from "./ClientsModal";
import { useBillingData } from "@/hooks/useBillingData";
import { ProgressBarTooltip } from "./ProgressBarTooltip";
import { BillingStatusCard } from "./BillingStatusCard";
import { ReceiptCalendar } from "./ReceiptCalendar";

export function BillingStatusCards() {
  const { billingStatus, loading, error, refetch } = useBillingData();

  useEffect(() => {
    console.log('🎨 BillingStatusCards: Component mounted/updated');
    console.log('📊 BillingStatusCards: billingStatus recebido:', billingStatus);
    console.log('⏳ BillingStatusCards: loading:', loading);
    console.log('❌ BillingStatusCards: error:', error);
  }, [billingStatus, loading, error]);

  const [tooltipState, setTooltipState] = useState<{
    visible: boolean;
    position: { x: number; y: number };
    value: number;
    paymentMethod: 'pix' | 'boleto';
  }>({
    visible: false,
    position: { x: 0, y: 0 },
    value: 0,
    paymentMethod: 'pix'
  });

  const [clientsModal, setClientsModal] = useState<{
    isOpen: boolean;
    title: string;
    clients: any[];
  }>({
    isOpen: false,
    title: "",
    clients: []
  });

  const handleClientsClick = (type: string) => {
    const statusData = billingStatus[type as keyof typeof billingStatus];
    setClientsModal({
      isOpen: true,
      title: `Clientes - ${type === 'received' ? 'Recebidas' :
        type === 'confirmed' ? 'Confirmadas' :
          type === 'awaiting' ? 'Aguardando pagamento' : 'Vencidas'}`,
      clients: statusData.clientsData
    });
  };

  const handleProgressBarHover = (event: React.MouseEvent, amount: number, status: string, enter: boolean) => {
    if (enter) {
      const rect = event.currentTarget.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const progressWidth = rect.width;

      // Dividir a barra em duas partes: 60% Pix (esquerda) e 40% Boleto (direita)
      const pixWidth = progressWidth * 0.6;
      const isPixArea = mouseX <= pixWidth;

      const paymentMethod: 'pix' | 'boleto' = isPixArea ? 'pix' : 'boleto';
      const value = isPixArea ? amount * 0.6 : amount * 0.4; // 60% Pix, 40% Boleto

      setTooltipState({
        visible: true,
        position: {
          x: rect.left + mouseX,
          y: rect.top
        },
        value,
        paymentMethod
      });
    } else {
      setTooltipState(prev => ({ ...prev, visible: false }));
    }
  };

  // Configurações das cores para cada tipo de card
  const cardConfigs = {
    received: {
      title: "Recebidas",
      barColors: {
        primary: "bg-green-500", // Tom mais escuro para Pix
        secondary: "bg-green-300" // Tom mais claro para Boleto
      }
    },
    confirmed: {
      title: "Confirmadas", 
      barColors: {
        primary: "bg-blue-600", // Tom mais escuro para Pix
        secondary: "bg-blue-300" // Tom mais claro para Boleto
      }
    },
    awaiting: {
      title: "Aguardando pagamento",
      barColors: {
        primary: "bg-orange-600", // Tom mais escuro para Pix
        secondary: "bg-orange-300" // Tom mais claro para Boleto
      }
    },
    overdue: {
      title: "Vencidas",
      barColors: {
        primary: "bg-red-600", // Tom mais escuro para Pix
        secondary: "bg-red-300" // Tom mais claro para Boleto
      }
    }
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

      <div className="flex items-center justify-between mb-6 flex-col md:flex-row lg:flex-row">
        <h2 className="text-xl font-semibold text-gray-800">Situação das cobranças</h2>
        <div className="flex gap-2 w-full md:w-[20vw]">
          <button className="gap-2 px-4 py-2 border border-gray-300 w-full rounded-lg hover:bg-gray-50" style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center"
          }}>
            <span className="text-blue-600">Este mês</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
              <line x1="16" x2="16" y1="2" y2="6"></line>
              <line x1="8" x2="8" y1="2" y2="6"></line>
              <line x1="3" x2="21" y1="10" y2="10"></line>
            </svg>
          </button>
          <button style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center"
          }} className="gap-2 px-4 py-2 border border-gray-300 w-full rounded-lg hover:bg-gray-50">
            <span className="text-blue-600">Filtros</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
        </div>
      </div>

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
        onOpenChange={(open) => setClientsModal(prev => ({ ...prev, isOpen: open }))}
        title={clientsModal.title}
        clients={clientsModal.clients}
      />
    </div>
  );
}
