
import { Info, User } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

interface BillingStatusCardProps {
  title: string;
  amountA: number;
  amountB: number;
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
  amountA,
  amountB,
  liquid,
  clients,
  color,
  tooltip,
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

  const total = amountA + amountB;
  const percentualA = total > 0 ? (amountA / total) * 100 : 50;
  const percentualB = total > 0 ? (amountB / total) * 100 : 50;

  const getIconColor = () => {
    switch (cardType) {
      case 'received': return 'text-[#00cc02]';
      case 'confirmed': return 'text-[#0038ff]';
      case 'awaiting': return 'text-[#ff7300]';
      case 'overdue': return 'text-[#ff0000]';
      default: return 'text-gray-500';
    }
  };

  // Para os três cards específicos, usar cor única
  const shouldUseUniqueColor = cardType === 'confirmed' || cardType === 'awaiting' || cardType === 'overdue';

  const handlePixHover = (event: React.MouseEvent, enter: boolean) => {
    if (enter) {
      setHoveredSection('pix');
      onProgressBarHover(event, amountA, 'pix', true);
    } else {
      setHoveredSection(null);
      onProgressBarHover(event, amountA, 'pix', false);
    }
  };

  const handleBoletoHover = (event: React.MouseEvent, enter: boolean) => {
    if (enter) {
      setHoveredSection('boleto');
      onProgressBarHover(event, amountB, 'boleto', true);
    } else {
      setHoveredSection(null);
      onProgressBarHover(event, amountB, 'boleto', false);
    }
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
        {formatCurrencyBR(total)}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        {formatCurrencyBR(liquid)} líquido
      </p>

      <div className="w-full h-4 bg-gray-200 rounded-md flex relative">
        {shouldUseUniqueColor ? (
          // Barra única para confirmed, awaiting e overdue
          <div
            className={`${barColors.primary} h-full rounded-md transition-all duration-300 transform ${
              hoveredSection ? 'scale-y-125' : ''
            } origin-center z-10 cursor-pointer relative`}
            style={{ width: '100%' }}
            title={`Total: ${formatCurrencyBR(total)}`}
            onMouseEnter={(e) => handlePixHover(e, true)}
            onMouseLeave={(e) => handlePixHover(e, false)}
          />
        ) : (
          // Barras duplas para received
          <>
            <div
              className={`${barColors.primary} h-full rounded-l-md transition-all duration-300 transform ${
                hoveredSection === 'pix' ? 'scale-y-125' : ''
              } origin-center z-10 cursor-pointer relative`}
              style={{ width: `${percentualA}%` }}
              title={`Pix: ${formatCurrencyBR(amountA)}`}
              onMouseEnter={(e) => handlePixHover(e, true)}
              onMouseLeave={(e) => handlePixHover(e, false)}
            />

            <div
              className={`${barColors.secondary} h-full rounded-r-md transition-all duration-300 transform ${
                hoveredSection === 'boleto' ? 'scale-y-125' : ''
              } origin-center z-10 cursor-pointer relative`}
              style={{ width: `${percentualB}%` }}
              title={`Boleto: ${formatCurrencyBR(amountB)}`}
              onMouseEnter={(e) => handleBoletoHover(e, true)}
              onMouseLeave={(e) => handleBoletoHover(e, false)}
            />
          </>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div
          className="flex items-center text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
          style={{ marginTop: '10px', marginLeft: '-9px' }}
          onClick={onClientsClick}
        >
          <User size={16} className={`mr-2 ${getIconColor()}`} />
          <span>{clients} {clients === 1 ? 'cliente' : 'clientes'}</span>
          <span className={`ml-auto ${getIconColor()}`}>&#8250;</span>
        </div>
      </div>
    </div>
  );
}
