
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BalanceDisplay } from './components/BalanceDisplay';
import { NotificationDropdown } from './components/NotificationDropdown';
import { UserMenu } from './components/UserMenu';

export function BalanceBar() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between w-full">
        {/* Saldo - lado esquerdo com margem para alinhar com conteúdo */}
        <BalanceDisplay 
          isVisible={isBalanceVisible}
          onToggle={toggleBalanceVisibility}
        />
        
        {/* Logotipo Smartvoz no centro - hidden no mobile */}
        <div className="hidden md:flex flex-1 justify-center">
          <Link to="/client/dashboard">
            <img
              src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
              alt="Smartvoz Logo"
              className="h-[80px] object-contain mix-blend-multiply opacity-90 contrast-125"
            />
          </Link>
        </div>
        
        {/* Ícones - lado direito */}
        <div className="flex items-center gap-3 ml-auto">
          <NotificationDropdown 
            isVisible={showNotifications}
            onToggle={toggleNotifications}
          />
          
          <UserMenu 
            isVisible={showUserMenu}
            onToggle={toggleUserMenu}
          />
        </div>
      </div>
      
      {/* Overlay para fechar menus ao clicar fora */}
      {(showNotifications || showUserMenu) && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </div>
  );
}
