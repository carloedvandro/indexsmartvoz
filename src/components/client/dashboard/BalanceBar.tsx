
import { BalanceDisplay } from './balance/BalanceDisplay';
import { LogoSection } from './balance/LogoSection';
import { NotificationDropdown } from './balance/NotificationDropdown';
import { UserMenuDropdown } from './balance/UserMenuDropdown';
import { useBalanceBarLogic } from './balance/hooks/useBalanceBarLogic';

export function BalanceBar() {
  const {
    isBalanceVisible,
    showNotifications,
    showUserMenu,
    profile,
    toggleBalanceVisibility,
    toggleNotifications,
    toggleUserMenu,
    handleLogout,
    closeMenus
  } = useBalanceBarLogic();

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between relative z-10" onClick={closeMenus}>
      <div className="flex items-center gap-4 flex-1">
        <LogoSection />
        <BalanceDisplay 
          isVisible={isBalanceVisible} 
          onToggleVisibility={toggleBalanceVisibility} 
        />
      </div>
      
      <div className="flex items-center gap-2">
        <NotificationDropdown 
          showNotifications={showNotifications} 
          onToggleNotifications={toggleNotifications} 
        />
        
        <UserMenuDropdown 
          showUserMenu={showUserMenu} 
          onToggleUserMenu={toggleUserMenu} 
          onLogout={handleLogout} 
          profile={profile} 
        />
      </div>
    </div>
  );
}
