
import { User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { navigationItems } from '../navigation/NavigationItems';

interface UserMenuDropdownProps {
  showUserMenu: boolean;
  onToggleUserMenu: () => void;
  onLogout: () => Promise<void>;
}

export function UserMenuDropdown({ showUserMenu, onToggleUserMenu, onLogout }: UserMenuDropdownProps) {
  // Filter out the home item and get other navigation items
  const menuItems = navigationItems.filter(item => item.icon !== "home");

  return (
    <div className="relative">
      <button 
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                <div className="px-4 py-2">
                  <p className="text-sm font-medium text-gray-800">{item.title}</p>
                </div>
                {item.items && (
                  <div className="ml-4 mb-2">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        to={subItem.href || "#"}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <hr className="my-1" />
            
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Meu Perfil
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Configurações
            </button>
            <hr className="my-1" />
            <button 
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
