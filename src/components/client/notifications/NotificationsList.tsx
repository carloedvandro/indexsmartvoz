import { Bell, Clock, CheckCircle, Star, Users, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useNotifications } from '@/hooks/useNotifications';

interface NotificationCardProps {
  notification: any;
  onClick: () => void;
}

function NotificationCard({ notification, onClick }: NotificationCardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'sale':
        return <DollarSign className="h-5 w-5 text-green-600" />;
      case 'bonus':
        return <Star className="h-5 w-5 text-yellow-600" />;
      case 'network':
        return <Users className="h-5 w-5 text-blue-600" />;
      case 'system':
        return <TrendingUp className="h-5 w-5 text-purple-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getNotificationTitle = (type: string): string => {
    switch (type) {
      case 'sale':
        return 'Nova Venda Realizada';
      case 'bonus':
        return 'Bonificação Creditada';
      case 'network':
        return 'Novo Membro na Rede';
      case 'system':
        return 'Notificação do Sistema';
      default:
        return 'Notificação';
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        !notification.read ? 'border-l-4 border-l-blue-500 shadow-sm' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {getIcon(notification.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`text-sm font-medium ${
                  !notification.read ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  {getNotificationTitle(notification.type)}
                </h3>
                <p className={`text-sm mt-1 ${
                  !notification.read ? 'text-gray-800' : 'text-gray-600'
                }`}>
                  {notification.message}
                </p>
              </div>
              
              {!notification.read && (
                <div className="flex-shrink-0 ml-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <Clock className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(notification.created_at), { 
                  addSuffix: true, 
                  locale: ptBR 
                })}
              </span>
              {notification.read && (
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">Lida</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyNotifications() {
  return (
    <div className="text-center py-12">
      <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Nenhuma notificação
      </h3>
      <p className="text-gray-500">
        Quando houver novidades, elas aparecerão aqui.
      </p>
    </div>
  );
}

export function NotificationsList() {
  const { notifications, loading, error, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const handleNotificationClick = async (notification: any) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
    
    // Navegação específica baseada no tipo da notificação
    switch (notification.type) {
      case 'sale':
        console.log('Navigating to sales details');
        break;
      case 'bonus':
        console.log('Navigating to earnings');
        break;
      case 'network':
        console.log('Navigating to network');
        break;
      case 'system':
        console.log('System notification acknowledged');
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Erro ao carregar notificações: {error}</p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return <EmptyNotifications />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notificações</h1>
          <p className="text-gray-600 mt-1">
            {notifications.length} notificações • {unreadCount} não lidas
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => markAllAsRead()}
          >
            Marcar todas como lidas
          </Button>
        )}
      </div>
      
      <div className="space-y-3">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onClick={() => handleNotificationClick(notification)}
          />
        ))}
      </div>
    </div>
  );
}