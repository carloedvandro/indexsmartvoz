import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from '@/hooks/useNotifications';
interface NotificationDropdownProps {
  showNotifications: boolean;
  onToggleNotifications: () => void;
}
export function NotificationDropdown({
  showNotifications,
  onToggleNotifications
}: NotificationDropdownProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const handleToggleNotifications = () => {
    navigate('/client/notifications');
  };
  const handleViewAllNotifications = () => {
    navigate('/client/notifications');
  };
  const handleNotificationClick = async (notification: any) => {
    // Marcar como lida
    if (!notification.read) {
      await markAsRead(notification.id);
    }

    // Mostrar toast com detalhes
    toast({
      title: "Notificação",
      description: notification.message,
      duration: 3000
    });

    // Ações específicas baseadas no tipo
    switch (notification.type) {
      case "sale":
        console.log("Abrindo detalhes da venda");
        break;
      case "bonus":
        console.log("Abrindo detalhes da bonificação");
        break;
      case "network":
        console.log("Abrindo detalhes da rede");
        break;
    }

    // Fechar dropdown após clicar
    onToggleNotifications();
  };
  return <div className="relative" style={{
    marginRight: '2px'
  }}>
      <button onClick={handleToggleNotifications} title="Notificações" className="p-3 hover:bg-gray-100 rounded-lg transition-colors relative cursor-pointer">
        <Bell className="h-5 w-5 text-gray-500" />
        {unreadCount > 0 && <div className="absolute -top-1 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{unreadCount}</span>
          </div>}
      </button>
      
      {showNotifications && <div className="absolute top-full w-[336px] max-w-[90vw] bg-white border border-gray-200 rounded-b-lg shadow-lg z-[5] -right-[83px] md:-right-[21px]" style={{
      marginTop: '17.9px'
    }}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 ml-[7px]">Notificações</h3>
              <span className="text-sm text-gray-500">({notifications.length})</span>
            </div>
            <div className="space-y-3 flex flex-col items-center max-h-80 overflow-y-auto">
              {notifications.map(notification => <div key={notification.id} onClick={() => handleNotificationClick(notification)} className={`
                    w-full px-3 py-3 rounded-lg text-left transition-colors cursor-pointer
                    ${notification.read ? 'bg-gray-50 hover:bg-gray-100' : 'bg-blue-50 hover:bg-blue-100'}
                  `}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`
                        text-sm mb-1 
                        ${notification.read ? 'text-gray-700' : 'text-black font-medium'}
                      `}>
                        {notification.message}
                      </p>
                      <span className="text-xs text-gray-600">
                        {new Date(notification.created_at).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 ml-2"></div>}
                  </div>
                </div>)}
              
              {notifications.length === 0 && <div className="w-full px-3 py-6 text-center text-gray-500">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nenhuma notificação</p>
                </div>}
            </div>
            
            {notifications.length > 0 && <div className="mt-4 pt-3 border-t border-gray-200">
                <button onClick={handleViewAllNotifications} className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Ver todas as notificações
                </button>
              </div>}
          </div>
        </div>}
    </div>;
}