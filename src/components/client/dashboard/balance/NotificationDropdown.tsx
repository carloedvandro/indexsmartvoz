
import { useState } from 'react';
import { Bell } from 'lucide-react';

interface NotificationDropdownProps {
  showNotifications: boolean;
  onToggleNotifications: () => void;
}

export function NotificationDropdown({ showNotifications, onToggleNotifications }: NotificationDropdownProps) {
  // Estado para controlar se as notificações foram lidas
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  // Simular notificações (em um projeto real, isso viria de uma API)
  const notifications = [
    {
      id: 1,
      message: "Nova venda realizada - R$ 45,00",
      time: "Há 2 minutos",
      type: "sale"
    },
    {
      id: 2,
      message: "Bonificação creditada - R$ 12,50",
      time: "Há 1 hora",
      type: "bonus"
    },
    {
      id: 3,
      message: "Novo membro na sua rede",
      time: "Há 3 horas",
      type: "network"
    }
  ];

  const notificationCount = hasUnreadNotifications ? notifications.length : 0;

  const handleToggleNotifications = () => {
    onToggleNotifications();
    // Quando clica no sino, marca as notificações como lidas
    if (!showNotifications && hasUnreadNotifications) {
      setHasUnreadNotifications(false);
    }
  };

  return (
    <div className="relative" style={{ marginRight: '2px' }}>
      <button 
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative cursor-pointer"
        onClick={handleToggleNotifications}
        title="Notificações"
      >
        <Bell className="h-5 w-5 text-gray-500" />
        {notificationCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{notificationCount}</span>
          </div>
        )}
      </button>
      
      {showNotifications && (
        <div className="absolute right-0 top-full w-[320px] max-w-[90vw] bg-white border border-gray-200 rounded-b-lg shadow-lg z-[5]" style={{ marginTop: '17.9px', marginLeft: '15px' }}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 ml-[7px]">Notificações</h3>
              <span className="text-sm text-gray-500">({notifications.length})</span>
            </div>
            <div className="space-y-3 flex flex-col items-center max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div key={notification.id} className="w-full px-3 py-3 bg-blue-50 rounded-lg text-left hover:bg-blue-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-black font-medium mb-1">{notification.message}</p>
                      <span className="text-xs text-gray-600">{notification.time}</span>
                    </div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 ml-2"></div>
                  </div>
                </div>
              ))}
              
              {notifications.length === 0 && (
                <div className="w-full px-3 py-6 text-center text-gray-500">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nenhuma notificação</p>
                </div>
              )}
            </div>
            
            {notifications.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-200">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Ver todas as notificações
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
