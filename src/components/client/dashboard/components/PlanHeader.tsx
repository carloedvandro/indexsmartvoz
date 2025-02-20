
import { RefreshCw, Phone, ChevronDown } from "lucide-react";

interface PlanHeaderProps {
  planType: string;
  planCode: string;
  phoneNumber: string;
  onRefresh: () => void;
  onNumberClick: () => void;
}

export const PlanHeader = ({ planType, planCode, phoneNumber, onRefresh, onNumberClick }: PlanHeaderProps) => {
  return (
    <div className="bg-[#8425af] text-white p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl">Meu plano</span>
        <RefreshCw 
          className="h-5 w-5 cursor-pointer hover:rotate-180 transition-transform duration-500" 
          onClick={onRefresh} 
        />
      </div>
      <button 
        className="flex items-center gap-2 bg-[#6c1e8f] rounded p-2 w-full hover:bg-[#5c1a7a] transition-colors"
        onClick={onNumberClick}
      >
        <Phone className="h-4 w-4" />
        <span>{planType}</span>
        {planCode && <span className="text-xs bg-[#8425af] px-2 py-1 rounded">{planCode}</span>}
        <ChevronDown className="h-4 w-4" />
        <span className="text-sm text-gray-300">{phoneNumber}</span>
      </button>
    </div>
  );
};
