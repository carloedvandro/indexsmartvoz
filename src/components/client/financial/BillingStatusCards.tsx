
import { useState } from "react";
import { useBillingData } from "@/hooks/useBillingData";
import { BillingCard } from "./BillingCard";
import { BillingDetailsTable } from "./BillingDetailsTable";

export function BillingStatusCards() {
  const { billingStatus, loading, error, refetch } = useBillingData();
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [detailsTable, setDetailsTable] = useState<{
    isOpen: boolean;
    title: string;
    clients: any[];
  }>({
    isOpen: false,
    title: "",
    clients: []
  });

  const handleCardClick = (type: string) => {
    const statusData = billingStatus[type as keyof typeof billingStatus];
    const titles = {
      'received': 'Recebidas',
      'confirmed': 'Confirmadas', 
      'awaiting': 'Aguardando pagamento',
      'overdue': 'Vencidas'
    };
    
    setDetailsTable({
      isOpen: true,
      title: titles[type as keyof typeof titles] || 'Cobranças',
      clients: statusData.clientsData
    });
  };

  if (loading) {
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

  const cardConfigs = [
    { key: 'received', title: 'Recebidas' },
    { key: 'confirmed', title: 'Confirmadas' },
    { key: 'awaiting', title: 'Aguardando pagamento' },
    { key: 'overdue', title: 'Vencidas' }
  ];

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Situação das cobranças</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <span className="text-blue-600">Este mês</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
              <line x1="16" x2="16" y1="2" y2="6"></line>
              <line x1="8" x2="8" y1="2" y2="6"></line>
              <line x1="3" x2="21" y1="10" y2="10"></line>
            </svg>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <span className="text-blue-600">Filtros</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cardConfigs.map((config) => (
          <div key={config.key} onClick={() => handleCardClick(config.key)} className="cursor-pointer">
            <BillingCard
              title={config.title}
              status={billingStatus[config.key as keyof typeof billingStatus]}
              statusKey={config.key}
              openPopover={openPopover}
              setOpenPopover={setOpenPopover}
              onClientsClick={() => handleCardClick(config.key)}
            />
          </div>
        ))}
      </div>

      <BillingDetailsTable
        isOpen={detailsTable.isOpen}
        onClose={() => setDetailsTable(prev => ({ ...prev, isOpen: false }))}
        title={detailsTable.title}
        clients={detailsTable.clients}
      />
    </div>
  );
}
