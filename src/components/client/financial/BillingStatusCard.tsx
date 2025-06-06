
import { Info, User, FileText } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

interface BillingStatusCardProps {
  title: string;
  amount: number;
  liquid: number;
  clients: number;
  bills: number;
  color: string;
  tooltip: string;
  clientsData: any[];
  onClientsClick: () => void;
  onProgressBarHover: (event: React.MouseEvent, amount: number, status: string, enter: boolean) => void;
  barColors: {
    primary: string;
    secondary: string;
  };
  cardType: 'received' | 'confirmed' | 'awaiting' | 'overdue';
}

export function BillingStatusCard({
  title,
  amount,
  liquid,
  clients,
  bills,
  color,
  tooltip,
  clientsData,
  onClientsClick,
  onProgressBarHover,
  barColors,
  cardType
}: BillingStatusCardProps) {
  const [openPopover, setOpenPopover] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<'pix' | 'boleto' | null>(null);

  const formatCurrencyBR = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Valores para a barra de progresso (60% Pix, 40% Boleto)
  const valorA = amount * 0.6; // Pix
  const valorB = amount * 0.4; // Boleto
  const total = valorA + valorB;
  const percentualA = total > 0 ? (valorA / total) * 100 : 50;
  const percentualB = total > 0 ? (valorB / total) * 100 : 50;

  const getIconColor = () => {
    switch(cardType) {
      case 'received': return 'text-[#27ae60]';
      case 'confirmed': return 'text-[#3498db]';
      case 'awaiting': return 'text-[#f39c12]';
      case 'overdue': return 'text-[#e74c3c]';
      default: return 'text-gray-500';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const progressWidth = rect.width;

    // Dividir a barra em duas partes: 60% Pix (esquerda) e 40% Boleto (direita)
    const pixWidth = progressWidth * 0.6;
    const isPixArea = mouseX <= pixWidth;

    setHoveredSection(isPixArea ? 'pix' : 'boleto');
    
    const paymentMethod: 'pix' | 'boleto' = isPixArea ? 'pix' : 'boleto';
    const value = isPixArea ? amount * 0.6 : amount * 0.4;
    
    onProgressBarHover(e, value, cardType, true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setHoveredSection(null);
    onProgressBarHover(e, amount, cardType, false);
  };

  return (
    <div className="border rounded-xl card-no-bg">
      <div className="flex justify-between mb-2">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
          <PopoverTrigger asChild>
            <button className="text-gray-400 focus:outline-none" data-testid={`info-${cardType}`}>
              <Info size={18} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="bg-white p-4 shadow-lg rounded-md">
            {tooltip}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setOpenPopover(false)}
            >
              ✕
            </button>
          </PopoverContent>
        </Popover>
      </div>
      
      <p className={`text-2xl font-semibold ${color} mb-1`}>
        {formatCurrencyBR(amount)}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        {formatCurrencyBR(liquid)} líquido
      </p>

      <div className="my-6">
        <div
          className="w-full h-4 bg-gray-200 rounded-full flex items-center relative cursor-pointer overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`${barColors.primary} h-full transition-all duration-300 ease-out z-10`}
            style={{ 
              width: `${percentualA}%`,
              height: hoveredSection === 'pix' ? '20px' : '16px',
              transform: hoveredSection === 'pix' ? 'scaleY(1.25)' : 'scaleY(1)'
            }}
            title={`Pix: ${formatCurrencyBR(valorA)}`}
          />
          <div
            className={`${barColors.secondary} h-full transition-all duration-300 ease-out z-10`}
            style={{ 
              width: `${percentualB}%`,
              height: hoveredSection === 'boleto' ? '20px' : '16px',
              transform: hoveredSection === 'boleto' ? 'scaleY(1.25)' : 'scaleY(1)'
            }}
            title={`Boleto: ${formatCurrencyBR(valorB)}`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div
          className="flex items-center text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
          onClick={onClientsClick}
        >
          <User size={16} className={`mr-2 ${getIconColor()}`} />
          <span>{clients} {clients === 1 ? 'cliente' : 'clientes'}</span>
          <span className={`ml-auto ${getIconColor()}`}>&#8250;</span>
        </div>
        <div className="flex items-center text-sm text-gray-700 p-2">
          <FileText size={16} className={`mr-2 ${getIconColor()}`} />
          <span>{bills} {bills === 1 ? 'cobrança' : 'cobranças'}</span>
          <span className={`ml-auto ${getIconColor()}`}>&#8250;</span>
        </div>
      </div>
    </div>
  );
}
