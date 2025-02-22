
import { Phone, RefreshCw, ChevronRight } from "lucide-react";

interface ActionButtonsProps {
  onPlanDetails: () => void;
  onChangePlan: () => void;
  onAdditionalPackages: () => void;
}

export const ActionButtons = ({ onPlanDetails, onChangePlan, onAdditionalPackages }: ActionButtonsProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-6 mt-6">
      <button 
        className="flex flex-col items-center p-3 border rounded hover:bg-gray-50 transition-colors"
        onClick={onPlanDetails}
      >
        <Phone className="h-5 w-5 text-gray-600 mb-1" />
        <span className="text-xs">Detalhe do plano</span>
      </button>
      <button 
        className="flex flex-col items-center p-3 border rounded hover:bg-gray-50 transition-colors"
        onClick={onChangePlan}
      >
        <RefreshCw className="h-5 w-5 text-gray-600 mb-1" />
        <span className="text-xs">Trocar de plano</span>
      </button>
      <button 
        className="flex flex-col items-center p-3 border rounded hover:bg-gray-50 transition-colors"
        onClick={onAdditionalPackages}
      >
        <ChevronRight className="h-5 w-5 text-gray-600 mb-1" />
        <span className="text-xs">Pacotes adicionais</span>
      </button>
    </div>
  );
};
