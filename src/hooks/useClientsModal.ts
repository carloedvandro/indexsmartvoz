
import { useState } from "react";

interface ClientsModalState {
  isOpen: boolean;
  title: string;
  clients: any[];
}

export function useClientsModal() {
  const [clientsModal, setClientsModal] = useState<ClientsModalState>({
    isOpen: false,
    title: "",
    clients: []
  });

  const handleClientsClick = (type: string, billingStatus: any) => {
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
