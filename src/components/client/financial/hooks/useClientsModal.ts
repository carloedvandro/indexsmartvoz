
import { useState } from "react";

export function useClientsModal(billingStatus: any) {
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

  const closeModal = () => {
    setClientsModal(prev => ({ ...prev, isOpen: false }));
  };

  return {
    clientsModal,
    handleClientsClick,
    closeModal
  };
}
