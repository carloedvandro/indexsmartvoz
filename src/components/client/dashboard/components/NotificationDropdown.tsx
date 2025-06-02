
import { Bell } from 'lucide-react';

interface NotificationDropdownProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const NotificationDropdown = ({ isVisible, onToggle }: NotificationDropdownProps) => {
  return (
    <div className="relative" style={{ marginRight: '2px' }}>
      <button 
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
        onClick={onToggle}
        title="Notificações"
      >
        <Bell className="h-5 w-5 text-gray-500" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
      </button>
      
      {isVisible && (
        <div className="absolute -right-14 md:-right-14 top-full w-96 bg-white border border-gray-200 rounded-b-lg shadow-lg -z-10 translate-x-[30px] md:translate-x-[12px]" style={{ marginTop: '16.1px' }}>
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Notificações</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">Nova venda realizada - R$ 45,00</p>
                <span className="text-xs text-gray-500">Há 2 minutos</span>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-700">Bonificação creditada - R$ 12,50</p>
                <span className="text-xs text-gray-500">Há 1 hora</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
