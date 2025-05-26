
import { Info } from "lucide-react";
import { useState } from "react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { PaymentTooltip } from "./PaymentTooltip";
import { BillingCardStats } from "./BillingCardStats";
import { BillingStatus } from "@/hooks/useBillingData";

interface BillingCardProps {
  title: string;
  status: BillingStatus;
  statusKey: string;
  openPopover: string | null;
  setOpenPopover: (value: string | null) => void;
  onClientsClick: (type: string) => void;
}

export function BillingCard({ 
  title, 
  status, 
  statusKey, 
  openPopover, 
  setOpenPopover, 
  onClientsClick 
}: BillingCardProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const formatCurrencyBR = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getIconColor = (statusKey: string) => {
    const colors: Record<string, string> = {
      'received': '#27ae60',
      'confirmed': '#3498db',
      'awaiting': '#f39c12',
      'overdue': '#e74c3c'
    };
    return colors[statusKey] || '#000';
  };

  return (
    <div className="border rounded-xl card-no-bg">
      <div className="flex justify-between mb-2">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <Popover open={openPopover === statusKey} onOpenChange={(open) => setOpenPopover(open ? statusKey : null)}>
          <PopoverTrigger asChild>
            <button className="text-gray-400 focus:outline-none" data-testid={`info-${statusKey}`}>
              <Info size={18} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="bg-white p-4 shadow-lg rounded-md">
            {status.tooltip}
            <button 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setOpenPopover(null)}
            >
              ✕
            </button>
          </PopoverContent>
        </Popover>
      </div>
      
      <p className={`text-2xl font-semibold ${status.color} mb-1`}>
        {formatCurrencyBR(status.amount)}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        {formatCurrencyBR(status.liquid)} líquido
      </p>
      
      <div 
        className="relative w-full h-4 bg-gray-100 rounded-full mb-4 overflow-hidden cursor-pointer"
        onMouseEnter={() => setHoveredCard(statusKey)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div 
          className={`h-full ${status.progressColor} rounded-full transition-all duration-300 ${
            hoveredCard === statusKey ? 'h-6 -mt-1' : 'h-4'
          }`} 
          style={{ width: '100%' }}
        ></div>
        
        <PaymentTooltip 
          totalAmount={status.amount}
          isVisible={hoveredCard === statusKey}
        />
      </div>
      
      <BillingCardStats
        clients={status.clients}
        bills={status.bills}
        iconColor={getIconColor(statusKey)}
        onClientsClick={() => onClientsClick(statusKey)}
      />
    </div>
  );
}
