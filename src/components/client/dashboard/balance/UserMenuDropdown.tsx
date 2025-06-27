
import { User, ChevronDown, Building2, FileText, KeyRound, Shield, ChevronRight, UserCircle, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { navigationItems } from '../navigation/NavigationItems';
import { UserAvatar } from './UserAvatar';
import { ProfileWithSponsor } from '@/types/profile';

interface UserMenuDropdownProps {
  showUserMenu: boolean;
  onToggleUserMenu: () => void;
  onLogout: () => Promise<void>;
  profile?: ProfileWithSponsor | null;
}

export function UserMenuDropdown({ showUserMenu, onToggleUserMenu, onLogout, profile }: UserMenuDropdownProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const navigate = useNavigate();

  // Filter out the home item and get other navigation items
  const menuItems = navigationItems.filter(item => item.icon !== "home");

  // Profile menu items for configurations section (including Meu Perfil)
  const profileMenuItems = [
    {
      title: "Meu Perfil",
      icon: UserCircle,
      href: "/client/profile",
    },
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

  const handleUserMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleUserMenu();
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        onClick={handleUserMenuClick}
        title="Menu do usuário"
      >
        <UserAvatar
          profileImage={profile?.profile_image}
          fullName={profile?.full_name}
          isActive={profile?.status === 'active'}
          size="sm"
        />
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
      </button>

      {showUserMenu && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="py-2">
            <Link
              to="/client/dashboard"
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <img
                src="/lovable-uploads/d6d0cfaa-60fb-4950-9674-400bbfc06650.png"
                alt="Home"
                className="h-[20px] w-auto"
              />
              <span className="text-base font-medium text-black">Home</span>
            </Link>

            <hr className="my-1" />

            {/* Menu Completo Link */}
            <Link
              to="/client/navigation"
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5 text-gray-500" />
              <span className="text-base font-medium text-black">Menu Completo</span>
            </Link>

            <hr className="my-1" />

            {/* Menu Items */}
            {menuItems.map((item) => (
              <div key={item.title}>
                <div
                  className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                  onClick={() => item.items && toggleSubmenu(item.title)}
                >
                  <p className="text-base font-medium text-black">{item.title}</p>
                  {item.items && (
                    <ChevronRight
                      className={`h-4 w-4 text-gray-500 transition-transform ${expandedMenus.includes(item.title) ? 'rotate-90' : ''
                        }`}
                    />
                  )}
                </div>
                {item.items && expandedMenus.includes(item.title) && (
                  <div className="mb-2 bg-gray-50">
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

            {/* Configurações Section with expandable menu */}
            <div>
              <div
                className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                onClick={() => toggleSubmenu('Configurações')}
              >
                <p className="text-base font-medium text-black">Configurações</p>
                <ChevronRight
                  className={`h-4 w-4 text-gray-500 transition-transform ${expandedMenus.includes('Configurações') ? 'rotate-90' : ''
                    }`}
                />
              </div>
              {expandedMenus.includes('Configurações') && (
                <div className="px-4 py-2 space-y-1 bg-gray-50">
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
              )}
            </div>

            <hr className="my-1" />
            <button
              onClick={onLogout}
              className="w-full text-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <img src='/botaosair.png' width={30} className="mx-auto"alt="logo sair" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
