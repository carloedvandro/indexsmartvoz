import { Info, User, FileText } from "lucide-react";
import { useState } from "react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ClientsModal } from "./ClientsModal";
import { useBillingData } from "@/hooks/useBillingData";
import { ProgressBarTooltip } from "./ProgressBarTooltip";

export function BillingStatusCards() {
  const { billingStatus, loading, error, refetch } = useBillingData();

  const formatCurrencyBR = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const [openPopover, setOpenPopover] = useState<string | null>(null);
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
      <ProgressBarTooltip {...tooltipState} />
      
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
        {/* Received/Recebidas - Barra verde listrada */}
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
          
          <div className="my-6">
            <div 
              className="w-full h-3 bg-gray-100 rounded-md mb-4 overflow-hidden cursor-pointer relative"
              onMouseMove={(e) => handleProgressBarHover(e, billingStatus.received.amount, 'received', true)}
              onMouseLeave={(e) => handleProgressBarHover(e, billingStatus.received.amount, 'received', false)}
              style={{
                background: 'repeating-linear-gradient(45deg, #d1f2eb, #d1f2eb 8px, #a7e6d7 8px, #a7e6d7 16px)'
              }}
            >
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div 
              className="flex items-center text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              onClick={() => handleClientsClick('received')}
            >
              <User size={16} className="mr-2 text-[#27ae60]" />
              <span>{billingStatus.received.clients} {billingStatus.received.clients === 1 ? 'cliente' : 'clientes'}</span>
              <span className="ml-auto text-[#27ae60]">&#8250;</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <FileText size={16} className="mr-2 text-[#27ae60]" />
              <span>{billingStatus.received.bills} {billingStatus.received.bills === 1 ? 'cobrança' : 'cobranças'}</span>
              <span className="ml-auto text-[#27ae60]">&#8250;</span>
            </div>
          </div>
        </div>

        {/* Confirmed/Confirmadas - Barra azul listrada */}
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
          
          <div className="my-6">
            <div 
              className="w-full h-3 bg-gray-100 rounded-md mb-4 overflow-hidden cursor-pointer relative"
              onMouseMove={(e) => handleProgressBarHover(e, billingStatus.confirmed.amount, 'confirmed', true)}
              onMouseLeave={(e) => handleProgressBarHover(e, billingStatus.confirmed.amount, 'confirmed', false)}
              style={{
                background: 'repeating-linear-gradient(45deg, #cce7ff, #cce7ff 8px, #99d3ff 8px, #99d3ff 16px)'
              }}
            >
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div 
              className="flex items-center text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              onClick={() => handleClientsClick('confirmed')}
            >
              <User size={16} className="mr-2 text-[#3498db]" />
              <span>{billingStatus.confirmed.clients} {billingStatus.confirmed.clients === 1 ? 'cliente' : 'clientes'}</span>
              <span className="ml-auto text-[#3498db]">&#8250;</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <FileText size={16} className="mr-2 text-[#3498db]" />
              <span>{billingStatus.confirmed.bills} {billingStatus.confirmed.bills === 1 ? 'cobrança' : 'cobranças'}</span>
              <span className="ml-auto text-[#3498db]">&#8250;</span>
            </div>
          </div>
        </div>

        {/* Awaiting Payment/Aguardando pagamento - Barra laranja sólida */}
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
          
          <div className="my-6">
            <div 
              className="w-full h-3 bg-gray-100 rounded-md mb-4 overflow-hidden cursor-pointer relative"
              onMouseMove={(e) => handleProgressBarHover(e, billingStatus.awaiting.amount, 'awaiting', true)}
              onMouseLeave={(e) => handleProgressBarHover(e, billingStatus.awaiting.amount, 'awaiting', false)}
            >
              <div className="h-full rounded-md transition-all duration-200 bg-[#f39c12]"></div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div 
              className="flex items-center text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              onClick={() => handleClientsClick('awaiting')}
            >
              <User size={16} className="mr-2 text-[#f39c12]" />
              <span>{billingStatus.awaiting.clients} {billingStatus.awaiting.clients === 1 ? 'cliente' : 'clientes'}</span>
              <span className="ml-auto text-[#f39c12]">&#8250;</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <FileText size={16} className="mr-2 text-[#f39c12]" />
              <span>{billingStatus.awaiting.bills} {billingStatus.awaiting.bills === 1 ? 'cobrança' : 'cobranças'}</span>
              <span className="ml-auto text-[#f39c12]">&#8250;</span>
            </div>
          </div>
        </div>

        {/* Overdue/Vencidas - Barra vermelha listrada */}
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
          
          <div className="my-6">
            <div 
              className="w-full h-3 bg-gray-100 rounded-md mb-4 overflow-hidden cursor-pointer relative"
              onMouseMove={(e) => handleProgressBarHover(e, billingStatus.overdue.amount, 'overdue', true)}
              onMouseLeave={(e) => handleProgressBarHover(e, billingStatus.overdue.amount, 'overdue', false)}
              style={{
                background: 'repeating-linear-gradient(45deg, #ffcccc, #ffcccc 8px, #ff9999 8px, #ff9999 16px)'
              }}
            >
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div 
              className="flex items-center text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              onClick={() => handleClientsClick('overdue')}
            >
              <User size={16} className="mr-2 text-[#e74c3c]" />
              <span>{billingStatus.overdue.clients} {billingStatus.overdue.clients === 1 ? 'cliente' : 'clientes'}</span>
              <span className="ml-auto text-[#e74c3c]">&#8250;</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <FileText size={16} className="mr-2 text-[#e74c3c]" />
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
