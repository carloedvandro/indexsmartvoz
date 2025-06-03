
import { Bell } from 'lucide-react';

interface NotificationDropdownProps {
  showNotifications: boolean;
  onToggleNotifications: () => void;
}

export function NotificationDropdown({ showNotifications, onToggleNotifications }: NotificationDropdownProps) {
  return (
    <div className="relative" style={{ marginRight: '2px' }}>
      <button 
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
        onClick={onToggleNotifications}
        title="Notificações"
      >
        <Bell className="h-5 w-5 text-gray-500" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
      </button>
      
      {showNotifications && (
        <div className="absolute -right-14 md:-right-14 top-full w-[420px] bg-white border border-gray-200 rounded-b-lg shadow-lg z-[5] translate-x-[50px] md:translate-x-[32px]" style={{ marginTop: '17.9px' }}>
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3 ml-[7px]">Notificações</h3>
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-[370px] px-2 py-3 bg-blue-50 rounded-lg text-left">
                <p className="text-base text-gray-700">Nova venda realizada - R$ 45,00</p>
                <span className="text-sm text-gray-500">Há 2 minutos</span>
              </div>
              <div className="w-[370px] px-2 py-3 bg-green-50 rounded-lg text-left">
                <p className="text-base text-gray-700">Bonificação creditada - R$ 12,50</p>
                <span className="text-sm text-gray-500">Há 1 hora</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
