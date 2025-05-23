import { Info, User, FileText } from "lucide-react";
import { useState } from "react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ClientsModal } from "./ClientsModal";
import { useBillingData } from "@/hooks/useBillingData";

export function BillingStatusCards() {
  const { billingStatus, loading, error, refetch } = useBillingData();

  const formatCurrencyBR = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const [openPopover, setOpenPopover] = useState<string | null>(null);
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
        {/* Received/Recebidas */}
        <div className="border rounded-xl card-no-bg">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium text-gray-800">Recebidas</h3>
            <Popover open={openPopover === 'received'} onOpenChange={(open) => setOpenPopover(open ? 'received' : null)}>
              <PopoverTrigger asChild>
                <button className="text-gray-400 focus:outline-none" data-testid="info-received">
                  <Info size={18} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="bg-white p-4 shadow-lg rounded-md">
                {billingStatus.received.tooltip}
                <button 
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setOpenPopover(null)}
                >
                  ✕
                </button>
              </PopoverContent>
            </Popover>
          </div>
          <p className={`text-2xl font-semibold ${billingStatus.received.color} mb-1`}>{formatCurrencyBR(billingStatus.received.amount)}</p>
          <p className="text-sm text-gray-600 mb-4">{formatCurrencyBR(billingStatus.received.liquid)} líquido</p>
          
          <div className="w-full h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
            <div className={`h-full ${billingStatus.received.progressColor} rounded-full`} style={{ width: '100%' }}></div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div 
              className="flex items-center text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              onClick={() => handleClientsClick('received')}
            >
              <User size={16} className="mr-2" />
              <span>{billingStatus.received.clients} {billingStatus.received.clients === 1 ? 'cliente' : 'clientes'}</span>
              <span className="ml-auto text-[#27ae60]">&#8250;</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <FileText size={16} className="mr-2" />
              <span>{billingStatus.received.bills} {billingStatus.received.bills === 1 ? 'cobrança' : 'cobranças'}</span>
              <span className="ml-auto text-[#27ae60]">&#8250;</span>
            </div>
          </div>
        </div>

        {/* Confirmed/Confirmadas */}
        <div className=" border rounded-xl card-no-bg">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium text-gray-800">Confirmadas</h3>
            <Popover open={openPopover === 'confirmed'} onOpenChange={(open) => setOpenPopover(open ? 'confirmed' : null)}>
              <PopoverTrigger asChild>
                <button className="text-gray-400 focus:outline-none" data-testid="info-confirmed">
                  <Info size={18} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="bg-white p-4 shadow-lg rounded-md">
                {billingStatus.confirmed.tooltip}
                <button 
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setOpenPopover(null)}
                >
                  ✕
                </button>
              </PopoverContent>
            </Popover>
          </div>
          <p className={`text-2xl font-semibold ${billingStatus.confirmed.color} mb-1`}>{formatCurrencyBR(billingStatus.confirmed.amount)}</p>
          <p className="text-sm text-gray-600 mb-4">{formatCurrencyBR(billingStatus.confirmed.liquid)} líquido</p>
          
          <div className="w-full h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
            <div className={`h-full ${billingStatus.confirmed.progressColor} rounded-full`} style={{ width: '100%' }}></div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div 
              className="flex items-center text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              onClick={() => handleClientsClick('confirmed')}
            >
              <User size={16} className="mr-2" />
              <span>{billingStatus.confirmed.clients} {billingStatus.confirmed.clients === 1 ? 'cliente' : 'clientes'}</span>
              <span className="ml-auto text-[#3498db]">&#8250;</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <FileText size={16} className="mr-2" />
              <span>{billingStatus.confirmed.bills} {billingStatus.confirmed.bills === 1 ? 'cobrança' : 'cobranças'}</span>
              <span className="ml-auto text-[#3498db]">&#8250;</span>
            </div>
          </div>
        </div>

        {/* Awaiting Payment/Aguardando pagamento */}
        <div className=" border rounded-xl card-no-bg">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium text-gray-800">Aguardando pagamento</h3>
            <Popover open={openPopover === 'awaiting'} onOpenChange={(open) => setOpenPopover(open ? 'awaiting' : null)}>
              <PopoverTrigger asChild>
                <button className="text-gray-400 focus:outline-none" data-testid="info-awaiting">
                  <Info size={18} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="bg-white p-4 shadow-lg rounded-md">
                {billingStatus.awaiting.tooltip}
                <button 
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setOpenPopover(null)}
                >
                  ✕
                </button>
              </PopoverContent>
            </Popover>
          </div>
          <p className={`text-2xl font-semibold ${billingStatus.awaiting.color} mb-1`}>{formatCurrencyBR(billingStatus.awaiting.amount)}</p>
          <p className="text-sm text-gray-600 mb-4">{formatCurrencyBR(billingStatus.awaiting.liquid)} líquido</p>
          
          <div className="w-full h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
            <div className={`h-full ${billingStatus.awaiting.progressColor} rounded-full`} style={{ width: '100%' }}></div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div 
              className="flex items-center text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              onClick={() => handleClientsClick('awaiting')}
            >
              <User size={16} className="mr-2" />
              <span>{billingStatus.awaiting.clients} {billingStatus.awaiting.clients === 1 ? 'cliente' : 'clientes'}</span>
              <span className="ml-auto text-[#f39c12]">&#8250;</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <FileText size={16} className="mr-2" />
              <span>{billingStatus.awaiting.bills} {billingStatus.awaiting.bills === 1 ? 'cobrança' : 'cobranças'}</span>
              <span className="ml-auto text-[#f39c12]">&#8250;</span>
            </div>
          </div>
        </div>

        {/* Overdue/Vencidas */}
        <div className=" border rounded-xl card-no-bg">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium text-gray-800">Vencidas</h3>
            <Popover open={openPopover === 'overdue'} onOpenChange={(open) => setOpenPopover(open ? 'overdue' : null)}>
              <PopoverTrigger asChild>
                <button className="text-gray-400 focus:outline-none" data-testid="info-overdue">
                  <Info size={18} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="bg-white p-4 shadow-lg rounded-md">
                {billingStatus.overdue.tooltip}
                <button 
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setOpenPopover(null)}
                >
                  ✕
                </button>
              </PopoverContent>
            </Popover>
          </div>
          <p className={`text-2xl font-semibold ${billingStatus.overdue.color} mb-1`}>{formatCurrencyBR(billingStatus.overdue.amount)}</p>
          <p className="text-sm text-gray-600 mb-4">{formatCurrencyBR(billingStatus.overdue.liquid)} líquido</p>
          
          <div className="w-full h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
            <div className={`h-full ${billingStatus.overdue.progressColor} rounded-full`} style={{ width: '100%' }}></div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div 
              className="flex items-center text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              onClick={() => handleClientsClick('overdue')}
            >
              <User size={16} className="mr-2" />
              <span>{billingStatus.overdue.clients} {billingStatus.overdue.clients === 1 ? 'cliente' : 'clientes'}</span>
              <span className="ml-auto text-[#e74c3c]">&#8250;</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <FileText size={16} className="mr-2" />
              <span>{billingStatus.overdue.bills} {billingStatus.overdue.bills === 1 ? 'cobrança' : 'cobranças'}</span>
              <span className="ml-auto text-[#e74c3c]">&#8250;</span>
            </div>
          </div>
        </div>
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
