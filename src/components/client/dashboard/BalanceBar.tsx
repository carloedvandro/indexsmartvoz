
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
    <div className="flex items-center justify-between bg-white shadow-sm border-b border-gray-200 px-4 py-3 relative z-50">
      <LogoSection />
      
      <div className="flex items-center gap-4">
        <BalanceDisplay 
          isVisible={isBalanceVisible}
          onToggle={toggleBalanceVisibility}
        />
        
        <NotificationDropdown 
          isOpen={showNotifications}
          onToggle={toggleNotifications}
          onClose={closeMenus}
        />
        
        <UserMenuDropdown 
          isOpen={showUserMenu}
          onToggle={toggleUserMenu}
          onClose={closeMenus}
          onLogout={handleLogout}
          profile={profile}
        />
      </div>
    </div>
  );
}
