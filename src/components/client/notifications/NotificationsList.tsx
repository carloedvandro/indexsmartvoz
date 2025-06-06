
import { useState } from "react";
import { NotificationCard } from "./NotificationCard";
import { EmptyNotifications } from "./EmptyNotifications";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: "sale" | "bonus" | "network" | "system" | "info";
  isRead: boolean;
}

export function NotificationsList() {
  const { toast } = useToast();
  
  // Dados simulados - em um projeto real, isso viria de uma API
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Nova venda realizada",
      message: "Parabéns! Você realizou uma nova venda no valor de R$ 89,90 para o plano Premium.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutos atrás
      type: "sale",
      isRead: false
    },
    {
      id: "2", 
      title: "Bonificação creditada",
      message: "Sua bonificação mensal de R$ 125,50 foi creditada em sua conta.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      type: "bonus",
      isRead: false
    },
    {
      id: "3",
      title: "Novo membro na sua rede",
      message: "João Silva se cadastrou através do seu link de indicação.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
      type: "network",
      isRead: true
    },
    {
      id: "4",
      title: "Atualização do sistema",
      message: "Nova versão do aplicativo disponível com melhorias de performance.",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 dia atrás
      type: "system",
      isRead: true
    },
    {
      id: "5",
      title: "Promoção especial",
      message: "Aproveite 30% de desconto em todos os planos até o final do mês!",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
      type: "info",
      isRead: true
    },
    {
      id: "6",
      title: "Meta de vendas atingida",
      message: "Parabéns! Você atingiu sua meta mensal de vendas e ganhou um bônus extra.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
      type: "bonus",
      isRead: true
    }
  ]);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mostrar detalhes da notificação
    toast({
      title: notification.title,
      description: notification.message,
      duration: 5000,
    });

    // Aqui você pode implementar ações específicas baseadas no tipo
    switch (notification.type) {
      case "sale":
        console.log("Abrindo detalhes da venda:", notification);
        // Navegar para página de vendas ou mostrar modal com detalhes
        break;
      case "bonus":
        console.log("Abrindo detalhes da bonificação:", notification);
        // Navegar para página financeira ou mostrar modal com detalhes
        break;
      case "network":
        console.log("Abrindo detalhes da rede:", notification);
        // Navegar para página da rede ou mostrar modal com detalhes
        break;
      case "system":
        console.log("Abrindo informações do sistema:", notification);
        // Mostrar modal com informações do sistema
        break;
      case "info":
        console.log("Abrindo informações:", notification);
        // Mostrar modal com informações ou navegar para página relevante
        break;
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    toast({
      title: "Notificações",
      description: "Todas as notificações foram marcadas como lidas.",
    });
  };

  if (notifications.length === 0) {
    return <EmptyNotifications />;
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Todas as notificações ({notifications.length})
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {unreadCount} não lidas
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Marcar todas como lidas
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        {notifications.map((notification) => (
          <NotificationCard 
            key={notification.id} 
            notification={notification}
            onMarkAsRead={handleMarkAsRead}
            onNotificationClick={handleNotificationClick}
          />
        ))}
      </div>
    </div>
  );
}
