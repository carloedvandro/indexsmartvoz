
import { BalanceDisplay } from './balance/BalanceDisplay';
import { LogoSection } from './balance/LogoSection';
import { NotificationDropdown } from './balance/NotificationDropdown';
import { UserMenuDropdown } from './balance/UserMenuDropdown';
import { useBalanceBarLogic } from './balance/hooks/useBalanceBarLogic';
import { useLocation } from 'react-router-dom';

export function BalanceBar() {
  const location = useLocation();
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

  // Hide BalanceBar on registration and payment process pages
  const hiddenRoutes = [
    '/client/register',
    '/client/facial-biometry', 
    '/client/plan-selection',
    '/client/products',
    '/client/esim'
  ];

  const shouldHide = hiddenRoutes.some(route => location.pathname.startsWith(route));

  if (shouldHide) {
    return null;
  }

  return (
    <div className="bg-white shadow-sm px-4 py-3 flex-shrink-0 relative z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <BalanceDisplay 
          isVisible={isBalanceVisible}
          onToggleVisibility={toggleBalanceVisibility}
        />
        
        <LogoSection />
        
        <div className="flex items-center gap-3">
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
      
      {(showNotifications || showUserMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeMenus}
        />
      )}
    </div>
  );
}
