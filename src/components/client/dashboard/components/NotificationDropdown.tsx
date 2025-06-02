
import { Bell } from 'lucide-react';
import { useState } from 'react';

interface NotificationDropdownProps {
  onOverlayToggle: (isOpen: boolean) => void;
}

export function NotificationDropdown({ onOverlayToggle }: NotificationDropdownProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    const newState = !showNotifications;
    setShowNotifications(newState);
    onOverlayToggle(newState);
  };

  return (
    <div className="relative" style={{ marginRight: '2px' }}>
      <button 
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
        onClick={toggleNotifications}
        title="Notificações"
      >
        <Bell className="h-5 w-5 text-gray-500" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
      </button>
      
      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3 text-left">Notificações</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg text-left">
                <p className="text-sm text-gray-700">Nova venda realizada - R$ 45,00</p>
                <span className="text-xs text-gray-500">Há 2 minutos</span>
              </div>
              <div className="p-3 bg-green-50 rounded-lg text-left">
                <p className="text-sm text-gray-700">Bonificação creditada - R$ 12,50</p>
                <span className="text-xs text-gray-500">Há 1 hora</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
