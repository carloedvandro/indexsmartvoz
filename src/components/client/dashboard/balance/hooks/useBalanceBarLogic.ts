
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useBalanceBarLogic() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { toast } = useToast();

  // Mock data para saldos
  const totalBalance = 269.18;
  const availableBalance = 269.18;

  // Mock data para notificações
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

  const notificationCount = 3;

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = async () => {
    try {
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith('sb-')) {
          localStorage.removeItem(key);
        }
      }

      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erro ao fazer logout:", error);
        toast({
          title: "Erro",
          description: "Não foi possível fazer logout. Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 100));
      window.location.replace("/client/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast({
        title: "Erro",
        description: "Não foi possível fazer logout. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const closeMenus = () => {
    setShowNotifications(false);
    setShowUserMenu(false);
  };

  return {
    isBalanceVisible,
    showNotifications,
    showUserMenu,
    totalBalance,
    availableBalance,
    notifications,
    notificationCount,
    toggleBalanceVisibility,
    toggleNotifications,
    toggleUserMenu,
    handleLogout,
    closeMenus
  };
}
