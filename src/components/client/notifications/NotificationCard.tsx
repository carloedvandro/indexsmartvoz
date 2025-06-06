
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Settings, 
  Info,
  Circle
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: "sale" | "bonus" | "network" | "system" | "info";
  isRead: boolean;
}

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
  onNotificationClick?: (notification: Notification) => void;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "sale":
      return <TrendingUp className="w-5 h-5 text-green-600" />;
    case "bonus":
      return <DollarSign className="w-5 h-5 text-blue-600" />;
    case "network":
      return <Users className="w-5 h-5 text-purple-600" />;
    case "system":
      return <Settings className="w-5 h-5 text-gray-600" />;
    case "info":
      return <Info className="w-5 h-5 text-orange-600" />;
    default:
      return <Circle className="w-5 h-5 text-gray-400" />;
  }
};

const getNotificationBgColor = (type: string) => {
  switch (type) {
    case "sale":
      return "bg-green-50 border-green-200";
    case "bonus":
      return "bg-blue-50 border-blue-200";
    case "network":
      return "bg-purple-50 border-purple-200";
    case "system":
      return "bg-gray-50 border-gray-200";
    case "info":
      return "bg-orange-50 border-orange-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
};

export function NotificationCard({ notification, onMarkAsRead, onNotificationClick }: NotificationCardProps) {
  const timeAgo = formatDistanceToNow(notification.timestamp, {
    addSuffix: true,
    locale: ptBR
  });

  const handleClick = () => {
    // Marcar como lida se não foi lida ainda
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
    
    // Executar ação de clique na notificação
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`
        p-4 rounded-lg border transition-all duration-200 cursor-pointer
        hover:shadow-md hover:scale-[1.01]
        ${notification.isRead ? 'bg-white border-gray-200' : getNotificationBgColor(notification.type)}
        ${!notification.isRead ? 'shadow-sm' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {getNotificationIcon(notification.type)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className={`
                font-medium text-gray-900 
                ${!notification.isRead ? 'font-semibold' : ''}
              `}>
                {notification.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                {notification.message}
              </p>
            </div>
            
            {!notification.isRead && (
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500 font-medium">
              {timeAgo}
            </span>
            
            <span className={`
              text-xs px-2 py-1 rounded-full font-medium
              ${notification.type === 'sale' ? 'bg-green-100 text-green-700' : ''}
              ${notification.type === 'bonus' ? 'bg-blue-100 text-blue-700' : ''}
              ${notification.type === 'network' ? 'bg-purple-100 text-purple-700' : ''}
              ${notification.type === 'system' ? 'bg-gray-100 text-gray-700' : ''}
              ${notification.type === 'info' ? 'bg-orange-100 text-orange-700' : ''}
            `}>
              {notification.type === 'sale' && 'Venda'}
              {notification.type === 'bonus' && 'Bonificação'}
              {notification.type === 'network' && 'Rede'}
              {notification.type === 'system' && 'Sistema'}
              {notification.type === 'info' && 'Informação'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
