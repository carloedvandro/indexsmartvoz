
import { User, FileText } from "lucide-react";

interface BillingCardStatsProps {
  clients: number;
  bills: number;
  iconColor: string;
  onClientsClick: () => void;
}

export function BillingCardStats({ clients, bills, iconColor, onClientsClick }: BillingCardStatsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div 
        className="flex items-center text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        onClick={onClientsClick}
      >
        <User size={16} className="mr-2" style={{ color: iconColor }} />
        <span>{clients} {clients === 1 ? 'cliente' : 'clientes'}</span>
        <span className="ml-auto" style={{ color: iconColor }}>&#8250;</span>
      </div>
      <div className="flex items-center text-sm text-gray-700">
        <FileText size={16} className="mr-2" style={{ color: iconColor }} />
        <span>{bills} {bills === 1 ? 'cobrança' : 'cobranças'}</span>
        <span className="ml-auto" style={{ color: iconColor }}>&#8250;</span>
      </div>
    </div>
  );
}
