
import { User, ChevronDown, Building2, FileText, KeyRound, Shield, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { navigationItems } from '../navigation/NavigationItems';

interface UserMenuDropdownProps {
  showUserMenu: boolean;
  onToggleUserMenu: () => void;
  onLogout: () => Promise<void>;
}

export function UserMenuDropdown({ showUserMenu, onToggleUserMenu, onLogout }: UserMenuDropdownProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Filter out the home item and get other navigation items
  const menuItems = navigationItems.filter(item => item.icon !== "home");

  // Profile menu items for configurations section
  const profileMenuItems = [
    {
      title: "Conta Bancária",
      icon: Building2,
      href: "/client/profile/banking",
    },
    {
      title: "Termos",
      icon: FileText,
      href: "/client/profile/terms",
    },
    {
      title: "Alterar Senha",
      icon: KeyRound,
      href: "/client/profile/change-password",
    },
    {
      title: "Senha de Segurança",
      icon: Shield,
      href: "/client/profile/security-password",
    },
  ];

  const toggleSubmenu = (menuTitle: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuTitle) 
        ? prev.filter(title => title !== menuTitle)
        : [...prev, menuTitle]
    );
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        onClick={onToggleUserMenu}
        title="Menu do usuário"
      >
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-white" />
        </div>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>
      
      {showUserMenu && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="py-2">
            <Link
              to="/client/dashboard"
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <img 
                src="/lovable-uploads/d6d0cfaa-60fb-4950-9674-400bbfc06650.png" 
                alt="Home" 
                className="h-[30px] w-auto" 
              />
              <span className="text-base font-bold text-black">Home</span>
            </Link>
            
            <hr className="my-1" />
            
            {/* Menu Items */}
            {menuItems.map((item) => (
              <div key={item.title}>
                <div 
                  className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  onClick={() => item.items && toggleSubmenu(item.title)}
                >
                  <p className="text-base font-bold text-black">{item.title}</p>
                  {item.items && (
                    <ChevronRight 
                      className={`h-4 w-4 text-gray-500 transition-transform ${
                        expandedMenus.includes(item.title) ? 'rotate-90' : ''
                      }`} 
                    />
                  )}
                </div>
                {item.items && expandedMenus.includes(item.title) && (
                  <div className="mb-2">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        to={subItem.href || "#"}
                        className="block px-6 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <hr className="my-1" />
            
            <Link
              to="/client/profile"
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 block"
            >
              Meu Perfil
            </Link>
            
            {/* Configurações Section with Profile Menu Items */}
            <div>
              <div className="px-4 py-2">
                <p className="text-base font-bold text-black">Configurações</p>
              </div>
              <div className="px-4 py-2 space-y-1">
                {profileMenuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="flex items-center gap-3 px-2 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors"
                  >
                    <item.icon className="h-4 w-4 text-gray-500" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            <hr className="my-1" />
            <button 
              onClick={onLogout}
              className="w-full text-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
