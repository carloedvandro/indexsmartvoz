
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
    toggleBalanceVisibility,
    toggleNotifications,
    toggleUserMenu,
    handleLogout,
    closeMenus
  } = useBalanceBarLogic();

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between w-full">
        {/* Saldo - lado esquerdo com margem para alinhar com conteúdo */}
        <BalanceDisplay 
          isVisible={isBalanceVisible}
          onToggleVisibility={toggleBalanceVisibility}
        />
        
        {/* Logotipo Smartvoz no centro - hidden no mobile */}
        <LogoSection />
        
        {/* Ícones - lado direito */}
        <div className="flex items-center gap-3 ml-auto">
          <NotificationDropdown 
            showNotifications={showNotifications}
            onToggleNotifications={toggleNotifications}
          />
          
          <UserMenuDropdown 
            showUserMenu={showUserMenu}
            onToggleUserMenu={toggleUserMenu}
            onLogout={handleLogout}
          />
        </div>
      </div>
      
      {/* Overlay para fechar menus ao clicar fora */}
      {(showNotifications || showUserMenu) && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={closeMenus}
        />
      )}
    </div>
  );
}
