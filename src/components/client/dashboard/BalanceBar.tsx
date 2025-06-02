
import { useState } from 'react';
import { BalanceDisplay } from './components/BalanceDisplay';
import { CenterLogo } from './components/CenterLogo';
import { NotificationDropdown } from './components/NotificationDropdown';
import { UserDropdown } from './components/UserDropdown';

export function BalanceBar() {
  const [showDropdowns, setShowDropdowns] = useState(false);

  const handleOverlayToggle = (isOpen: boolean) => {
    setShowDropdowns(isOpen);
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between w-full">
        {/* Saldo - lado esquerdo com margem para alinhar com conteúdo */}
        <BalanceDisplay />
        
        {/* Logotipo Smartvoz no centro - hidden no mobile */}
        <CenterLogo />
        
        {/* Ícones - lado direito */}
        <div className="flex items-center gap-3 ml-auto">
          <NotificationDropdown onOverlayToggle={handleOverlayToggle} />
          <UserDropdown onOverlayToggle={handleOverlayToggle} />
        </div>
      </div>
      
      {/* Overlay para fechar menus ao clicar fora */}
      {showDropdowns && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowDropdowns(false)}
        />
      )}
    </div>
  );
}
