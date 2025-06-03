
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";
import { UserMenuDropdown } from "./balance/UserMenuDropdown";
import { NotificationDropdown } from "./balance/NotificationDropdown";
import { BalanceDisplay } from "./balance/BalanceDisplay";
import { LogoSection } from "./balance/LogoSection";
import { useBalanceBarLogic } from "./balance/hooks/useBalanceBarLogic";

export function BalanceBar() {
  const { toast } = useToast();
  const { data: profile } = useProfile();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const {
    totalBalance,
    availableBalance,
    notifications,
    notificationCount
  } = useBalanceBarLogic();

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

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="flex items-center justify-between max-w-full">
        <LogoSection />
        
        <BalanceDisplay 
          totalBalance={totalBalance}
          availableBalance={availableBalance}
        />

        <div className="flex items-center gap-4">
          <NotificationDropdown
            showNotifications={showNotifications}
            onToggleNotifications={toggleNotifications}
            notifications={notifications}
            notificationCount={notificationCount}
          />
          
          <UserMenuDropdown
            showUserMenu={showUserMenu}
            onToggleUserMenu={toggleUserMenu}
            onLogout={handleLogout}
            profile={profile}
          />
        </div>
      </div>
    </div>
  );
}
