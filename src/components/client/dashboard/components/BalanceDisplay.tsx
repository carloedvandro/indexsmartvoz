
import { EyeOff, Eye } from 'lucide-react';

interface BalanceDisplayProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const BalanceDisplay = ({ isVisible, onToggle }: BalanceDisplayProps) => {
  return (
    <div className="flex items-center gap-4 flex-1 md:flex-initial ml-2">
      <div className="flex flex-col">
        <span className="text-sm text-gray-600">Saldo em conta</span>
        <span className="text-lg font-semibold text-green-600">
          {isVisible ? 'R$ 269,18' : '***,**'}
        </span>
      </div>
      <button 
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        onClick={onToggle}
        title={isVisible ? 'Ocultar saldo' : 'Mostrar saldo'}
      >
        {isVisible ? (
          <EyeOff className="h-5 w-5 text-gray-500" />
        ) : (
          <Eye className="h-5 w-5 text-gray-500" />
        )}
      </button>
    </div>
  );
};
