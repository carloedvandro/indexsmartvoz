
import { useState } from "react";
import { LogoSection } from "./balance/LogoSection";
import { BalanceDisplay } from "./balance/BalanceDisplay";
import { UserMenuDropdown } from "./balance/UserMenuDropdown";
import { NotificationDropdown } from "./balance/NotificationDropdown";
import { ProfileWithSponsor } from "@/types/profile";

interface BalanceBarProps {
  profile: ProfileWithSponsor;
}

export function BalanceBar({ profile }: BalanceBarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <LogoSection />
        
        <div className="flex-1 flex justify-center">
          <BalanceDisplay />
        </div>
        
        <div className="flex items-center space-x-4">
          <NotificationDropdown />
          <UserMenuDropdown />
        </div>
      </div>
    </div>
  );
}
